# Real Working API Returns

This document records the currently verified API return shapes used by SHiESTY.me stats and catalog logic.

## ArcTracker v2 authenticated user API

Auth headers:

```txt
X-App-Key: <server app key>
Authorization: Bearer <arc_u1 user key>
```

Base endpoint group:

```txt
GET /api/v2/user/profile
GET /api/v2/user/stash
GET /api/v2/user/loadout
GET /api/v2/user/quests
GET /api/v2/user/hideout
GET /api/v2/user/projects
GET /api/v2/user/rounds
GET /api/v2/user/blueprints
```

### `GET /api/v2/user/profile`

Top-level keys:

```txt
userId, username, playerLevel, memberSince
```

Sample shape:

```json
{
  "userId": "string",
  "username": "string",
  "playerLevel": "string",
  "memberSince": "date-time-etc
}
```

### `GET /api/v2/user/stash`

Top-level keys:

```txt
items, currencies, slots, pagination, syncedAt
```

Item fields:

```txt
itemId, name, quantity, slotIndex, durabilityPercent, attachments
```

Sample item shape:

```json
{
  "itemId": "renegade_iv",
  "name": "Renegade IV",
  "quantity": 1,
  "slotIndex": 0,
  "durabilityPercent": 100,
  "attachments": [
    {
      "itemId": "compensator_iii",
      "name": "Compensator III",
      "quantity": 1,
      "slotIndex": 0,
      "durabilityPercent": 100
    }
  ]
}
```

### `GET /api/v2/user/loadout`

Top-level keys:

```txt
loadout, syncedAt
```

Loadout keys:

```txt
augment, shield, weapon1, weapon2, backpack, quickItems, safePocket, augmentedSlots, slotCounts
```

Sample shape:

```json
{
  "loadout": {
    "augment": null,
    "shield": {
      "itemId": "__empty_slot__",
      "name": null,
      "quantity": 1,
      "slotIndex": 3,
      "durabilityPercent": 100
    },
    "weapon1": {
      "itemId": "__empty_slot__",
      "name": null,
      "quantity": 1,
      "slotIndex": 1,
      "durabilityPercent": 100
    },
    "weapon2": {
      "itemId": "__empty_slot__",
      "name": null,
      "quantity": 1,
      "slotIndex": 2,
      "durabilityPercent": 100
    },
    "backpack": [],
    "quickItems": [],
    "safePocket": [],
    "augmentedSlots": [],
    "slotCounts": {
      "backpack": 10,
      "quickItems": 4,
      "safePocket": 1,
      "augmentedSlots": 0
    }
  },
  "syncedAt": "last sync date time
}
```

### `GET /api/v2/user/quests`

Top-level keys:

```txt
quests, summary
```

Quest fields:

```txt
id, name, trader, completed
```

Sample quest:

```json
{
  "id": "12_cold_storage",
  "name": "Cold Storage",
  "trader": "Shani",
  "completed": true
}
```

### `GET /api/v2/user/rounds`

Top-level keys:

```txt
rounds, pagination
```

Round fields:

```txt
id, roundId, map, mapName, outcome, durationMs, valueBroughtIn, valueExtracted, netValue, kills, arcKills, playerKills, playerDowns, damage, score, isLegacy, roundEndedAt, roundEndedAtPrecision, seasonNumber, syncedAt, lootedItems
```

Sample round:

```json
{
  "id": "AWVjMt2rrW97uVTfCIvHQ",
  "roundId": "d7sd1dhj04fc73c652hg",
  "map": "dam-battleground",
  "mapName": "The Dam",
  "outcome": "died",
  "durationMs": 1096233,
  "valueBroughtIn": 0,
  "valueExtracted": 0,
  "netValue": 0,
  "kills": 0,
  "arcKills": 0,
  "playerKills": 0,
  "playerDowns": 0,
  "damage": 14,
  "score": 3558,
  "isLegacy": false,
  "roundEndedAt": "datee-time.000Z",
  "roundEndedAtPrecision": "halfhour",
  "seasonNumber": 3,
  "syncedAt": "2026-05-04T17:25:18.166Z",
  "lootedItems": null
}
```

### `GET /api/v2/user/blueprints`

Top-level keys:

```txt
blueprints, summary
```

Blueprint fields:

```txt
id, name, category, rarity, learned, targetItemId
```

Sample blueprint:

```json
{
  "id": "anvil_blueprint",
  "name": "Anvil Blueprint",
  "category": "Weapons",
  "rarity": "Common",
  "learned": true,
  "targetItemId": "anvil"
}
```

## MetaForge public API

Base URL:

```txt
https://metaforge.app/api/arc-raiders
```

### `GET /api/arc-raiders/items?limit=2`

Status: working live.

Top-level keys:

```txt
data, maxValue, pagination
```

Item fields observed:

```txt
id, name, description, item_type, loadout_slots, icon, rarity, value, workbench, stat_block, flavor_text, subcategory, created_at, updated_at, shield_type, loot_area, sources, ammo_type, locations, guide_links, game_asset_id, article
```

Pagination fields:

```txt
page, limit, total, totalPages, hasNextPage, hasPrevPage
```

Sample item:

