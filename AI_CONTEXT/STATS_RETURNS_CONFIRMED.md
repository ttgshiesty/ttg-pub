# Confirmed Stat Returns

Source status: read-only audit from TTG `AI_CONTEXT`, local ArcTracker samples in `/Users/finessekid/Desktop/♿️⚠️ARC-N-META-RAIDERBUDDY-SITE0RIPSZ♿️/arctracker/herearc`, GitHub `docs/ARC-DMG-KILLS.json`, and local MetaForge source/reference files.

## ArcTracker v2 Auth

Every authenticated ArcTracker v2 user call must use both headers:

```txt
X-App-Key: <server app key>
Authorization: Bearer <arc_u1 user key>
```

Confirmed example:

```txt
GET https://arctracker.io/api/v2/user/profile
```

## ArcTracker Working Stat Endpoints

## ArcTracker Extension-Only Working Stats Endpoints

User-confirmed working through the browser extension path only:

```txt
GET https://arctracker.io/api/embark/stats/summary
GET https://arctracker.io/api/embark/stats/enemy-kills
GET https://arctracker.io/api/embark/stats/map-performance
GET https://arctracker.io/api/embark/stats/weapon-kills
GET https://arctracker.io/api/embark/stats/rounds
```

Important distinction:

```txt
/api/embark/stats/* works from the extension context.
/api/v2/user/* remains the documented authenticated user API path.
```

Do not mark `/api/embark/stats/*` as non-working. Treat those as confirmed extension-only stat routes unless direct server testing proves otherwise.

Confirmed user note:

```txt
getUserSummary -> https://arctracker.io/api/embark/stats/summary
summary returns totalContainersLooted
getEnemyKills -> https://arctracker.io/api/embark/stats/enemy-kills
getMapPerformance -> https://arctracker.io/api/embark/stats/map-performance
getWeaponKills -> https://arctracker.io/api/embark/stats/weapon-kills
getStatsRounds -> https://arctracker.io/api/embark/stats/rounds
```

### `GET /api/v2/user/summary`

Confirmed top-level fields:

```txt
totalRounds
totalExtracted
totalDied
totalTimeMs
totalValueExtracted
totalValueBroughtIn
totalNetValue
totalArcKills
totalPlayerKills
totalDamage
totalContainersLooted
```

Use this as the primary source for career summary totals.

### `GET /api/v2/user/rounds`

Confirmed top-level fields:

```txt
rounds
total
limit
offset
```

Confirmed round row fields:

```txt
id
roundId
mapTargetId
mapName
outcome
durationMs
valueBroughtIn
valueExtracted
netValue
kills
arcKills
playerKills
playerDowns
damage
score
isLegacy
syncedAt
createdAt
roundEndedAt
roundEndedAtPrecision
seasonNumber
linkedScreenshotRaid
```

Use this for round-derived metrics, history, trends, and fallbacks when dedicated aggregate endpoints are missing.

### `GET /api/v2/user/enemy-kills`

Confirmed shape:

```ts
{
  enemies: [
    {
      targetId: number
      name: string
      count: number
    }
  ]
}
```

Use this as the primary source for lifetime enemy kill counts. It does not include damage in the confirmed ArcTracker return.

### `GET /api/v2/user/weapon-kills`

Confirmed shape:

```ts
{
  weapons: [
    {
      weaponAssetId: number
      itemId: string | null
      name: string
      count: number
    }
  ]
}
```

Use this as the primary source for lifetime weapon kill counts. Do not infer weapon kills from weapon damage rows.

### `GET /api/v2/user/map-performance`

Confirmed shape:

```ts
{
  maps: [
    {
      mapTargetId: number
      mapName: string
      raids: number
      extracted: number
      totalDurationMs: number
      totalNetValue: number
    }
  ]
}
```

Use this as the primary source for pre-aggregated map performance.

### `GET /api/v2/user/expedition-status`

Confirmed top-level fields:

```txt
completedExpeditions
activeSeason
state
currentTier
nextTier
updatedAt
```

## ArcTracker Non-Career Stat Files

