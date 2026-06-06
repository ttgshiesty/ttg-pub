# Complete API Returns Debug Document

Generated: 2025-01-XX

## ArcTracker Headers Verification

**Status: ✅ CORRECT**

All ArcTracker API calls use the correct dual-key authentication:

```javascript
headers: {
  'X-App-Key': getAppKey(),  // From ARCTRACKER_APP_KEY environment variable
  'Authorization': `Bearer ${userKey}`,  // User key starts with "arc_u1_"
  'Accept': 'application/json',
  'platform': 'xbox',
  'x-embark-platform': 'xbl',
}
```

- **X-App-Key**: App-wide key from environment (ARCTRACKER_APP_KEY)
- **Authorization**: Bearer token with user-specific key (format: `arc_u1_...`)
- **Platform**: Xbox (xbox/xbl)

## ArcTracker Endpoint Status

**Working Endpoints:**
- `/api/v2/user/profile` ✅
- `/api/v2/user/stash` ✅
- `/api/v2/user/loadout` ✅
- `/api/v2/user/quests` ✅
- `/api/v2/user/hideout` ✅
- `/api/v2/user/projects` ✅
- `/api/v2/user/rounds` ✅
- `/api/v2/user/blueprints` ✅

**Non-Existent Endpoints (404):**
- `/api/v2/user/summary` ❌
- `/api/v2/user/enemy-kills` ❌
- `/api/v2/user/map-performance` ❌
- `/api/v2/user/expedition-status` ❌
- `/api/v2/user/weapon-kills` ❌

**Fallback Strategy:**
For the non-existent ArcTracker endpoints, the system now falls back to:
1. MetaForge API data (via UserDataAPI)
2. Data extracted from rounds (using `summarizeRounds()`)
3. Returns null if no fallback available

---

## API Endpoints by Route File

### 1. ArcTracker Routes (`/api/arctracker`)

#### Public Endpoints (No Auth Required)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/arctracker/public/items` | GET | Array of item objects |
| `/api/arctracker/public/quests` | GET | Array of quest objects |
| `/api/arctracker/public/hideout` | GET | Array of hideout objects |
| `/api/arctracker/public/projects` | GET | Array of project objects |

**Return Example (items):**
```typescript
{
  id: string;
  name: string;
  type: string;
  rarity: string;
  // ... item-specific fields
}
```

#### Authenticated User Data Routes

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/arctracker/link` | POST | `{ linked: boolean, userKey: string }` |
| `/api/arctracker/unlink` | POST | `{ unlinked: boolean }` |
| `/api/arctracker/status` | GET | `{ linked: boolean, hasKey: boolean }` |
| `/api/arctracker/diagnostics` | GET | Diagnostics report object |
| `/api/arctracker/user/profile` | GET | User profile object |
| `/api/arctracker/user/stash` | GET | Stash object with items array |
| `/api/arctracker/user/loadout` | GET | Loadout object |
| `/api/arctracker/user/quests` | GET | Quests array |
| `/api/arctracker/user/hideout` | GET | Hideout progress array |
| `/api/arctracker/user/projects` | GET | Projects array |
| `/api/arctracker/user/rounds` | GET | Rounds array |
| `/api/arctracker/user/blueprints` | GET | Blueprints array |

**Profile Return:**
```typescript
{
  id: string;
  username: string;
  level: number;
  xp: number;
  totalXp: number;
  // ... profile fields
}
```

**Stash Return:**
```typescript
{
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    rarity: string;
    value: number;
    icon?: string;
  }>;
  slots?: number;
  currencies?: object;
  totalValue?: number;
}
```

**Rounds Return:**
```typescript
{
  rounds: Array<{
    roundId: string;
    map: string;
    mapName: string;
    outcome: string;  // "Extracted" | "Failed"
    status: string;
    durationMs?: number;
    duration?: number;
    netValue?: number;
    netProfit?: number;
    valueExtracted?: number;
    lootValue?: number;
    valueBroughtIn?: number;
    loadoutValue?: number;
    damage?: number;
    damageDealt?: number;
    kills?: number;
    arcKills?: number;
    playerKills?: number;
    score?: number;
    xp?: number;
    roundEndedAt?: string;
    syncedAt?: string;
    // ... additional round fields
  }>;
}
```

---

### 2. Stats Routes (`/api/stats`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/stats/debug` | GET | Raw ArcTracker rounds data dump |
| `/api/stats/schema` | GET | Field schema from all ArcTracker endpoints |
| `/api/stats/schema?ep={endpoint}` | GET | Field schema for specific endpoint |
| `/api/stats/overview` | GET | Aggregated stats overview |

