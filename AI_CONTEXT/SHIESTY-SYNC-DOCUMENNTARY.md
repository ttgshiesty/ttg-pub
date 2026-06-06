# Expert Sync Architecture Guide

## The Problem: Server-Side API Calls Fail

Embark's API (`api.embark.games`) blocks data-center IPs and requires residential ISP connections. When your server tries to fetch directly, you get:
- DNS resolution failures
- Connection timeouts  
- HTTP 403/451 blocks

## The Solution: Extension-Based Sync

**Key Insight:** The user's browser already has a working connection to Embark (they're logged into id.embark.games). Use the extension as a "proxy" to fetch data, then push it to your server.

```
┌─────────────────────────────────────────────────────────────────┐
│                    SYNC DATA FLOW                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐   │
│  │   shiesty.me │      │  Extension   │      │  Embark API  │   │
│  │   (server)   │◄────►│  (browser)   │◄────►│  (blocked    │   │
│  │              │ POST  │              │ GET   │  from server)│   │
│  │              │/sync  │              │/v2/*  │              │   │
│  └──────────────┘      └──────────────┘      └──────────────┘   │
│         ▲                      ▲                                   │
│         │                      │                                   │
│    store│ data            fetch│ via user's ISP                  │
│         │                      │                                   │
│  ┌──────────────┐      ┌──────────────┐                          │
│  │   MongoDB    │      │  User Browser│                          │
│  │   (SyncData) │      │  (DNS works) │                          │
│  └──────────────┘      └──────────────┘                          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Extension Background Script (`shiestybuddy/background.js`)

**Purpose:** Runs in the background, handles API calls via user's browser connection.

**Key Functions:**

```javascript
// Fetches ALL Embark data from the user's authenticated session
async function fetchEmbarkBundle(accessToken) {
  const roots = [
    'https://api.embark.games/arc-raiders/v2',
    'https://api.embark.games/arc-raiders',
  ];
  const endpoints = ['profile', 'inventory', 'rounds', 'hideout', 'loadout', 'blueprints', 'quests', 'projects'];
  // Tries multiple roots until one works
  // Returns: { profile, stash, rounds, hideout, loadout, blueprints, quests, projects }
}

// Pushes data to your server
async function pushFullSnapshot(embarkData) {
  // 1. Checks for active Embark tab
  // 2. Calls fetchEmbarkBundle IN the tab context (uses user's DNS)
  // 3. POSTs to https://shiesty.me/api/extension/sync
  // 4. Returns: { success: true, syncedAt: timestamp }
}
```

**Auto-Sync via Chrome Alarms:**
```javascript
const AUTO_SYNC_ALARM_NAME = 'shiesty-auto-sync';
const AUTO_SYNC_INTERVAL_MINUTES = 15;

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name !== AUTO_SYNC_ALARM_NAME) return;
  const { embarkData, autoSync } = await chrome.storage.local.get(['embarkData', 'autoSync']);
  if (!autoSync?.enabled || !embarkData) return;
  await pushFullSnapshot(embarkData).catch(() => {});
});
```

---

### 2. Server Sync Endpoint (`server/routes/extension.js`)

**POST `/api/extension/sync`**

**Request Body:**
```json
{
  "source": "shiestybuddy_v2",
  "payload": {
    "profile": { ... },
    "stash": { ... },
    "rounds": { ... },
    "hideout": { ... },
    "loadout": { ... },
    "blueprints": { ... },
    "quests": { ... },
    "projects": { ... }
  },
  "token": "eyJhbG..."  // Access token (optional, for verification)
}
```

**What the Server Does:**
1. Receives the payload from extension
2. Resolves userId from token hash OR session cookie
3. Stores data in `SyncData` collection (MongoDB)
4. Updates `AutoSyncSettings` timestamps
5. Returns success response

```javascript
// Storage logic
await SyncData.updateOne(
  { userId, source: 'extension_full' },
  { $set: { userId, source: 'extension_full', payload, syncedAt: new Date() } },
  { upsert: true }
);

// Also stores individual endpoints for easier querying
for (const ep of ['profile', 'stash', 'rounds', 'hideout', 'loadout', 'blueprints', 'quests', 'projects']) {
  if (payload[ep]) {
    await SyncData.updateOne(
      { userId, source: `extension_${ep}` },
      { $set: { userId, source: `extension_${ep}`, payload: payload[ep], syncedAt: new Date() } },
      { upsert: true }
    );
  }
}
```

---

### 3. Content Script (`shiestybuddy/content.js`)

**Purpose:** Bridge between your website and the extension background script.

**Message Types:**
```javascript
// From Website → Extension
case 'REQUEST_EMBARK_TOKEN':
  // Returns stored token if available
  
case 'TRIGGER_SYNC_NOW':
  // Forces immediate sync
  // Calls background script's pushFullSnapshot()
  