`PROFILE.json` from the Desktop sample is not career stats. Confirmed fields:

```txt
isRaidHistoryPublic
publicProfileSlug
publicUrl
publicProfileCreatedAt
```

Use it only for public profile visibility/URL state.

`raids.json` and `raidhistory.json` are screenshot/manual raid history style returns, not the same as `/api/v2/user/rounds`. Their rows include fields like:

```txt
id
userId
status
mapId
season
raidDate
items
totalValue
effectiveValue
screenshotUrl
visionStatus
linkedEmbarkRoundId
```

## MetaForge Player Stats

Confirmed endpoint:

```txt
GET https://metaforge.app/api/arc-raiders/player-stats?userId=<PROFILE_ID>
```

Confirmed top-level fields:

```txt
stats
mapStats
enemyStats
weaponStats
totalDamageDealt
totalPlayerDowns
```

Confirmed `stats` fields:

```txt
user_id
total_rounds
total_duration_seconds
total_net_profit
total_arc_kills
total_player_kills
total_player_downs
total_deaths
total_damage_dealt
total_damage_taken
total_xp
total_healing
total_extractions
last_updated
```

Confirmed `mapStats` row fields:

```txt
user_id
map_name
rounds_played
total_net_profit
total_xp
total_player_kills
total_arc_kills
total_deaths
total_extractions
total_duration_seconds
max_net_profit
max_xp
total_damage_taken
total_healing
last_updated
```

Confirmed `enemyStats` row fields:

```txt
user_id
enemy_name
kills
damage
last_updated
```

Confirmed `weaponStats` row fields:

```txt
user_id
weapon_name
damage
last_updated
```

Important: MetaForge `weaponStats` is damage by weapon, not ArcTracker weapon kill rows. It does not include `weaponAssetId`, `itemId`, or `count`.

## MetaForge Catalog API

Confirmed public API base:

```txt
https://metaforge.app/api/arc-raiders
```

Confirmed catalog endpoints from local MetaForge client/source:

```txt
GET /items
GET /arcs
GET /quests
GET /traders
GET /events-schedule
GET https://metaforge.app/api/game-map-data
```

These are catalog/public game-data endpoints. They are not authenticated player career stat endpoints.

## Catalog Analytics Helper

Confirmed helper file:

```txt
client/src/lib/analytics/stats.ts
```

Confirmed functions:

```txt
calculateStats(values)
getWeaponStats(weapons)
getArmorStats(armor)
getRarityDistribution(items)
findBestWeapon(weapons, criteria)
findBestArmor(armor)
```

These calculate catalog/item-array stats such as average damage, fire rate, range, armor value, rarity distribution, and best catalog weapon. They do not fetch player stats.

## RaiderBuddy Weapon Mechanics

Confirmed from `RAIDER-BUDDY/stats-weapon-breakdown.js`:

```txt
damage
bulletsPerShot
roundsPerShot
magSize
hsMultiplier
fireRate
reloadTime
magDumpTime
equipTime
loadsIndividually
prefireDelay
burstGap
```

Confirmed shield model:

```txt
light: charge 40, deflection 0.4
medium: charge 70, deflection 0.425
heavy: charge 80, deflection 0.525
```

Confirmed formulas:

```txt
body damage per shot = damage * bulletsPerShot
head damage per shot = damage * bulletsPerShot * hsMultiplier
DPS = damagePerShot * floor(magSize / roundsPerShot) / (magDumpTime + reloadTime)
magazine damage = damagePerShot * floor(magSize / roundsPerShot)
TTK includes prefireDelay, fireRate, magSize, roundsPerShot, reloadTime, and shield STK
```

Use RaiderBuddy mechanics only for weapon catalog/mechanics pages. Do not mix these formulas with player career damage/kills aggregation.

## ARC-DMG-KILLS Evidence

GitHub `docs/ARC-DMG-KILLS.json` contains captured browser/source evidence. Confirmed important line of evidence:

```txt
STAT_KEYS: []
```

That came from checking `sampleWeapon.stats || {}` in `arcTracker_inventoryData_v3`. Do not rely on inventory item `stats` as the source for damage/kills.