**Debug Return:**
```typescript
{
  rounds: Array<...>;  // Same as rounds structure above
  metadata: {
    fetchedAt: string;
    source: string;
    count: number;
  };
}
```

**Schema Return:**
```typescript
{
  endpoint: string;
  fields: Array<{
    name: string;
    type: string;
    sampleValue: any;
    present: boolean;
  }>;
}
```

**Overview Return:**
```typescript
{
  performance: {
    totalRounds: number;
    successfulRaids: number;
    failedRaids: number;
    survivalRate: number;
  };
  combat: {
    kills: number;
    arcKills: number;
    playerKills: number;
    kd: number;
    damage: number;
  };
  economy: {
    netProfit: number;
    lootValue: number;
    avgProfit: number;
    stashValue: number;
  };
  // ... additional stat categories
}
```

---

### 3. Player Routes (`/api/player`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/player/blueprint-finds` | GET | Array of blueprint find objects |
| `/api/player/profile/:username` | GET | Public profile data |
| `/api/player/profile-summary/:username` | GET | Profile summary |
| `/api/player/me` | GET | Full authenticated player profile |
| `/api/player/raider-hub` | GET | Consolidated gameplay data |
| `/api/player/rounds` | GET | Player rounds with pagination |
| `/api/player/sync` | POST | Trigger manual sync |

**Blueprint Finds Return:**
```typescript
{
  finds: Array<{
    _id: string;
    userId: string;
    blueprintId: string;
    blueprintName: string;
    rarity: string;
    map: string;
    condition: string;
    container: string;
    location: string;
    locked: boolean;
    notes: string;
    createdAt: string;
  }>;
}
```

**Raider Hub Return:**
```typescript
{
  profile: { ... };  // User profile
  stats: { ... };  // Aggregated stats
  rounds: Array<...>;  // Recent rounds
  loadout: { ... };  // Current loadout
  stash: { ... };  // Stash summary
  hideout: { ... };  // Hideout progress
  quests: { ... };  // Quest progress
  projects: { ... };  // Project progress
  blueprints: { ... };  // Blueprint progress
  // NOTE: weaponKills, enemyKills, mapPerformance now use MetaForge fallback
  // ArcTracker dedicated endpoints for these do not exist
  weaponKills: Array<{ weaponAssetId: string; name: string; count: number }> | null;
  enemyKills: Array<{ targetId: string; name: string; count: number }> | null;
  mapPerformance: Array<{ mapTargetId: string; mapName: string; raids: number; extracted: number; totalDurationMs: number; totalNetValue: number }> | null;
}
```

---

### 4. MetaForge Routes (`/api/metaforge`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/arc-raiders/player-stats` | GET | MetaForge player stats |
| `/api/arc-raiders/inventory` | GET | Inventory snapshot |
| `/api/arc-raiders/weekly-trials` | GET | Weekly trials data |
| `/api/arc-raiders/sync` | POST | Sync data from MetaForge |
| `/api/arc-raiders/guide-navigation` | GET | Guide navigation structure |

**Player Stats Return:**
```typescript
{
  stats: {
    total_rounds: number;
    total_net_profit: number;
    total_kills: number;
    // ... stat fields
  };
  mapStats: Array<{
    mapName: string;
    raids: number;
    extracted: number;
    // ... map stats
  }>;
  enemyStats: Array<{
    name: string;
    count: number;
    // ... enemy stats
  }>;
  weaponStats: Array<{
    name: string;
    damage: number;
    kills: number;
    // ... weapon stats
  }>;
}
```

