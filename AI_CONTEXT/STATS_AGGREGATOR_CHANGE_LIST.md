# Stats Aggregator Change List

This is the audit list for changing stats safely. No code should be changed from this list without a separate targeted patch approval.

## Source Ownership Rules

Use this source order for stats aggregation:

```txt
ArcTracker /api/v2/user/summary
  Primary career totals: rounds, extracted, died, time, value, kills, damage, containers.

ArcTracker /api/v2/user/rounds
  Primary round history and fallback for trends/calculated stats.

ArcTracker /api/v2/user/enemy-kills
  Primary lifetime enemy kill counts.

ArcTracker /api/v2/user/weapon-kills
  Primary lifetime weapon kill counts.

ArcTracker /api/v2/user/map-performance
  Primary map performance.

MetaForge /api/arc-raiders/player-stats
  Secondary linked profile career snapshot: exact fields only.

MetaForge catalog and RaiderBuddy weapon mechanics
  Catalog/mechanics only. Not player career stats.
```

## Required Changes

### 1. Fix ArcTracker stat endpoint paths

File:

```txt
server/services/arctracker.js
```

Correction from user-confirmed testing:

```txt
/api/embark/stats/* is confirmed working from the extension context.
/api/v2/user/* is still the documented authenticated user API path.
```

Do not blindly replace every `/api/embark/stats/*` path. First decide whether the caller is extension-backed or direct server-backed.

For extension-backed stat calls, preserve:

```txt
getUserSummary    -> /api/embark/stats/summary
getEnemyKills     -> /api/embark/stats/enemy-kills
getMapPerformance -> /api/embark/stats/map-performance
getWeaponKills    -> /api/embark/stats/weapon-kills
getStatsRounds    -> /api/embark/stats/rounds
```

For direct authenticated ArcTracker user calls, use:

```txt
getSummary        -> /api/v2/user/summary
getUserSummary    -> /api/v2/user/summary
getEnemyKills     -> /api/v2/user/enemy-kills
getMapPerformance -> /api/v2/user/map-performance
getWeaponKills    -> /api/v2/user/weapon-kills
getStatsRounds    -> /api/v2/user/rounds
```

Keep the exact headers for authenticated user-key calls:

```txt
X-App-Key: getAppKey()
Authorization: Bearer ${userKey}
```

### 2. Split MetaForge weapon damage from ArcTracker weapon kills

Files:

```txt
server/services/userDataApi.js
server/services/statsAggregator.js
server/routes/metaforge.js
```

Needed result:

```txt
MetaForge weaponStats -> weapon damage rows only
ArcTracker weapon-kills -> weapon kill rows only
```

Recommended separate output names:

```txt
weapon_damage_stats: [{ weapon_name, damage, last_updated }]
weapon_kill_stats: [{ weaponAssetId, itemId, name, count }]
```

Do not fill `count` or `kills` from MetaForge `weaponStats.damage`.

### 3. Tighten MetaForge player-stats normalization

Files:

```txt
server/services/userDataApi.js
server/routes/metaforge.js
server/services/statsAggregator.js
```

Confirmed MetaForge keys only:

```txt
stats.total_rounds
stats.total_duration_seconds
stats.total_net_profit
stats.total_arc_kills
stats.total_player_kills
stats.total_player_downs
stats.total_deaths
stats.total_damage_dealt
stats.total_damage_taken
stats.total_xp
stats.total_healing
stats.total_extractions
mapStats
enemyStats
weaponStats
totalDamageDealt
totalPlayerDowns
```

Keep old aliases only as clearly named compatibility fallback inputs. Do not document them as MetaForge source fields.

### 4. Replace greater-value merging with source-priority merging

File:

```txt
server/services/statsAggregator.js
```

Current problem:

```txt
pickStat(atVal, mfVal) chooses Math.max(atVal, mfVal)
STATS_PRIORITY = 'metaforge'
```

Needed behavior:

