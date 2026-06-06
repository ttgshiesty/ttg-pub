# Sync Workflow

Use this for Embark, ArcTracker, extension, stash, rounds, loadout, quests, blueprints, projects, and live player data sync.

## Rule

Do not use direct server-side Embark API polling as the primary approach.

Embark can block data-center IPs. Use extension-based sync.

## Correct Flow

```txt
User Browser / Extension
  -> Embark API through user's ISP/session
  -> POST https://shiesty.me/api/extension/sync
  -> MongoDB SyncData
  -> SHiESTY API
  -> Frontend PlayerContext / dashboard
```

## Key Files

- `shiestybuddy/background.js`
- `shiestybuddy/content.js`
- `shiestybuddy/embark-content.js`
- `server/routes/extension.js`
- `server/models/SyncData.js`
- `server/models/AutoSyncSettings.js`
- `server/services/raiderSync.js`
- `server/services/userDataApi.js`
- `client/src/lib/extensionBridge.ts`
- `client/src/context/PlayerContext.tsx`

## Troubleshooting

- `EMBARK_TAB_REQUIRED`: user needs an active logged-in Embark tab.
- `NO_EMBARK_DATA`: token expired, rate-limited, or empty response.
- `SYNC_FAILED_401`: token/session mismatch.
- Data in MongoDB but not UI: refresh PlayerContext or reload.
