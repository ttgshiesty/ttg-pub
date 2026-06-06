# Complete API Returns Reference

This document contains all verified real working API returns from:
1. **ArcTracker v2 API** (authenticated)
2. **MetaForge API** (public)
3. **SHiESTY.me Internal APIs**

---

## Table of Contents

1. [ArcTracker v2 Authenticated API](#arctracker-v2-authenticated-api)
2. [MetaForge Public API](#metaforge-public-api)
3. [SHiESTY.me Internal APIs](#shiestyme-internal-apis)
4. [Field Priority Mapping](#field-priority-mapping)

---

## ArcTracker v2 Authenticated API

Base URL: `https://arctracker.io`

Authentication:
```
X-App-Key: <server app key>
Authorization: Bearer <arc_u1 user key>
```

---

### `GET /api/v2/user/profile`

**Status:** ✅ Working

**Top-level keys:**
```
userId, username, playerLevel, memberSince
```

**Real Return:**
```json
{
  "userId": "kmW5dpvat2WIn2cEM4juBF7DoSPP8maj",
  "username": "Konartist",
  "playerLevel": 75,
  "memberSince": "2026-03-03T02:36:20.959Z"
}
```

---

### `GET /api/v2/user/summary`

**Status:** ✅ Working

**Top-level keys:**
```
totalRounds, totalExtracted, totalDied, totalTimeMs, totalValueExtracted,
totalValueBroughtIn, totalNetValue, totalArcKills, totalPlayerKills,
totalDamage, totalContainersLooted
```

**Real Return:**
```json
{
  "totalRounds": 1614,
  "totalExtracted": 943,
  "totalDied": 671,
  "totalTimeMs": 1271461285,
  "totalValueExtracted": 93702243,
  "totalValueBroughtIn": 67170093,
  "totalNetValue": 26532150,
  "totalArcKills": 5791,
  "totalPlayerKills": 131,
  "totalDamage": 919190,
  "totalContainersLooted": 20151
}
```

---

### `GET /api/v2/user/stash`

**Status:** ✅ Working

**Top-level keys:**
```
items, currencies, slots, pagination, syncedAt
```

**Item fields:**
```
itemId, name, quantity, slotIndex, durabilityPercent, attachments
```

**Attachment fields:**
```
itemId, name, quantity, slotIndex, durabilityPercent
```

**Real Return (sample item):**
```json
{
  "items": [
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
        },
        {
          "itemId": "extended_medium_mag_iii",
          "name": "Extended Medium Mag III",
          "quantity": 1,
          "slotIndex": 1,
          "durabilityPercent": 100
        },
        {
          "itemId": "stable_stock_iii",
          "name": "Stable Stock III",
          "quantity": 1,
          "slotIndex": 2,
          "durabilityPercent": 100
        }
      ]
    }
  ],
  "currencies": {
    "credits": 750,
    "cred": 739,
    "raiderTokens": 200
  },
  "slots": {
    "used": 5,
    "total": 50
  },
  "pagination": {
    "page": 1,
    "perPage": 500,
    "total": 5
  },
  "syncedAt": "2026-05-07T05:45:33.638Z"
}
```

---

### `GET /api/v2/user/loadout`

**Status:** ✅ Working

**Top-level keys:**
```
loadout, syncedAt
```

**Loadout fields:**
```
augment, shield, weapon1, weapon2, backpack, quickItems, safePocket, augmentedSlots, slotCounts
```

**Equipment item fields:**
```
itemId, name, quantity, slotIndex, durabilityPercent
```

**Slot count fields:**
```
backpack, quickItems, safePocket, augmentedSlots
```

**Real Return:**
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
  "syncedAt": "2026-05-05T03:05:31.334Z"
}
```

---

### `GET /api/v2/user/quests`

**Status:** ✅ Working

**Top-level keys:**
```
quests, summary
```

**Quest fields:**
```
id, name, trader, completed
```

**Real Return (sample):**
```json
{
  "quests": [
    {
      "id": "12_cold_storage",
      "name": "Cold Storage",
      "trader": "Shani",
      "completed": true
    }
  ],
  "summary": {
    "total": 104,
    "completed": 89
  }
}
```

---

### `GET /api/v2/user/rounds`

**Status:** ✅ Working

**Top-level keys:**
```
rounds, pagination
```

**Round fields:**
```
id, roundId, map, mapName, outcome, durationMs, valueBroughtIn, valueExtracted,
netValue, kills, arcKills, playerKills, playerDowns, damage, score, isLegacy,
roundEndedAt, roundEndedAtPrecision, seasonNumber, syncedAt, lootedItems
```

**Real Return (sample round):**
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
  "roundEndedAt": "2026-05-04T17:12:39.000Z",
  "roundEndedAtPrecision": "halfhour",
  "seasonNumber": 3,
  "syncedAt": "2026-05-04T17:25:18.166Z",
  "lootedItems": null
}
```

---

### `GET /api/v2/user/blueprints`

**Status:** ✅ Working

**Top-level keys:**
```
blueprints, summary
```

**Blueprint fields:**
```
id, name, category, rarity, learned, targetItemId
```

**Real Return (sample):**
```json
{
  "blueprints": [
    {
      "id": "anvil_blueprint",
      "name": "Anvil Blueprint",
      "category": "Weapons",
      "rarity": "Common",
      "learned": true,
      "targetItemId": "anvil"
    }
  ],
  "summary": {
    "total": 81,
    "learned": 74
  }
}
```

---

### `GET /api/v2/user/enemy-kills`

**Status:** ✅ Working

**Top-level keys:**
```
enemies
```

**Enemy fields:**
```
targetId, name, count
```

**Real Return (all 18 ARC types):**
```json
{
  "enemies": [
    {"targetId": 672378114, "name": "Wasp", "count": 1175},
    {"targetId": 299263764, "name": "Fireball", "count": 1021},
    {"targetId": -352140120, "name": "Tick", "count": 891},
    {"targetId": -504231823, "name": "Pop", "count": 820},
    {"targetId": 664422097, "name": "Hornet", "count": 582},
    {"targetId": 913532953, "name": "Turret", "count": 358},
    {"targetId": 1786451563, "name": "Snitch", "count": 235},
    {"targetId": -1524715377, "name": "Firefly", "count": 173},
    {"targetId": -1562077677, "name": "Spotter", "count": 162},
    {"targetId": 2015925366, "name": "Shredder", "count": 67},
    {"targetId": 903845622, "name": "Rocketeer", "count": 66},
    {"targetId": -541195755, "name": "Leaper", "count": 53},
    {"targetId": -1780443771, "name": "Comet", "count": 47},
    {"targetId": -1616729167, "name": "Bastion", "count": 35},
    {"targetId": -1311527696, "name": "Bombardier", "count": 26},
    {"targetId": 1143392102, "name": "ARC Surveyor", "count": 21},
    {"targetId": -1122989322, "name": "Sentinel", "count": 17},
    {"targetId": 1639912088, "name": "Vaporizer", "count": 5}
  ]
}
```

---

### `GET /api/v2/user/weapon-kills`

**Status:** ✅ Working

**Top-level keys:**
```
weapons
```

**Weapon fields:**
```
weaponAssetId, itemId, name, count
```

**Real Return (top 15):**
```json
{
  "weapons": [
    {"weaponAssetId": 168902929, "itemId": "venator_iv", "name": "Venator IV", "count": 648},
    {"weaponAssetId": -922322200, "itemId": "seeker_grenade", "name": "Seeker Grenade", "count": 536},
    {"weaponAssetId": 1650182822, "itemId": "renegade_iv", "name": "Renegade IV", "count": 501},
    {"weaponAssetId": -1074160440, "itemId": "wolfpack", "name": "Wolfpack", "count": 383},
    {"weaponAssetId": 1951118983, "itemId": "anvil_i", "name": "Anvil I", "count": 374},
    {"weaponAssetId": 1858816158, "itemId": "venator_i", "name": "Venator I", "count": 295},
    {"weaponAssetId": -853744599, "itemId": "venator_ii", "name": "Venator II", "count": 223},
    {"weaponAssetId": 411757406, "itemId": null, "name": "Raider Tool", "count": 214},
    {"weaponAssetId": 331271227, "itemId": "il_toro_iv", "name": "Il Toro IV", "count": 209},
    {"weaponAssetId": -1974459892, "itemId": "anvil_ii", "name": "Anvil II", "count": 180},
    {"weaponAssetId": -1300343709, "itemId": "ferro_i", "name": "Ferro I", "count": 154},
    {"weaponAssetId": -119018899, "itemId": "venator_iii", "name": "Venator III", "count": 153},
    {"weaponAssetId": 1407799927, "itemId": "burletta_iv", "name": "Burletta IV", "count": 114},
    {"weaponAssetId": 1343472835, "itemId": "hullcracker_iv", "name": "Hullcracker IV", "count": 112},
    {"weaponAssetId": -14963185, "itemId": "ferro_iv", "name": "Ferro IV", "count": 86}
  ]
}
```

---

### `GET /api/v2/user/map-performance`

**Status:** ✅ Working

**Top-level keys:**
```
maps
```

**Map fields:**
```
mapTargetId, mapName, raids, extracted, totalDurationMs, totalNetValue
```

**Real Return:**
```json
{
  "maps": [
    {"mapTargetId": -636184135, "mapName": "The Dam", "raids": 587, "extracted": 271, "totalDurationMs": 370221367, "totalNetValue": 6048094},
    {"mapTargetId": -742689897, "mapName": "The Dam", "raids": 337, "extracted": 229, "totalDurationMs": 281192765, "totalNetValue": 6935026},
    {"mapTargetId": -2024805679, "mapName": "Stella Montis", "raids": 299, "extracted": 177, "totalDurationMs": 230730058, "totalNetValue": 6456983},
    {"mapTargetId": 1519485851, "mapName": "The Blue Gate", "raids": 178, "extracted": 111, "totalDurationMs": 178173040, "totalNetValue": 3434052},
    {"mapTargetId": -1973721684, "mapName": "Buried City", "raids": 123, "extracted": 87, "totalDurationMs": 109232922, "totalNetValue": 2142683},
    {"mapTargetId": 594749606, "mapName": "Spaceport", "raids": 90, "extracted": 68, "totalDurationMs": 101911133, "totalNetValue": 1515312}
  ]
}
```

---

### `GET /api/v2/user/expedition-status`

**Status:** ✅ Working

**Top-level keys:**
```
completedExpeditions, activeSeason, state, currentTier, nextTier, updatedAt
```

**Real Return:**
```json
{
  "completedExpeditions": 1,
  "activeSeason": 2,
  "state": "READY",
  "currentTier": 481486056,
  "nextTier": 935023891,
  "updatedAt": 1778189365636
}
```

---

### `GET /api/v2/user/projects`

**Status:** ✅ Working

**Top-level keys:**
```
playerLevel, gameProgress
```

**Game progress fields:**
```
questStatuses, neededItemCounts
```

**Real Return (partial):**
```json
{
  "playerLevel": 1,
  "gameProgress": {
    "questStatuses": {
      "ss11": true,
      "movie_night": true,
      "ss8": true,
      "ss10k": false,
      "clamoring_for_attention": false
    },
    "neededItemCounts": {
      "arc_alloy_project_expedition_project_phase1": 80,
      "plastic_parts_project_expedition_project_phase1": 200,
      "metal_parts_project_expedition_project_phase1": 150
    }
  }
}
```

---

## MetaForge Public API

Base URL: `https://metaforge.app/api/arc-raiders`

No authentication required.

---

### `GET /api/arc-raiders/items`

**Status:** ✅ Working

**Query params:**
```
page, limit, id, item_type, rarity, search, sortBy, sortOrder
```

**Top-level keys:**
```
data, maxValue, pagination
```

**Item fields:**
```
id, name, description, item_type, loadout_slots, icon, rarity, value, workbench,
stat_block, flavor_text, subcategory, created_at, updated_at, shield_type,
loot_area, sources, ammo_type, locations, guide_links, game_asset_id, article
```

**Stat block fields:**
```
range, value, damage, health, radius, shield, weight, agility, arc_stun, healing,
stamina, stealth, use_time, duration, fire_rate, stability, stack_size, damage_mult,
raider_stun, weight_limit, augment_slots, healing_slots, magazine_size, reduced_noise,
shield_charge, backpack_slots, quick_use_slots, damage_per_second, movement_penalty,
safe_pocket_slots, damage_mitigation, healing_per_second, reduced_equip_time,
increased_ads_speed, increased_fire_rate, reduced_reload_time, illumination_radius,
increased_equip_time, reduced_unequip_time, shield_compatibility, increased_unequip_time,
reduced_vertical_recoil, increased_bullet_velocity, increased_vertical_recoil,
reduced_max_shot_dispersion, reduced_per_shot_dispersion, reduced_durability_burn_rate,
reduced_recoil_recovery_time, increased_recoil_recovery_time, reduced_dispersion_recovery_time
```

**Pagination fields:**
```
page, limit, total, totalPages, hasNextPage, hasPrevPage
```

**Real Return (sample):**
```json
{
  "data": [
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
  ],
  "maxValue": 1000000000000,
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 567,
    "totalPages": 284,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### `GET /api/arc-raiders/arcs`

**Status:** ✅ Working

**Top-level keys:**
```
data, pagination
```

**ARC fields:**
```
id, name, description, icon, image, created_at, updated_at
```

**Real Return (sample):**
```json
{
  "data": [
    {
      "id": "bastion",
      "name": "Bastion",
      "description": "A massive, heavily armored ARC unit, built around a terrifying, fully automatic minigun.",
      "icon": "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/icons/bastion.webp",
      "image": "https://unhbvkszwhczbjxgetgk.supabase.co/storage/v1/object/public/images/arc-raiders/images/bastion.webp",
      "created_at": "2025-10-08T11:16:51.624713+00:00",
      "updated_at": "2025-11-04T15:53:56.05961+00:00"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 10,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### `GET /api/arc-raiders/quests`

**Status:** ✅ Working

**Top-level keys:**
```
data, pagination
```

**Quest fields:**
```
id, name, objectives, xp, granted_items, created_at, updated_at, locations,
marker_category, image, guide_links, trader_name, sort_order, position,
required_items, rewards
```

**Reward fields:**
```
id, item, item_id, quantity
```

**Real Return (sample):**
```json
{
  "data": [
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
  ],
  "pagination": {
    "page": 1,
    "limit": 2,
    "total": 100,
    "totalPages": 50,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

---

### `GET /api/arc-raiders/events-schedule`

**Status:** ✅ Working

**Top-level keys:**
```
data, cachedAt
```

**Event fields:**
```
name, map, icon, startTime, endTime
```

**Real Return (sample):**
```json
{
  "data": [
    {
      "name": "Night Raid",
      "map": "Buried City",
      "icon": "https://cdn.metaforge.app/arc-raiders/custom/night.webp",
      "startTime": 1778130000000,
      "endTime": 1778133600000
    }
  ],
  "cachedAt": 1778189365636
}
```

---

### `GET /api/arc-raiders/traders`

**Status:** ✅ Working

**Top-level keys:**
```
success, data
```

**Trader names:**
```
Apollo, Celeste, Lance, Shani, Tian
```

**Trader item fields:**
```
id, icon, name, value, rarity, item_type, description, trader_price
```

**Real Return (sample):**
```json
{
  "success": true,
  "data": {
    "Apollo": [
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
    ],
    "Celeste": [],
    "Lance": [],
    "Shani": [],
    "Tian": []
  }
}
```

---

### `GET /api/game-map-data?mapID=<mapID>`

**Status:** ⚠️ Requires mapID parameter

**Query params:**
```
mapID (required)
```

**Note:** This endpoint requires a specific map ID parameter. The client uses this for map zone data.

---

### `GET /api/arc-raiders/weekly-trials`

**Status:** ❌ Not Working (404)

**Observed result:**
```
404 Not Found
```

**Note:** The current client points to this URL, but it returns 404. Weekly Trials should be treated as unavailable until the correct MetaForge endpoint is found.

---

## SHiESTY.me Internal APIs

---

### `GET /api/stats/overview`

**Status:** ✅ Working

**Query params:**
```
fresh=1 (optional, bypasses cache)
```

**Returns:** MetaForge-style aggregated stats object

**Key sections:**
```
raider_identity, wallet_and_economy, performance_analytics, combat_detailed,
scavenging_and_world, map_specific_data, inventory_and_stash, leveling_logic,
progression, identity, currency, performance, combat, economy, maps, enemies,
weapons, weapon_performance, topWeapons, trade, roundsCount, recentRounds
```

---

### `GET /api/player/me`

**Status:** ✅ Working

**Returns:** Player profile with live currencies and stash info

**Key fields:**
```
id, username, avatar, embarkId, embarkLinked, embarkUsername, displayName,
level, xp, totalXp, xpForNextLevel, xpProgressPercent, gameLevel, gameXp,
credits, tokens, coins, stashValue, stashSlotsTotal, stashSlotsUsed,
currencies, liveStashValue, stashSlots
```

---

### `GET /api/player/stats`

**Status:** ✅ Working

**Returns:** Dashboard-specific full stats spec

**Key sections:**
```
account_header, primary_stats, raid_value_history, enemy_kills_by_type,
weapon_performance, map_performance, raid_history, summary_stats, legacy_sync,
applied_filters
```

---

## Field Priority Mapping

The app now prioritizes these live ArcTracker v2 fields:

| Live Field (Priority) | Fallback Fields |
|-----------------------|-----------------|
| `outcome` | `status`, `extraction` |
| `durationMs` | `duration`, `durationSeconds`, `time_topside`, `timeAlive` |
| `netValue` | `netProfit`, `profit`, `lootValueGained` |
| `valueExtracted` | `lootValue`, `loot_value` |
| `valueBroughtIn` | `loadoutValue`, `loadout_value` |
| `damage` | `damageDealt`, `damage_dealt`, `totalDamage` |
| `score` | `xp`, `experience`, `totalScore` |
| `roundEndedAt` | `syncedAt`, `createdAt`, `timestamp`, `date` |
| `learned` (blueprints) | `unlocked`, `claimed`, `completed` |
| `targetId` (enemies) | `id`, `target_id` |
| `weaponAssetId` (weapons) | `assetId`, `weapon_id` |
| `itemId` | `id`, `item_id` |

---

## Files Updated

The following files have been updated to use the real live field priorities:

- `server/services/statsAggregator.js`
- `server/services/arctracker.js`
- `server/routes/player.js`
- `server/services/userDataApi.js`
- `server/services/discordCommands.js`
- `client/src/pages/DashboardPage.tsx`
- `client/src/pages/CodexPage.tsx`
- `client/src/pages/MyProfilePage.tsx`
- `client/src/pages/RaidHistoryPage.tsx`
- `client/src/components/Header.tsx`
- `client/src/context/PlayerContext.tsx`

---

*Document generated: May 28, 2026*
*Last verified: ArcTracker API v2, MetaForge API*