---

### 5. Catalog Routes (`/api/catalog`)

#### ArcData Proxied Endpoints

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/catalog/bots` | GET | Array of bot objects |
| `/api/catalog/maps` | GET | Array of map objects |
| `/api/catalog/projects` | GET | Array of project objects |
| `/api/catalog/skill-nodes` | GET | Array of skill node objects |
| `/api/catalog/trades` | GET | Array of trade objects |
| `/api/catalog/items` | GET | Array of item objects |
| `/api/catalog/items/:id` | GET | Single item object |
| `/api/catalog/hideout` | GET | Array of hideout objects |
| `/api/catalog/hideout/:id` | GET | Single hideout object |
| `/api/catalog/quests` | GET | Array of quest objects |
| `/api/catalog/quests/:id` | GET | Single quest object |

#### Normalized Cross-Source Catalog

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/catalog/normalized` | GET | All normalized catalog entries |
| `/api/catalog/normalized/:kind` | GET | Entries by kind (items/quests/projects/etc) |
| `/api/catalog/normalized/:kind/:id` | GET | Single entry by kind and ID |

**Normalized Entry Return:**
```typescript
{
  id: string;
  kind: string;  // "item" | "quest" | "project" | "hideout" | "map"
  source: string;  // "ardb" | "arcdata" | "metaforge"
  name: string;
  raw: object;  // Original source data
  // ... normalized fields
}
```

#### MetaForge-Backed Endpoints

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/catalog/mf/items` | GET | MetaForge items catalog |
| `/api/catalog/mf/items/:id` | GET | Single MetaForge item |
| `/api/catalog/mf/arcs` | GET | ARC enemy units |
| `/api/catalog/mf/arcs/:id` | GET | Single ARC enemy |
| `/api/catalog/mf/quests` | GET | MetaForge quests |
| `/api/catalog/mf/traders` | GET | Vendor inventories |
| `/api/catalog/mf/events-schedule` | GET | Event timers |
| `/api/catalog/mf/event-timers` | GET | Event timers by map/name |
| `/api/catalog/mf/map-data/:mapId` | GET | Per-map MetaForge data |
| `/api/catalog/mf/status` | GET | Cache status |

**MetaForge Item Return:**
```typescript
{
  id: string;
  name: string;
  icon: string;
  rarity: string;
  itemType: string;
  value: number;
  stat_block?: {
    stackSize?: number;
    // ... stat fields
  };
  // ... additional fields
}
```

#### ARDB Static Data Endpoints

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/items` | GET | All ARDB items (567 items) |
| `/api/items/:id` | GET | Single ARDB item with recycling + tag |
| `/api/tags` | GET | All keep/sell/recycle tags |
| `/api/quests` | GET | All ARDB quests (100 quests) |
| `/api/quests/:id` | GET | Single ARDB quest |
| `/api/projects` | GET | Projects with phases + requirements |

**ARDB Item Return:**
```typescript
{
  id: string;
  name: string;
  tag: string;  // "keep" | "sell" | "recycle"
  recycling?: object;
  // ... item fields
}
```

---

### 6. Embark Routes (`/api/embark`)

| Endpoint | Method | Auth | Return Structure |
|-----------|--------|------|------------------|
| `/api/embark/token-exchange` | POST | No | Token exchange response |
| `/api/embark/auto-sync/settings` | GET | Yes | Auto-sync settings |
| `/api/embark/auto-sync/settings` | POST | Yes | Updated auto-sync settings |
| `/api/embark/sync/inventory` | POST | Yes | Synced inventory data |
| `/api/embark/profile` | GET | Yes | User profile |
| `/api/embark/stash` | GET | Yes | User stash |
| `/api/embark/rounds` | GET | Yes | User rounds |
| `/api/embark/hideout` | GET | Yes | Hideout progress |
| `/api/embark/quests` | GET | Yes | Quest progress |
| `/api/embark/projects` | GET | Yes | Project progress |
| `/api/embark/loadout` | GET | Yes | Current loadout |
| `/api/embark/blueprints` | GET | Yes | Blueprint progress |
| `/api/embark/stats` | GET | Yes | User stats summary |