case 'SET_AUTO_SYNC':
  // Enables/disables auto-sync with chrome.alarms
```

**Usage from your website:**
```javascript
window.postMessage({ type: 'TRIGGER_SYNC_NOW' }, '*');
```

---

## How to Trigger Sync

### Method 1: Automatic (Recommended)
Extension auto-syncs every 15 minutes via `chrome.alarms`.

### Method 2: Manual (From Website)
```javascript
// In your React component
const handleSyncNow = async () => {
  window.postMessage({ type: 'TRIGGER_SYNC_NOW' }, '*');
  // Wait for response...
  window.addEventListener('message', (e) => {
    if (e.data?.type === 'SYNC_NOW_RESULT') {
      console.log('Sync result:', e.data.payload);
    }
  });
};
```

### Method 3: On OAuth Login
When user connects their Embark account, sync happens automatically:
```javascript
// In background.js storeEmbarkData()
if (accessToken) {
  pushFullSnapshot(embarkData).catch(() => {});
}
```

---

## Data Retrieval (Server-Side)

Once data is synced to your MongoDB, retrieve it like this:

```javascript
import { SyncData } from '../models/SyncData.js';

// Get latest full sync
const syncDoc = await SyncData.findOne({
  userId: req.user.id,
  source: 'extension_full'
}).sort({ syncedAt: -1 });

// Get specific endpoint
const stashDoc = await SyncData.findOne({
  userId: req.user.id,
  source: 'extension_stash'
}).sort({ syncedAt: -1 });

const stashData = stashDoc?.payload;
```

---

## Architecture Benefits

| Feature | Server Direct | Extension Proxy |
|---------|--------------|-----------------|
| DNS Resolution | ❌ Blocked | ✅ Uses user's ISP |
| Auth Handling | ❌ Complex | ✅ Browser has cookies |
| IP Blocking | ❌ Data-center flagged | ✅ Residential IP |
| Rate Limiting | ❌ Shared pool | ✅ Per-user |
| Real-time | ❌ Polling required | ✅ Push on login |

---

## Troubleshooting

### "EMBARK_TAB_REQUIRED" Error
Extension needs an open tab at `id.embark.games` to execute the fetch script. User must be logged in there.

### "NO_EMBARK_DATA" Error
The fetch from Embark API returned empty. Check if token is expired or user is rate-limited.

### "SYNC_FAILED_401" Error
Server rejected the sync. Token may not be linked to Discord session. Ensure user is logged into shiesty.me.

### Data Not Showing in UI
After sync, data is in MongoDB but may not be in PlayerContext. Call `refresh()` or reload the page.

---

## Quick Implementation Checklist

- [ ] Extension has `scripting` and `alarms` permissions in manifest.json
- [ ] `fetchEmbarkBundle` tries multiple API roots (v2 and legacy)
- [ ] `pushFullSnapshot` executes in Embark tab context, not background
- [ ] Server's `/api/extension/sync` accepts POST with payload + token
- [ ] Server resolves userId from token hash or session
- [ ] Content script forwards messages between page and background
- [ ] Website can trigger sync via `postMessage({ type: 'TRIGGER_SYNC_NOW' })`
- [ ] Auto-sync alarm set up with `chrome.alarms.create()`

---

## API Endpoints Reference

**Extension Calls:**
- `GET https://api.embark.games/arc-raiders/v2/profile`
- `GET https://api.embark.games/arc-raiders/v2/inventory` → mapped as `stash`
- `GET https://api.embark.games/arc-raiders/v2/rounds`
- `GET https://api.embark.games/arc-raiders/v2/hideout`
- `GET https://api.embark.games/arc-raiders/v2/loadout`
- `GET https://api.embark.games/arc-raiders/v2/blueprints`
- `GET https://api.embark.games/arc-raiders/v2/quests`
- `GET https://api.embark.games/arc-raiders/v2/projects`

**Server Endpoints:**
- `POST /api/extension/sync` - Receive data from extension
- `POST /api/extension/token` - Link token to Discord user
- `GET /api/player/combat-breakdown` - Read aggregated stats
- `GET /api/player/weapon-kills` - Read weapon data from sync
- `GET /api/player/enemy-kills` - Read ARC kill data from sync

---

## Security Considerations

1. **Token Storage:** Extension stores access token in `chrome.storage.local` (encrypted by browser)
2. **Token Transmission:** Token is hashed (SHA-256) before being used as lookup key
3. **User Verification:** Server verifies token ownership via `CapturedToken` collection
4. **No Token Logging:** Full token never logged, only hash prefix for debugging
5. **HTTPS Only:** All endpoints enforce HTTPS, no MITM risk

---

## This Architecture Powers

- ✅ Real-time stash values
- ✅ Live raid history  
- ✅ Weapon/ARC kill counts
- ✅ Hideout progression
- ✅ Quest completion status
- ✅ Blueprint learning

All without your server ever touching Embark's API directly.