```json
{
  "id": "adrenaline-shot",
  "name": "Adrenaline Shot",
  "description": "A serum that fully restores stamina and temporarily increases stamina regeneration",
  "item_type": "Quick Use",
  "loadout_slots": ["backpack", "quickUse", "safePocket"],
  "icon": "https://cdn.metaforge.app/arc-raiders/icons/adrenaline-shot.webp",
  "rarity": "Common",
  "value": 300,
  "workbench": "Med Stations 1",
  "stat_block": {
    "weight": 0.2,
    "useTime": 1,
    "duration": 10,
    "stackSize": 5,
    "staminaPerSecond": 5
  },
  "created_at": "2025-09-23T18:21:03.51415+00:00",
  "updated_at": "2026-01-31T06:29:13.011643+00:00",
  "locations": [],
  "guide_links": [],
  "game_asset_id": -9999,
  "article": null
}
```

### `GET /api/arc-raiders/arcs?limit=2`

Status: working live.

Top-level keys:

```txt
data, pagination
```

ARC fields observed:

```txt
id, name, description, icon, image, created_at, updated_at
```

Sample ARC:

```json
{
  "id": "bastion",
  "name": "Bastion",
  "description": "A massive, heavily armored ARC unit, built around a terrifying, fully automatic minigun.",
  "icon": "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bastion.webp",
  "image": "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/images/bastion.webp",
  "created_at": "2025-10-08T11:16:51.624713+00:00",
  "updated_at": "2025-11-04T15:53:56.05961+00:00"
}
```

### `GET /api/arc-raiders/quests?limit=2`

Status: working live.

Top-level keys:

```txt
data, pagination
```

Quest fields observed:

```txt
id, name, objectives, xp, granted_items, created_at, updated_at, locations, marker_category, image, guide_links, trader_name, sort_order, position, required_items, rewards
```

Reward item fields observed:

```txt
id, item, item_id, quantity
```

Sample quest shape:

```json
{
  "id": "a-bad-feeling",
  "name": "A Bad Feeling",
  "objectives": ["Find and search any ARC Probe or ARC Courier"],
  "xp": 0,
  "granted_items": [],
  "locations": [],
  "marker_category": null,
  "image": "https://cdn.metaforge.app/arc-raiders/images/a-bad-feeling.webp",
  "guide_links": [
    {
      "url": "https://metaforge.app/arc-raiders/a-bad-feeling-quest-arc-raiders",
      "label": "A Bad Feeling Quest Guide"
    }
  ],
  "trader_name": "Celeste",
  "sort_order": 0,
  "position": { "x": 210, "y": 800 },
  "required_items": [],
  "rewards": [
    {
      "id": "1dcfa564-efc5-4e00-aac9-aefe21a8eb31",
      "item": {
        "id": "duct-tape-recipe",
        "icon": "https://cdn.metaforge.app/arc-raiders/icons/duct-tape.webp",
        "name": "Duct Tape",
        "rarity": "Uncommon",
        "item_type": "Topside Material"
      },
      "item_id": "duct-tape-recipe",
      "quantity": "5"
    }
  ]
}
```

### `GET /api/arc-raiders/events-schedule`

Status: working live.

Top-level keys:

```txt
data, cachedAt
```

Event fields observed:

```txt
name, map, icon, startTime, endTime
```

Sample event:

```json
{
  "name": "Night Raid",
  "map": "Buried City",
  "icon": "https://cdn.metaforge.app/arc-raiders/custom/night.webp",
  "startTime": 1778130000000,
  "endTime": 1778133600000
}
```

### `GET /api/arc-raiders/traders`

Status: working live.

Top-level keys:

```txt
success, data
```

Trader names observed:

```txt
Apollo, Celeste, Lance, Shani, Tian
```

Trader item fields observed:

```txt
id, icon, name, value, rarity, item_type, description, trader_price
```

Sample trader item:

```json
{
  "id": "barricade-kit",
  "icon": "https://cdn.metaforge.app/arc-raiders/icons/barricade-kit.webp",
  "name": "Barricade Kit",
  "value": 640,
  "rarity": "Uncommon",
  "item_type": "Quick Use",
  "description": "A deployable cover that can block incoming damage until it breaks.",
  "trader_price": 1920
}
```

### `GET /api/game-map-data`

Status: skipped by request because this endpoint requires map parameters.

Known client call shape:

```txt
GET https://metaforge.app/api/game-map-data?mapID=<mapID>
```

### `GET /api/arc-raiders/weekly-trials`

Status: not working live at the current app URL.

Observed result:

```txt
404 Not Found
```

The current client points to this same URL, so Weekly Trials should be treated as unavailable until the correct MetaForge endpoint is found.

## Mapping fixes applied

The app now prioritizes the live ArcTracker v2 fields in these areas:

- **Server stats aggregation**: `server/services/statsAggregator.js`
- **ArcTracker summary helper**: `server/services/arctracker.js`
- **Player routes**: `server/routes/player.js`
- **Dashboard consumers**: `client/src/pages/DashboardPage.tsx`
- **Codex consumers**: `client/src/pages/CodexPage.tsx`
- **My Profile consumers**: `client/src/pages/MyProfilePage.tsx`
- **Raid History consumers**: `client/src/pages/RaidHistoryPage.tsx`
- **Header currency display**: `client/src/components/Header.tsx`
- **Player context typings**: `client/src/context/PlayerContext.tsx`
- **Discord command summaries**: `server/services/discordCommands.js`

Live field priority used by stats:

```txt
outcome before status
durationMs before duration
netValue before netProfit
valueExtracted before lootValue
valueBroughtIn before loadoutValue
damage before damageDealt
score before xp
roundEndedAt before syncedAt
learned before unlocked for blueprints
```