**Token Exchange Return:**
```typescript
{
  token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
}
```

**Auto-Sync Settings Return:**
```typescript
{
  enabled: boolean;
  intervalMinutes: number;
  source: "extension" | "arctracker" | "both";
  lastSyncedAt: string | null;
  nextSyncAt: string | null;
  disabledReason: string | null;
  consecutiveFailures: number;
  lastErrorMessage: string | null;
  lastErrorAt: string | null;
}
```

---

### 7. Extension Routes (`/api/extension`)

| Endpoint | Method | Auth | Return Structure |
|-----------|--------|------|------------------|
| `/api/extension/token` | POST | No | Token capture response |
| `/api/extension/link` | POST | Yes | Link response |
| `/api/extension/status` | GET | No | Link status |
| `/api/extension/debug` | GET | No/Yes | Token debug info |
| `/api/extension/sync` | POST | No | Sync response |
| `/api/extension/xbox-data` | GET | No | Xbox sync data |

**Token Capture Return:**
```typescript
{
  status: "captured" | "already_linked";
  tokenId: string;
  discoveredEndpoint: string | null;
  testResults: Array<{
    url: string;
    status: number;
    hasItems: boolean;
  }>;
}
```

**Sync Return:**
```typescript
{
  status: "synced";
  received: boolean;
  endpoints: string[];  // Array of synced endpoint names
}
```

---

### 8. Marketplace Routes (`/api/marketplace`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/marketplace/trade-center` | GET | Trade center summary |
| `/api/marketplace` | GET | Browse listings with filters |
| `/api/marketplace/my-listings` | GET | User's own listings |
| `/api/marketplace/warehouse` | GET | Warehouse summary |
| `/api/marketplace/stash-items` | GET | Available stash items |
| `/api/marketplace/list` | POST | Create new listing |
| `/api/marketplace/optimize-listing` | POST | AI-optimized listing |
| `/api/marketplace/bulk-ingest` | POST | Parse bulk listing text |

**Trade Center Return:**
```typescript
{
  wallet: {
    credits: number;
    tokens: number;
  };
  inventoryStats: {
    activeListings: number;
    pendingOffers: number;
    wantedItems: number;
  };
  storefront: {
    name: string;
    description: string;
  };
  categories: Array<{
    _id: string;
    count: number;
  }>;
}
```

**Listings Browse Return:**
```typescript
{
  listings: Array<{
    _id: string;
    sellerId: string;
    sellerName: string;
    itemId: string;
    itemName: string;
    itemType: string;
    itemrarity: string;
    itemIconUrl: string;
    itemQuantity: number;
    price: number;
    currency: string;
    description: string;
    status: string;
    createdAt: string;
    blueprintId?: string;
    blueprintIntel?: object;
    communityFindsCount?: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

**Warehouse Return:**
```typescript
{
  account: "main" | "trade";
  source: string;
  groups: Array<{
    itemId: string;
    itemName: string;
    itemType: string;
    itemIconUrl: string;
    rarity: string;
    value: number;
    quantity: number;
    stackSize: number;
    slotEstimate: number;
    listedQuantity: number;
    isListed: boolean;
    medianSoldPrice: number | null;
    questDemand: Array<{ questName: string; quantity: number; source: string }>;
    questDemandCount: number;
    estimatedValue: number;
  }>;
  activeListings: Array<...>;
  summary: {
    totalGroups: number;
    totalItems: number;
    totalSlots: number;
    listedCount: number;
    staleCount: number;
    estimatedAssetValue: number;
    questDemandGroups: number;
  };
}
```

---

### 9. Discord Routes (`/api/discord`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/discord/webhook` | POST | Webhook save response |
| `/api/discord/webhook` | DELETE | Webhook delete response |
| `/api/discord/webhook/status` | GET | Webhook status |
| `/api/discord/notify/store` | POST | Storefront notification |
| `/api/discord/notify/raid` | POST | Raid notification |
| `/api/discord/notify/progress` | POST | Progress notification |
| `/api/discord/notify/blueprint` | POST | Blueprint offer/want |
| `/api/discord/notify/blueprint-find` | POST | Blueprint find report |

