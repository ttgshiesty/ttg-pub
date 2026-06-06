# Wrong Or Guessed Stat Returns

This document separates confirmed API returns from compatibility aliases, guesses, and mixed-source mappings that should not be treated as source of truth.

## ArcTracker Endpoint Context

File:

```txt
server/services/arctracker.js
```

These calls are user-confirmed working from the browser extension context:

```txt
getSummary        -> /api/embark/stats/summary
getUserSummary    -> /api/embark/stats/summary
getEnemyKills     -> /api/embark/stats/enemy-kills
getMapPerformance -> /api/embark/stats/map-performance
getWeaponKills    -> /api/embark/stats/weapon-kills
getStatsRounds    -> /api/embark/stats/rounds
```

Do not classify those paths as globally wrong. The correction is context:

```txt
/api/embark/stats/* = confirmed extension-only working path
/api/v2/user/* = documented authenticated user API path
```

Confirmed docs and local samples also show:

```txt
/api/v2/user/summary
/api/v2/user/enemy-kills
/api/v2/user/map-performance
/api/v2/user/weapon-kills
/api/v2/user/rounds
```

Remaining risk:

```txt
If server-side code calls /api/embark/stats/* directly without the extension context, it may fail even though it works from the extension.
```

## MetaForge Weapon Stats Conflated With ArcTracker Weapon Kills

Files:

```txt
server/services/userDataApi.js
server/services/statsAggregator.js
server/routes/metaforge.js
```

Confirmed MetaForge `weaponStats` rows:

```txt
weapon_name
damage
last_updated
```

Confirmed ArcTracker weapon-kill rows:

```txt
weaponAssetId
itemId
name
count
```

Wrong/guessed behavior:

```txt
normalizeMetaForgeWeapons()
normalizeWeaponStats()
buildStatsOverview() weapon merge
```

These currently allow MetaForge weapon damage rows to become `kills`, `count`, `weaponAssetId`, and `itemId` style rows through alias fallback logic. That makes damage-only data look like kill-count data.

## MetaForge Normalizers Accept Unconfirmed Alias Shapes

Files:

```txt
server/services/userDataApi.js
server/routes/metaforge.js
server/services/statsAggregator.js
```

Unconfirmed or guessed MetaForge aliases found:

```txt
payload.totals
payload.totalTimeSeconds
payload.netIncome
payload.valueExtracted
payload.gross_profit
payload.valueBroughtIn
payload.loadout_value
payload.arc_destroyed
payload.arcEnemiesDestroyed
payload.pvp_kills
payload.totalDamage
payload.containersLooted
payload.perMapPerformance
payload.arcEnemyBreakdown
payload.arc_destroyed_breakdown
payload.machine_kills
payload.codex
payload.weaponsUsed
payload.weapon_performance
payload.topWeapons
payload.top_weapons
```

Some of these may exist in older local compatibility payloads, but they are not in the confirmed MetaForge `player-stats` template. They should be documented as compatibility inputs, not as MetaForge source-of-truth fields.

## MetaForge-Only Stats Currently Set To Zero

File:

```txt
server/services/statsAggregator.js
```

Current fields are emitted but not confirmed by the MetaForge player-stats source:

```txt
accuracy
headshot_percentage
shots_fired
shots_hit
weakpoint_hits
longest_kill_distance
melee_kills
extractions_under_fire
favorite_weapon
max_extraction_streak
loot_efficiency
```

These should not be described as MetaForge stats unless a real return containing them is found. If kept, label them as unavailable/unconfirmed or derive them from confirmed ArcTracker rounds only where possible.

## Career Summary Mixing

File:

```txt
server/services/statsAggregator.js
```

Current behavior:

```txt
STATS_PRIORITY = 'metaforge'
pickStat() chooses the greater numeric value between ArcTracker and MetaForge
```

Problem:

Choosing the greater number is not a source-of-truth rule. It can mask stale data, duplicate data, or source mismatch. Source ownership should be explicit:

```txt
ArcTracker summary -> primary current user totals
ArcTracker rounds -> round-derived fallback/trends
MetaForge player-stats -> secondary career snapshot if linked and exact fields exist
```

## Dashboard Field Typos And Over-Broad Fallbacks

File:

```txt
client/src/pages/DashboardPage.tsx
```

Wrong or suspect lookup:

```txt
combatDetailed.total_arckills
```

Server emits:

```txt
arc_kills_total
```

Dashboard also has many fallback chains for old names:

```txt
status
lootValue
loadoutValue
damageDealt
xp
netProfit
total_arckills
containerslooted
```

Some compatibility is useful, but the UI should prefer confirmed names first and avoid presenting guessed fallbacks as real API wording.

## Player Route Static Enemy/Weapon Buckets

File:

```txt
server/routes/player.js
```

The legacy block emits static buckets such as:

```txt
kills_queen
kills_matriarch
kills_harvester
kills_kettle
kills_rattler
kills_arpeggio
...
```

Problem:

These are output compatibility fields, not confirmed ArcTracker return fields. The confirmed dedicated endpoints return arrays, not one field per enemy/weapon.

## Inventory Item Stats Are Not A Valid Damage/Kill Source

Source:

```txt
docs/ARC-DMG-KILLS.json
```

Captured evidence:

```txt
STAT_KEYS: []
```

Problem:

Inventory item `stats` should not be used to calculate weapon damage/kills unless a different confirmed source proves those keys exist.

## RaiderBuddy Weapon Mechanics Are Not Player Career Stats

Source:

```txt
RAIDER-BUDDY/stats-weapon-breakdown.js
```

Confirmed RaiderBuddy data is catalog/mechanics data:

```txt
damage
fireRate
magSize
DPS
TTK
STK
shield deflection
```

Problem:

These fields are valid for a weapon stats page, but not for player career aggregation. Do not mix theoretical weapon damage/DPS/TTK into user lifetime damage, weapon kills, map performance, or career summary.

## MetaForge Weekly Trials App Proxy Note

`AI_CONTEXT/API_RETURNS_REAL.md` has an older note that `/api/arc-raiders/weekly-trials` was not working at the app URL. That is not the same as saying the GitHub source is unavailable. The GitHub docs/source-of-truth path is linked and readable through the GitHub connector.