```txt
Use ArcTracker summary when present.
Use ArcTracker rounds when summary is missing.
Use MetaForge only when the exact confirmed field exists and ArcTracker data is missing/stale by explicit rule.
```

This prevents stale or different-source totals from winning just because the number is larger.

### 5. Mark unconfirmed MetaForge-only fields as unavailable

File:

```txt
server/services/statsAggregator.js
```

Fields needing removal, rename, or explicit unavailable state:

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

Recommended output:

```txt
value: null
source: "unconfirmed"
```

or omit from confirmed stats UI.

### 6. Align player route wording to confirmed return names

File:

```txt
server/routes/player.js
```

Keep existing compatibility fields where needed, but document canonical names:

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

For dedicated arrays, prefer:

```txt
enemyKills.enemies[]
weaponKills.weapons[]
mapPerformance.maps[]
```

Static output buckets like `kills_wasp` and `kills_venator` should be compatibility-only UI helpers.

### 7. Fix Dashboard preferred fields

File:

```txt
client/src/pages/DashboardPage.tsx
```

Fix suspect lookup:

```txt
combatDetailed.total_arckills
```

Use:

```txt
combatDetailed.arc_kills_total
```

Preferred UI field order should be:

```txt
outcome before status
durationMs before duration
netValue before netProfit
valueExtracted before lootValue
valueBroughtIn before loadoutValue
damage before damageDealt
score before xp
roundEndedAt before syncedAt
learned before unlocked
targetId before id for enemies
weaponAssetId before assetId for weapons
itemId before id for item references
```

### 8. Add fixtures before changing aggregation behavior

Suggested fixtures:

```txt
ArcTracker summary sample
ArcTracker rounds sample
ArcTracker enemy-kills sample
ArcTracker weapon-kills sample
ArcTracker map-performance sample
MetaForge player-stats sample
ARC-DMG-KILLS inventory stats empty sample
```

Minimum useful assertions:

```txt
MetaForge weaponStats damage does not become weapon kill count.
ArcTracker weapon-kills count stays count.
ArcTracker summary wins over round-calculated totals when present.
Dashboard arc kills reads arc_kills_total.
/api/v2/user/* endpoints are used for ArcTracker user stats.
```

## Files That Call Or Make Stats

Backend producers/callers:

```txt
server/services/arctracker.js
server/services/userDataApi.js
server/services/statsAggregator.js
server/services/metaforge.js
server/routes/metaforge.js
server/routes/player.js
server/routes/stats.js
server/routes/publicProfile.js
server/server.js
server/services/embarkProxy.js
```

Frontend consumers:

```txt
client/src/pages/DashboardPage.tsx
client/src/pages/MyProfilePage.tsx
client/src/pages/CodexPage.tsx
client/src/lib/analytics/stats.ts
```

External/local evidence:

```txt
AI_CONTEXT/API_RETURNS_REAL.md
AI_CONTEXT/COMPLETE_API_RETURNS.md
AI_CONTEXT/API_REFERENCE_COMPLETE.md
server/data/reference/metaforge_returns_clean.json
/Users/finessekid/Desktop/♿️⚠️ARC-N-META-RAIDERBUDDY-SITE0RIPSZ♿️/arctracker/herearc/*.json
/Users/finessekid/Desktop/♿️⚠️ARC-N-META-RAIDERBUDDY-SITE0RIPSZ♿️/RAIDER-BUDDY/stats-weapon-breakdown.js
GitHub docs/ARC-DMG-KILLS.json
```

## Patch Order To Use Later

Recommended safe order:

```txt
1. Patch ArcTracker endpoint paths only.
2. Add fixtures/tests or a small stat-shape assertion script.
3. Split MetaForge weapon damage rows from ArcTracker weapon kill rows.
4. Tighten MetaForge player-stats normalizer.
5. Update statsAggregator source-priority logic.
6. Update player route and Dashboard field preference wording.
7. Remove or mark unconfirmed MetaForge-only fields.
```

Do not do all of this in one broad rewrite. Each step should be a small targeted patch with before/after verification.