**Webhook Save Return:**
```typescript
{
  status: "connected";
  webhookUrl: string;
}
```

**Notification Return:**
```typescript
{
  sent: boolean;
}
```

**Blueprint Find Return:**
```typescript
{
  sent: boolean;
  find: {
    _id: string;
    userId: string;
    blueprintId: string;
    blueprintName: string;
    rarity: string;
    map: string;
    condition: string;
    container: string;
    location: string;
    locked: boolean;
    notes: string;
    source: "discord";
  };
}
```

---

### 10. Map Progress Routes (`/api/map-progress`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/map-progress` | GET | User map progress |
| `/api/map-progress` | PUT | Update map progress |

**Map Progress Return:**
```typescript
{
  version: number;
  maps: {
    [mapId: string]: {
      p: {
        [pinId: string]: boolean;  // Visited pins
      };
    };
  };
}
```

---

### 11. Raider Sync Routes (`/api/raider-sync`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/raider-sync/profile` | GET | Sync profile state |
| `/api/raider-sync` | GET | Alias for profile |
| `/api/raider-sync/embark-username` | POST | Save Embark username |
| `/api/raider-sync` | POST | Alias for embark-username |
| `/api/raider-sync/metaforge-profile` | POST | Save MetaForge profile |
| `/api/raider-sync/error` | POST | Save sync error |
| `/api/raider-sync` | DELETE | Clear Embark/MetaForge link |

**Sync Profile Return:**
```typescript
{
  embarkUsername: string | null;
  embarkLinked: boolean;
  metaForgeProfileId: string | null;
  metaForgeLinked: boolean;
  lastSyncError: string | null;
}
```

---

### 12. Public Profile Routes (`/api/profile`)

| Endpoint | Method | Auth | Return Structure |
|-----------|--------|------|------------------|
| `/api/profile/:slug` | GET | No | Public profile |
| `/api/profile/:slug/listings` | GET | No | Public listings |
| `/api/profile/:slug/recent` | GET | No | Recent rounds |
| `/api/slug` | POST | Yes | Claim/update slug |
| `/api/visibility` | POST | Yes | Toggle visibility |

**Public Profile Return:**
```typescript
{
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  bio: string;
  slug: string | null;
  embarkLinked: boolean;
  embarkUsername: string | null;
  level: number;
  xp: number;
  totalXp: number;
  storefrontName: string;
  storefrontDescription: string;
  badges: string[];
  salesCount: number;
  marketplaceRep: number;
  stats: {
    totalRaids: number;
    successfulExtractions: number;
    totalKills: number;
    netProfit: number;
    stashValue: number;
    kd: number;
    extractRate: number;
  };
  createdAt: string;
}
```

---

### 13. G2G Routes (`/api/g2g`)

| Endpoint | Method | Auth | Return Structure |
|-----------|--------|------|------------------|
| `/api/g2g/health` | GET | No | G2G health status |
| `/api/g2g/products` | GET | Yes | G2G products |
| `/api/g2g/services` | GET | Yes | G2G services |
| `/api/g2g/brands` | GET | Yes | G2G brands by service |
| `/api/g2g/offers` | GET | Yes | G2G offers search |
| `/api/g2g/offers` | POST | Yes | Create G2G offer |
| `/api/g2g/offers/:offerId` | PATCH | Yes | Update G2G offer |
| `/api/g2g/offers/:offerId` | DELETE | Yes | Delete G2G offer |
| `/api/g2g/orders/:orderId` | GET | Yes | Get G2G order |
| `/api/g2g/orders/:orderId/delivery` | POST | Yes | Mark order delivered |
| `/api/g2g/webhook` | GET | No | Webhook endpoint info |
| `/api/g2g/webhook` | POST | No | G2G webhook handler |

**G2G Envelope Return:**
```typescript
{
  ok: boolean;
  request_id: string;
  code: string;
  message: string;
  warning?: string;
  payload: any;
}
```

**Health Return:**
```typescript
{
  g2g: {
    configured: boolean;
    missingKeys?: string[];
    api?: {
      ok: boolean;
      code?: string;
      error?: string;
    };
  };
}
```

---

### 14. Health Routes (`/api/health`)

| Endpoint | Method | Return Structure |
|-----------|--------|------------------|
| `/api/health/system` | GET | System health report |
| `/api/health/sync` | GET | Sync performance metrics |
| `/api/health/database` | GET | Database performance check |

**System Health Return:**
```typescript
{
  timestamp: string;
  status: "healthy" | "degraded" | "unhealthy";
  services: {
    database: "healthy" | "degraded" | "unhealthy";
    arctracker: "healthy" | "degraded" | "unhealthy";
    sync: "healthy" | "degraded" | "unhealthy";
  };
  metrics: {
    activeSyncs: number;
    recentFailures: number;
    circuitBreakerStatus: "open" | "closed";
    circuitBreakerFailures: number;
    totalUsers?: number;
  };
  performance: {
    memoryUsage: object;
    uptime: number;
  };
}
```

**Sync Metrics Return:**
```typescript
{
  timestamp: string;
  lastHour: {
    totalSyncs: number;
    successfulSyncs: number;
    failedSyncs: number;
    avgSyncTime: number;
  };
  last24Hours: {
    totalSyncs: number;
    successfulSyncs: number;
    failedSyncs: number;
    uniqueUsers: number;
  };
  currentStatus: {
    activeSyncSettings: number;
    usersWithErrors: number;
    usersRateLimited: number;
  };
  topErrors: Array<{
    error: string;
    count: number;
  }>;
}
```

**Database Health Return:**
```typescript
{
  timestamp: string;
  status: "healthy" | "unhealthy";
  performance: {
    queryTime: string;
    collections: {
      users: number;
      syncData: number;
      autoSyncSettings: number;
    };
  };
  database: object | null;
}
```

---

## Summary

**Total Route Files:** 14
**Total Endpoints:** ~100+

**ArcTracker Headers:** ✅ Verified correct
- X-App-Key from environment
- Authorization: Bearer {userKey}
- Accept: application/json
- Platform: xbox/xbl

**ArcTracker Endpoint Status:**
- Working (8): profile, stash, loadout, quests, hideout, projects, rounds, blueprints
- Non-existent (5): summary, enemy-kills, map-performance, expedition-status, weapon-kills
- For non-existent endpoints, system falls back to MetaForge data or rounds aggregation

**Key External APIs:**
1. ArcTracker (arctracker.io) - Game data proxy (partial endpoint availability)
2. MetaForge (metaforge.app) - Player stats (primary fallback for missing ArcTracker endpoints)
3. Embark (auth.embark.net) - OAuth token exchange
4. ArcData (arcdata.mahcks.com) - Static game catalog
5. G2G - Marketplace integration

**Data Sources:**
- MongoDB (User, SyncData, MarketplaceListing, BlueprintFind, etc.)
- ArcTracker API (authenticated user data - 8 working endpoints)
- MetaForge API (player stats - primary fallback)
- Extension sync (browser-based data capture)
- Xbox bridge (direct game data)

**Authentication:**
- Discord OAuth (session-based)
- ArcTracker user keys (per-user, format: arc_u1_...)
- Embark tokens (OAuth flow)
- Extension tokens (captured from browser)

**Caching:**
- ArcTracker: 5 seconds fresh, 30 minutes stale
- MetaForge: 30 seconds
- Raider Hub: 5 minutes
- Stats: 5 seconds

**Rate Limits:**
- ArcTracker: 500 requests/hour per app key
- Circuit breaker: Opens after 5 consecutive failures, resets after 5 minutes
