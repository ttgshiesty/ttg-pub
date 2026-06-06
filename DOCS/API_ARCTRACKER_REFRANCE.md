# Complete Arc Raiders API Reference
# Complete Arc Raiders API Reference

## Table of Contents
1. [ArcTracker API v2 Endpoints](#arctracker-api-v2-endpoints)
2. [API Return Structures](#api-return-structures)
3. [Stats Aggregator Field Mappings](#stats-aggregator-field-mappings)
4. [Stats Overview Output Structure](#stats-overview-output-structure)
5. [TypeScript Interfaces](#typescript-interfaces)

---

## ArcTracker API v2 Endpoints

Base URL: `https://arctracker.io`

Authentication: Dual-key system
- `X-App-Key`: Application key from environment
- `Authorization: Bearer {userKey}`: User key (starts with `arc_u1_`)

### Authenticated User Endpoints

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/v2/user/profile` | GET | User profile data |
| `/api/v2/user/stash` | GET | Inventory/stash with currencies |
| `/api/v2/user/loadout` | GET | Current loadout configuration |
| `/api/v2/user/quests` | GET | Quest completion status |
| `/api/v2/user/hideout` | GET | Hideout modules and levels |
| `/api/v2/user/projects` | GET | Expedition projects progress |
| `/api/v2/user/rounds` | GET | Raid/round history |
| `/api/v2/user/blueprints` | GET | Learned crafting blueprints |
| `/api/v2/user/enemy-kills` | GET | Lifetime enemy kill totals |
| `/api/v2/user/map-performance` | GET | Pre-aggregated per-map stats |
| `/api/v2/user/weapon-kills` | GET | Lifetime weapon kill totals |
| `/api/v2/user/expedition-status` | GET | Current expedition tier progress |

### Public Endpoints (App Key only)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/items` | GET | Master item list |

---

## API Return Structures

### 1. Profile
```typescript
{
  userId: string;           // "kmW5dpvat2WIn2cEM4juBF7DoSPP8maj"
  username: string;         // "Konartist"
  playerLevel: number;      // 1
  memberSince: string;      // ISO date
}
```

### 2. Enemy Kills (`/api/v2/user/enemy-kills`)
```typescript
{
  enemies: [
    {
      targetId: number;     // 672378114
      name: string;         // "Wasp"
      count: number;        // 1175
    }
  ]
}
```

**Full Enemy List from API:**
- Wasp (672378114)
- Fireball (299263764)
- Tick (-352140120)
- Pop (-504231823)
- Hornet (664422097)
- Turret (913532953)
- Snitch (1786451563)
- Firefly (-1524715377)
- Spotter (-1562077677)
- Shredder (2015925366)
- Rocketeer (903845622)
- Leaper (-541195755)
- Comet (-1780443771)
- Bastion (-1616729167)
- Bombardier (-1311527696)
- ARC Surveyor (1143392102)
- Sentinel (-1122989322)
- Vaporizer (1639912088)

### 3. Weapon Kills (`/api/v2/user/weapon-kills`)
```typescript
{
  weapons: [
    {
      weaponAssetId: number;  // 168902929
      itemId: string | null;   // "venator_iv" (can be null for Raider Tool)
      name: string;            // "Venator IV"
      count: number;           // 648
    }
  ]
}
```

### 4. Map Performance (`/api/v2/user/map-performance`)
```typescript
{
  maps: [
    {
      mapTargetId: number;      // -636184135
      mapName: string;          // "The Dam"
      raids: number;            // 587
      extracted: number;        // 271
      totalDurationMs: number;  // 370221367
      totalNetValue: number;    // 6048094
    }
  ]
}
```

**Known Maps:**
- The Dam
- Stella Montis
- The Blue Gate
- Buried City
- Spaceport
- Riven Tides

### 5. Summary Stats (`/api/v2/user/summary`)
```typescript
{
  totalRounds: number;           // 1614
  totalExtracted: number;        // 943
  totalDied: number;             // 671
  totalTimeMs: number;           // 1271461285
  totalValueExtracted: number;  // 93702243
  totalValueBroughtIn: number;   // 67170093
  totalNetValue: number;          // 26532150
  totalArcKills: number;         // 5791
  totalPlayerKills: number;      // 131
  totalDamage: number;           // 919190
  totalContainersLooted: number; // 20151
}
```

### 6. Settings/Sync Status
```typescript
{
  enabled: boolean;              // true
  nextSyncAt: number;            // timestamp (1778194479022)
  lastSyncAt: number;            // timestamp (1778189490617)
  disabledReason: string | null; // null
  consecutiveFailures: number;   // 0
  lastErrorMessage: string | null;
  lastErrorAt: number | null;
  isSubscriber: boolean;       // true
  isEmbarkLinked: boolean;       // true
  isTokenExpired: boolean;       // false
}
```

### 7. User Data (Quests & Progress)
```typescript
{
  playerLevel: number;
  gameProgress: {
    questStatuses: {
      [questId: string]: boolean;  // e.g., "ss11": true, "ss10k": false
    };
    neededItemCounts: {
      [itemKey: string]: number;  // e.g., "arc_alloy_project_expedition_project_phase1": 80
    };
  };
}
```

### 8. Stash/Inventory
```typescript
{
  items: [
    {
      id: string;
      name: string;
      quantity: number;
      value: number;
      // ... item properties
    }
  ];
  currencies: {
    credits?: number;      // Main currency
    cred?: number;         // CRED currency
    raiderTokens?: number; // Premium currency
    xp?: number;
  };
  slots?: {
    used: number;
    total: number;
  };
  usedSlots?: number;
  maxSlots?: number;
  totalValue?: number;
}
```

### 9. Round/Raid History
```typescript
{
  rounds: [
    {
      roundId: string;
      map: string;              // map identifier
      mapName: string;          // "The Dam"
      outcome: string;          // "Extracted" | "Failed"
      status: string;           // same as outcome
      durationMs: number;       // milliseconds
      duration: number;         // seconds (fallback)
      valueBroughtIn: number;   // loadout value
      valueExtracted: number; // loot extracted
      netValue: number;         // net profit
      netProfit: number;        // fallback
      kills: number;
      arcKills: number;
      playerKills: number;
      playerDowns: number;
      damage: number;           // damage dealt
      damageDealt: number;      // fallback
      damageTaken: number;
      damageReceived: number;   // fallback
      healing: number;
      healed: number;           // fallback
      score: number;            // XP earned
      xp: number;               // fallback
      containersLooted: number;
      vaultsBreached: number;
      keysUsed: number;
      itemsScrapped: number;
      itemsExtracted: number;
      rareContainersFound: number;
      lockedDoorsOpened: number;
      industrialBinsOpened: number;
      revivesGiven: number;
      revivesReceived: number;
      roundEndedAt: string;     // ISO date
      syncedAt: string;         // ISO date (fallback)
      seasonNumber: number;
      isLegacy: boolean;
      // Detailed breakdowns
      arcBreakdown: [
        {
          targetName: string;   // "Wasp", "Player", "Self"
          kills: number;
          damage: number;
          type: string;
        }
      ];
      weaponDamageBreakdown: [
        {
          weaponName: string;
          amount: number;       // damage dealt
        }
      ];
      damageByWeapon: number;   // total (not per-weapon)
    }
  ]
}
```

### 10. Item Index (Public)
```typescript
{
  version: string;           // "1778090187462"
  generatedAt: string;       // "2026-05-06T17:56:27.462Z"
  locale: string;            // "en"
  itemCount: number;         // 560
  items: [
    {
      id: string;            // "leviathans_crown_ship_model"
      name: string;          // "Leviathan's Crown Ship Model"
      nameSearch: string;    // lowercase searchable
      type: string;          // "Trinket", "Quick Use", "Weapon", etc.
      rarity: string;        // "Common", "Uncommon", "Rare", "Epic", "Legendary"
      imageFilename: string; // "https://cdn.arctracker.io/items/v2/..."
      relatedBlueprintId: string | null;
      isBlueprint: boolean;
      targetItemId: string | null;
    }
  ]
}
```

### 11. Loadout
```typescript
{
  augment: object | null;
  shield: object | null;
  weapon1: object | null;
  weapon2: object | null;
  backpack: object | null;
  quickItems: object[];
  safePocket: object | null;
  slotCounts: {
    quickSlots: number;
    safePocket: number;
  };
}
```

### 12. Quests
```typescript
{
  quests: [
    {
      id: string;
      name: string;
      trader: string;
      completed: boolean;
    }
  ]
}
```

### 13. Hideout
```typescript
{
  modules: [
    {
      id: string;
      name: string;
      currentLevel: number;
      maxLevel: number;
    }
  ]
}
```

### 14. Projects
```typescript
{
  projects: [
    {
      id: string;
      name: string;
      phases: number;
      completedPhases: number;
      totalPhases: number;
      fullyCompleted: boolean;
    }
  ]
}
```

### 15. Blueprints
```typescript
{
  blueprints: [
    {
      id: string;
      name: string;
      category: string;
      rarity: string;
      learned: boolean;
      targetItemId: string;
    }
  ]
}
```

### 16. Expedition Status
```typescript
{
  completedExpeditions: number;
  activeSeason: string;
  state: string;
  currentTier: number;
  nextTier: number | null;
  updatedAt: string;
}
```

---

## Stats Aggregator Field Mappings

The `statsAggregator.js` uses these field picker functions to handle multiple API response formats:

### Kill Pickers
```javascript
const pickKills = (r) =>
  num(r.arcKills ?? r.kills ?? r.player_kills ?? r.totalKills) +
  num(r.playerKills ?? r.pvpKills);

const pickArcKills = (r) =>
  num(r.arcKills ?? r.aiKills ?? r.botKills);

const pickPlayerKills = (r) =>
  num(r.playerKills ?? r.pvpKills);

const pickDowns = (r) =>
  num(r.playerDowns ?? r.downs ?? r.knockdowns);
```

### Damage Pickers
```javascript
const pickDmgDealt = (r) =>
  num(r.damage ?? r.damageDealt ?? r.damage_dealt ?? r.totalDamage);

const pickDmgRecv = (r) =>
  num(r.damageTaken ?? r.damageReceived ?? r.damage_received);

const pickHealed = (r) =>
  num(r.healing ?? r.healed ?? r.healingDone ?? r.health_restored);
```

### Economy Pickers
```javascript
const pickProfit = (r) => {
  if (r.netValue !== undefined) return num(r.netValue);
  if (r.valueExtracted !== undefined && r.valueBroughtIn !== undefined)
    return num(r.valueExtracted) - num(r.valueBroughtIn);
  if (r.netProfit !== undefined) return num(r.netProfit);
  return num(r.profit ?? r.lootValueGained ?? r.lootGained ?? r.lootValue ?? r.value);
};

const pickLootValue = (r) =>
  num(r.valueExtracted ?? r.lootValue ?? r.loot_value);

const pickLoadoutValue = (r) =>
  num(r.valueBroughtIn ?? r.loadoutValue ?? r.loadout_value);
```

### Time/Duration Pickers
```javascript
const pickDuration = (r) => {
  if (r.durationMs !== undefined) return num(r.durationMs) / 1000;
  return num(r.duration ?? r.durationSeconds ?? r.time_topside ?? r.timeAlive);
};
```

### Score/XP Pickers
```javascript
const pickScore = (r) => num(r.score ?? r.xp ?? r.experience ?? r.totalScore);
```

### Scavenging Pickers
```javascript
const pickContainersLooted = (r) =>
  num(r.containersLooted ?? r.lootedContainers ?? r.containers);

const pickVaultsBreached = (r) =>
  num(r.vaultsBreached ?? r.vaultsOpened ?? r.lockedVaults);

const pickKeysConsumed = (r) =>
  num(r.keysUsed ?? r.keysConsumed ?? r.consumedKeys);

const pickItemsScrapped = (r) =>
  num(r.itemsScrapped ?? r.itemsRecycled ?? r.itemsScrappedCount ?? r.scrappedItems);

const pickItemsExtracted = (r) =>
  num(r.itemsExtracted ?? r.itemsExtractedCount ?? r.extractedItems);

const pickRareContainers = (r) =>
  num(r.rareContainersFound ?? r.rareContainers ?? r.vaultContainersOpened);

const pickLockedDoors = (r) =>
  num(r.lockedDoorsOpened ?? r.lockedDoors ?? r.doorsOpened);

const pickIndustrialBins = (r) =>
  num(r.industrialBinsOpened ?? r.industrialBins ?? r.bins);
```

### Revive Pickers
```javascript
const pickRevivesGiven = (r) =>
  num(r.revivesGiven ?? r.revives ?? r.allyRevives);

const pickRevivesReceived = (r) =>
  num(r.revivesReceived ?? r.wasRevived ?? r.timesRevived);
```

### Map Picker
```javascript
const pickMap = (r) => r.mapName || r.map_name || r.map || "Unknown";
```

### Outcome Checkers
```javascript
const isExtract = (r) => {
  const s = (r.outcome || r.status || r.extraction || '')
    .toString()
    .toLowerCase();
  return s === "extracted" || s.includes("extract");
};

const isDeath = (r) => {
  const s = (r.outcome || r.status || r.extraction || '')
    .toString()
    .toLowerCase();
  return s === "failed" || s === "died" || s.includes("die") || s === "death";
};
```

### Canonical ARC Unit Names
```javascript
const ARC_UNIT_NAMES = [
  "Wasp", "Fireball", "Tick", "Pop", "Hornet",
  "Turret", "Snitch", "Firefly", "Spotter", "Shredder",
];
```

---

## Stats Overview Output Structure

The `buildStatsOverview()` function returns this comprehensive object:

### 1. Raider Identity (`raider_identity`)
```typescript
{
  raider_alias: string;        // profile?.username || dbUser?.displayName
  metaforge_id: string | null;   // dbUser?.embarkId || dbUser?.id
  raider_level: number;         // profile?.playerLevel || dbUser?.level
  total_xp: number;            // dbUser?.totalXp
  raider_status: "Online" | "Offline";
  authenticated: boolean;      // !!profile
}
```

### 2. Wallet & Economy (`wallet_and_economy`)
```typescript
{
  total_funds: number;           // credits + tokens
  total_coins: number;           // liveCoins
  creds_balance: number;       // main currency
  cred_balance: number;        // CRED currency
  creds_max: null;               // Not tracked
  tokens_balance: number;      // premium currency
  stash_market_value: number;    // computed from stash items
  net_profit_career: number;     // totalProfit from rounds
  avg_profit_per_round: number;
  loot_efficiency_per_min: number;
}
```

### 3. Performance Analytics (`performance_analytics`)
```typescript
{
  survival_rate: number;         // 0-1 (percentage)
  kd_ratio: number;
  total_rounds: number;
  successful_raids: number;     // extractions
  time_topside_seconds: number;
  score_total: number;
  avg_damage_per_round: number;
  avg_score_per_round: number;
}
```

### 4. Combat Detailed (`combat_detailed`)
```typescript
{
  player_kills: number;
  player_downs: number;
  arc_kills_total: number;
  damage_dealt_total: number;
  damage_received_total: number;
  health_restored_total: number;
  revives_given: number;
  revives_received: number;
  unit_breakdown: {
    kills_wasp: number;
    kills_fireball: number;
    kills_tick: number;
    kills_pop: number;
    kills_hornet: number;
    kills_turret: number;
    kills_snitch: number;
    kills_firefly: number;
    kills_spotter: number;
    kills_shredder: number;
    // ... all enemy types
  };
  enemies: [
    {
      name: string;    // "Wasp"
      count: number;   // 1175
    }
  ];
}
```

### 5. Scavenging & World (`scavenging_and_world`)
```typescript
{
  containers_looted: number;
  rare_containers_found: number;
  vaults_breached: number;
  keys_consumed: number;
  locked_doors_opened: number;
  industrial_bins_opened: number;
  items_scrapped_count: number;
  items_extracted_count: number;
}
```

### 6. Map Specific Data (`map_specific_data`)
```typescript
[
  {
    map_id: string;           // "the_dam"
    map_name: string;         // "The Dam"
    map_target_id: number;    // -636184135
    survival_rate: number;    // 0-1
    rounds_played: number;
    extracted: number;
    time_topside: number;     // seconds
    net_profit: number;
    avg_profit: number;
    kills: number;
  }
]
```

### 7. Inventory & Stash (`inventory_and_stash`)
```typescript
{
  stash_capacity_used: number;
  stash_capacity_total: number | null;
  stash_total_value: number;
  stash_items: Array<StashItem>;
}
```

### 8. Leveling Logic (`leveling_logic`)
```typescript
{
  current_rank: number;
  xp_earned_last_match: number;  // last round score
  total_career_xp: number;
}
```

### 9. Progression (`progression`)
```typescript
{
  workshop: number;      // hideout completion %
  projects: number;      // projects completion %
  quests: number;        // quests completion %
  blueprints: number;    // blueprints completion %
}
```

### 10. Legacy Identity Shape (`identity`)
```typescript
{
  raiderAlias: string;
  handle: string;        // "username#1234"
  avatar: string | null;
  slug: string | null;
  level: number;
  totalXp: number;
  xp: number;
  status: string;
}
```

### 11. Currency (Legacy)
```typescript
{
  totalFunds: number;
  coins: number;
  cred: number;
  credits: number;
  tokens: number;
}
```

### 12. Performance (Legacy)
```typescript
{
  survivalRate: number;
  kdRatio: number;
  totalRounds: number;
  successfulRaids: number;
  timeTopsideSeconds: number;
  arcKillsTotal: number;
  scoreTotal: number;
  avgScorePerRound: number;
}
```

### 13. Combat (Legacy)
```typescript
{
  kills: number;
  arcKills: number;
  playerKills: number;
  downs: number;
  damageDealt: number;
  damageReceived: number;
  healthRestored: number;
  avgDamagePerRound: number;
  revivesGiven: number;
  revivesReceived: number;
}
```

### 14. Economy (Legacy)
```typescript
{
  netProfit: number;
  avgProfitPerRound: number;
  lootEfficiencyPerMin: number;
  stashValue: number;
  stashCapacityUsed: number;
}
```

### 15. Maps (Legacy Array)
```typescript
[
  {
    map: string;            // "The Dam"
    roundsPlayed: number;
    extractions: number;
    deaths: number;
    timeTopside: number;
    netProfit: number;
    kills: number;
    survivalRate: number;
  }
]
```

### 16. Enemies (Legacy Array)
```typescript
[
  {
    name: string;    // "Wasp"
    kills: number;   // 1175
  }
]
```

### 17. Weapons / Top Weapons
```typescript
// Modern shape (from dedicatedWeaponKills)
[
  {
    name: string;           // "Venator IV"
    kills: number;          // 648
    itemId: string;         // "venator_iv"
    weaponAssetId: number;  // 168902929
  }
]

// Legacy aggregated shape
[
  {
    name: string;
    damage: number;
    kills: number;
  }
]

// weapon_performance (top 10)
[
  {
    weapon_name: string;
    weapon_kills_total: number;
    weapon_damage_total: number;  // 0 (not provided by endpoint)
  }
]
```

### 18. Trade Info
```typescript
{
  raiderRating: number;      // dbUser?.marketplaceRep
  activeListingsCount: number; // dbUser?.activeListings
  lastSync: string | null;     // dbUser?.lastActive
}
```

### 19. Rounds Summary
```typescript
{
  roundsCount: number;
  recentRounds: [
    {
      map: string;
      outcome: string;
      duration: number;      // seconds
      kills: number;
      profit: number;
      timestamp: string;
    }
  ];
}
```

---

## TypeScript Interfaces

```typescript
// ArcTracker API v2 Types

interface ArcTrackerProfile {
  userId: string;
  username: string;
  playerLevel: number;
  memberSince: string;
}

interface ArcTrackerEnemyKill {
  targetId: number;
  name: string;
  count: number;
}

interface ArcTrackerEnemyKillsResponse {
  enemies: ArcTrackerEnemyKill[];
}

interface ArcTrackerWeaponKill {
  weaponAssetId: number;
  itemId: string | null;
  name: string;
  count: number;
}

interface ArcTrackerWeaponKillsResponse {
  weapons: ArcTrackerWeaponKill[];
}

interface ArcTrackerMapPerformance {
  mapTargetId: number;
  mapName: string;
  raids: number;
  extracted: number;
  totalDurationMs: number;
  totalNetValue: number;
}

interface ArcTrackerMapPerformanceResponse {
  maps: ArcTrackerMapPerformance[];
}

interface ArcTrackerSummary {
  totalRounds: number;
  totalExtracted: number;
  totalDied: number;
  totalTimeMs: number;
  totalValueExtracted: number;
  totalValueBroughtIn: number;
  totalNetValue: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalDamage: number;
  totalContainersLooted: number;
}

interface ArcTrackerRound {
  roundId: string;
  map?: string;
  mapName: string;
  outcome?: string;
  status?: string;
  durationMs?: number;
  duration?: number;
  valueBroughtIn?: number;
  valueExtracted?: number;
  netValue?: number;
  netProfit?: number;
  kills?: number;
  arcKills?: number;
  playerKills?: number;
  playerDowns?: number;
  damage?: number;
  damageDealt?: number;
  damageTaken?: number;
  damageReceived?: number;
  healing?: number;
  healed?: number;
  score?: number;
  xp?: number;
  containersLooted?: number;
  vaultsBreached?: number;
  keysUsed?: number;
  itemsScrapped?: number;
  itemsExtracted?: number;
  rareContainersFound?: number;
  lockedDoorsOpened?: number;
  industrialBinsOpened?: number;
  revivesGiven?: number;
  revivesReceived?: number;
  roundEndedAt?: string;
  syncedAt?: string;
  seasonNumber?: number;
  isLegacy?: boolean;
  arcBreakdown?: ArcTrackerArcBreakdown[];
  weaponDamageBreakdown?: ArcTrackerWeaponDamageBreakdown[];
}

interface ArcTrackerArcBreakdown {
  targetName: string;
  kills: number;
  damage: number;
  type: string;
}

interface ArcTrackerWeaponDamageBreakdown {
  weaponName: string;
  amount: number;
}

interface ArcTrackerStash {
  items: StashItem[];
  currencies?: {
    credits?: number;
    cred?: number;
    raiderTokens?: number;
    xp?: number;
  };
  slots?: { used: number; total: number };
  usedSlots?: number;
  maxSlots?: number;
  totalValue?: number;
}

interface StashItem {
  id: string;
  name: string;
  quantity: number;
  value?: number;
  price?: number;
  // ... other item properties
}

interface ArcTrackerItem {
  id: string;
  name: string;
  nameSearch: string;
  type: string;
  rarity: string;
  imageFilename: string;
  relatedBlueprintId: string | null;
  isBlueprint: boolean;
  targetItemId: string | null;
}

interface ArcTrackerItemsIndex {
  version: string;
  generatedAt: string;
  locale: string;
  itemCount: number;
  items: ArcTrackerItem[];
}

interface ArcTrackerSettings {
  enabled: boolean;
  nextSyncAt: number;
  lastSyncAt: number;
  disabledReason: string | null;
  consecutiveFailures: number;
  lastErrorMessage: string | null;
  lastErrorAt: number | null;
  isSubscriber: boolean;
  isEmbarkLinked: boolean;
  isTokenExpired: boolean;
}

// Stats Aggregator Output Types

interface StatsOverview {
  raider_identity: RaiderIdentity;
  wallet_and_economy: WalletAndEconomy;
  performance_analytics: PerformanceAnalytics;
  combat_detailed: CombatDetailed;
  scavenging_and_world: ScavengingAndWorld;
  map_specific_data: MapSpecificData[];
  inventory_and_stash: InventoryAndStash;
  leveling_logic: LevelingLogic;
  progression: Progression;
  // Legacy shapes
  identity: LegacyIdentity;
  currency: LegacyCurrency;
  performance: LegacyPerformance;
  combat: LegacyCombat;
  economy: LegacyEconomy;
  maps: LegacyMap[];
  enemies: LegacyEnemy[];
  weapons: LegacyWeapon[];
  weapon_performance: WeaponPerformance[];
  topWeapons: TopWeapon[];
  trade: TradeInfo;
  roundsCount: number;
  recentRounds: RecentRound[];
}

interface RaiderIdentity {
  raider_alias: string;
  metaforge_id: string | null;
  raider_level: number;
  total_xp: number;
  raider_status: "Online" | "Offline";
  authenticated: boolean;
}

interface WalletAndEconomy {
  total_funds: number;
  total_coins: number;
  creds_balance: number;
  cred_balance: number;
  creds_max: null;
  tokens_balance: number;
  stash_market_value: number;
  net_profit_career: number;
  avg_profit_per_round: number;
  loot_efficiency_per_min: number;
}

interface PerformanceAnalytics {
  survival_rate: number;
  kd_ratio: number;
  total_rounds: number;
  successful_raids: number;
  time_topside_seconds: number;
  score_total: number;
  avg_damage_per_round: number;
  avg_score_per_round: number;
}

interface CombatDetailed {
  player_kills: number;
  player_downs: number;
  arc_kills_total: number;
  damage_dealt_total: number;
  damage_received_total: number;
  health_restored_total: number;
  revives_given: number;
  revives_received: number;
  unit_breakdown: Record<string, number>;
  enemies: { name: string; count: number }[];
}

interface ScavengingAndWorld {
  containers_looted: number;
  rare_containers_found: number;
  vaults_breached: number;
  keys_consumed: number;
  locked_doors_opened: number;
  industrial_bins_opened: number;
  items_scrapped_count: number;
  items_extracted_count: number;
}

interface MapSpecificData {
  map_id: string;
  map_name: string;
  map_target_id: number;
  survival_rate: number;
  rounds_played: number;
  extracted: number;
  time_topside: number;
  net_profit: number;
  avg_profit: number;
  kills: number;
}

interface InventoryAndStash {
  stash_capacity_used: number;
  stash_capacity_total: number | null;
  stash_total_value: number;
  stash_items: StashItem[];
}

interface LevelingLogic {
  current_rank: number;
  xp_earned_last_match: number;
  total_career_xp: number;
}

interface Progression {
  workshop: number;
  projects: number;
  quests: number;
  blueprints: number;
}

// Legacy Interfaces

interface LegacyIdentity {
  raiderAlias: string;
  handle: string;
  avatar: string | null;
  slug: string | null;
  level: number;
  totalXp: number;
  xp: number;
  status: string;
}

interface LegacyCurrency {
  totalFunds: number;
  coins: number;
  cred: number;
  credits: number;
  tokens: number;
}

interface LegacyPerformance {
  survivalRate: number;
  kdRatio: number;
  totalRounds: number;
  successfulRaids: number;
  timeTopsideSeconds: number;
  arcKillsTotal: number;
  scoreTotal: number;
  avgScorePerRound: number;
}

interface LegacyCombat {
  kills: number;
  arcKills: number;
  playerKills: number;
  downs: number;
  damageDealt: number;
  damageReceived: number;
  healthRestored: number;
  avgDamagePerRound: number;
  revivesGiven: number;
  revivesReceived: number;
}

interface LegacyEconomy {
  netProfit: number;
  avgProfitPerRound: number;
  lootEfficiencyPerMin: number;
  stashValue: number;
  stashCapacityUsed: number;
}

interface LegacyMap {
  map: string;
  roundsPlayed: number;
  extractions: number;
  deaths: number;
  timeTopside: number;
  netProfit: number;
  kills: number;
  survivalRate: number;
}

interface LegacyEnemy {
  name: string;
  kills: number;
}

interface LegacyWeapon {
  name: string;
  damage: number;
  kills: number;
}

interface WeaponPerformance {
  weapon_name: string;
  weapon_kills_total: number;
  weapon_damage_total: number;
}

interface TopWeapon {
  name: string;
  kills: number;
  itemId?: string;
}

interface TradeInfo {
  raiderRating: number;
  activeListingsCount: number;
  lastSync: string | null;
}

interface RecentRound {
  map: string;
  outcome: string;
  duration: number;
  kills: number;
  profit: number;
  timestamp: string;
}
```

---

## API Endpoint Query Parameters

### Stash
- `locale`: string (default: 'en')
- `page`: number (default: 1)
- `per_page` / `perPage`: number (default: 500)
- `sort`: string

### Rounds
- `locale`: string (default: 'en')
- `limit`: number (default: 50)
- `offset`: number (default: 0)
- `outcome`: string (filter by outcome)
- `map`: string (filter by map)
- `season`: number (filter by season)
- `date_from` / `dateFrom`: string (ISO date)
- `date_to` / `dateTo`: string (ISO date)
- `sort`: string (default: 'newest')

### Loadout, Quests, Hideout, Blueprints
- `locale`: string (default: 'en')
- `filter`: string (for quests/blueprints)

### Projects
- `locale`: string (default: 'en')
- `season`: number (filter by season)

---

## Error Handling

ArcTracker API returns errors in this format:
```typescript
{
  error: {
    code: string;
    message: string;
  }
}
```

HTTP Status Codes:
- `401`: Unauthorized (invalid/expired token)
- `403`: Forbidden (invalid app key)
- `429`: Rate limited (500 requests/hour per app key)
- `500`: Server error

---

## Cache Configuration

- Cache TTL: 60 seconds (`CACHE_TTL_MS`)
- Max Cache Size: 500 entries (`MAX_CACHE_SIZE`)
- Automatic cleanup of expired entries

---

## Rate Limiting

- 500 requests per hour per app key
- In-memory caching helps respect limits

---

## File Locations

- ArcTracker Service: `/server/services/arctracker.js`
- Stats Aggregator: `/server/services/statsAggregator.js`
- User Data API: `/server/services/userDataApi.js`
- Stats Routes: `/server/routes/stats.js`

---

*Generated: May 9, 2026*
*ArcTracker API Version: v2*


## Table of Contents
1. [ArcTracker API v2 Endpoints](#arctracker-api-v2-endpoints)
2. [API Return Structures](#api-return-structures)
3. [Stats Aggregator Field Mappings](#stats-aggregator-field-mappings)
4. [Stats Overview Output Structure](#stats-overview-output-structure)
5. [TypeScript Interfaces](#typescript-interfaces)

---

## ArcTracker API v2 Endpoints

Base URL: `https://arctracker.io`

Authentication: Dual-key system
- `X-App-Key`: Application key from environment
- `Authorization: Bearer {userKey}`: User key (starts with `arc_u1_`)

### Authenticated User Endpoints

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/v2/user/profile` | GET | User profile data |
| `/api/v2/user/stash` | GET | Inventory/stash with currencies |
| `/api/v2/user/loadout` | GET | Current loadout configuration |
| `/api/v2/user/quests` | GET | Quest completion status |
| `/api/v2/user/hideout` | GET | Hideout modules and levels |
| `/api/v2/user/projects` | GET | Expedition projects progress |
| `/api/v2/user/rounds` | GET | Raid/round history |
| `/api/v2/user/blueprints` | GET | Learned crafting blueprints |
| `/api/v2/user/enemy-kills` | GET | Lifetime enemy kill totals |
| `/api/v2/user/map-performance` | GET | Pre-aggregated per-map stats |
| `/api/v2/user/weapon-kills` | GET | Lifetime weapon kill totals |
| `/api/v2/user/expedition-status` | GET | Current expedition tier progress |

### Public Endpoints (App Key only)

| Endpoint | Method | Returns |
|----------|--------|---------|
| `/api/items` | GET | Master item list |

---

## API Return Structures

### 1. Profile
```typescript
{
  userId: string;           // "kmW5dpvat2WIn2cEM4juBF7DoSPP8maj"
  username: string;         // "Konartist"
  playerLevel: number;      // 1
  memberSince: string;      // ISO date
}
```

### 2. Enemy Kills (`/api/v2/user/enemy-kills`)
```typescript
{
  enemies: [
    {
      targetId: number;     // 672378114
      name: string;         // "Wasp"
      count: number;        // 1175
    }
  ]
}
```

**Full Enemy List from API:**
- Wasp (672378114)
- Fireball (299263764)
- Tick (-352140120)
- Pop (-504231823)
- Hornet (664422097)
- Turret (913532953)
- Snitch (1786451563)
- Firefly (-1524715377)
- Spotter (-1562077677)
- Shredder (2015925366)
- Rocketeer (903845622)
- Leaper (-541195755)
- Comet (-1780443771)
- Bastion (-1616729167)
- Bombardier (-1311527696)
- ARC Surveyor (1143392102)
- Sentinel (-1122989322)
- Vaporizer (1639912088)

### 3. Weapon Kills (`/api/v2/user/weapon-kills`)
```typescript
{
  weapons: [
    {
      weaponAssetId: number;  // 168902929
      itemId: string | null;   // "venator_iv" (can be null for Raider Tool)
      name: string;            // "Venator IV"
      count: number;           // 648
    }
  ]
}
```

### 4. Map Performance (`/api/v2/user/map-performance`)
```typescript
{
  maps: [
    {
      mapTargetId: number;      // -636184135
      mapName: string;          // "The Dam"
      raids: number;            // 587
      extracted: number;        // 271
      totalDurationMs: number;  // 370221367
      totalNetValue: number;    // 6048094
    }
  ]
}
```

**Known Maps:**
- The Dam
- Stella Montis
- The Blue Gate
- Buried City
- Spaceport
- Riven Tides

### 5. Summary Stats (`/api/v2/user/summary`)
```typescript
{
  totalRounds: number;           // 1614
  totalExtracted: number;        // 943
  totalDied: number;             // 671
  totalTimeMs: number;           // 1271461285
  totalValueExtracted: number;  // 93702243
  totalValueBroughtIn: number;   // 67170093
  totalNetValue: number;          // 26532150
  totalArcKills: number;         // 5791
  totalPlayerKills: number;      // 131
  totalDamage: number;           // 919190
  totalContainersLooted: number; // 20151
}
```

### 6. Settings/Sync Status
```typescript
{
  enabled: boolean;              // true
  nextSyncAt: number;            // timestamp (1778194479022)
  lastSyncAt: number;            // timestamp (1778189490617)
  disabledReason: string | null; // null
  consecutiveFailures: number;   // 0
  lastErrorMessage: string | null;
  lastErrorAt: number | null;
  isSubscriber: boolean;       // true
  isEmbarkLinked: boolean;       // true
  isTokenExpired: boolean;       // false
}
```

### 7. User Data (Quests & Progress)
```typescript
{
  playerLevel: number;
  gameProgress: {
    questStatuses: {
      [questId: string]: boolean;  // e.g., "ss11": true, "ss10k": false
    };
    neededItemCounts: {
      [itemKey: string]: number;  // e.g., "arc_alloy_project_expedition_project_phase1": 80
    };
  };
}
```

### 8. Stash/Inventory
```typescript
{
  items: [
    {
      id: string;
      name: string;
      quantity: number;
      value: number;
      // ... item properties
    }
  ];
  currencies: {
    credits?: number;      // Main currency
    cred?: number;         // CRED currency
    raiderTokens?: number; // Premium currency
    xp?: number;
  };
  slots?: {
    used: number;
    total: number;
  };
  usedSlots?: number;
  maxSlots?: number;
  totalValue?: number;
}
```

### 9. Round/Raid History
```typescript
{
  rounds: [
    {
      roundId: string;
      map: string;              // map identifier
      mapName: string;          // "The Dam"
      outcome: string;          // "Extracted" | "Failed"
      status: string;           // same as outcome
      durationMs: number;       // milliseconds
      duration: number;         // seconds (fallback)
      valueBroughtIn: number;   // loadout value
      valueExtracted: number; // loot extracted
      netValue: number;         // net profit
      netProfit: number;        // fallback
      kills: number;
      arcKills: number;
      playerKills: number;
      playerDowns: number;
      damage: number;           // damage dealt
      damageDealt: number;      // fallback
      damageTaken: number;
      damageReceived: number;   // fallback
      healing: number;
      healed: number;           // fallback
      score: number;            // XP earned
      xp: number;               // fallback
      containersLooted: number;
      vaultsBreached: number;
      keysUsed: number;
      itemsScrapped: number;
      itemsExtracted: number;
      rareContainersFound: number;
      lockedDoorsOpened: number;
      industrialBinsOpened: number;
      revivesGiven: number;
      revivesReceived: number;
      roundEndedAt: string;     // ISO date
      syncedAt: string;         // ISO date (fallback)
      seasonNumber: number;
      isLegacy: boolean;
      // Detailed breakdowns
      arcBreakdown: [
        {
          targetName: string;   // "Wasp", "Player", "Self"
          kills: number;
          damage: number;
          type: string;
        }
      ];
      weaponDamageBreakdown: [
        {
          weaponName: string;
          amount: number;       // damage dealt
        }
      ];
      damageByWeapon: number;   // total (not per-weapon)
    }
  ]
}
```

### 10. Item Index (Public)
```typescript
{
  version: string;           // "1778090187462"
  generatedAt: string;       // "2026-05-06T17:56:27.462Z"
  locale: string;            // "en"
  itemCount: number;         // 560
  items: [
    {
      id: string;            // "leviathans_crown_ship_model"
      name: string;          // "Leviathan's Crown Ship Model"
      nameSearch: string;    // lowercase searchable
      type: string;          // "Trinket", "Quick Use", "Weapon", etc.
      rarity: string;        // "Common", "Uncommon", "Rare", "Epic", "Legendary"
      imageFilename: string; // "https://cdn.arctracker.io/items/v2/..."
      relatedBlueprintId: string | null;
      isBlueprint: boolean;
      targetItemId: string | null;
    }
  ]
}
```

### 11. Loadout
```typescript
{
  augment: object | null;
  shield: object | null;
  weapon1: object | null;
  weapon2: object | null;
  backpack: object | null;
  quickItems: object[];
  safePocket: object | null;
  slotCounts: {
    quickSlots: number;
    safePocket: number;
  };
}
```

### 12. Quests
```typescript
{
  quests: [
    {
      id: string;
      name: string;
      trader: string;
      completed: boolean;
    }
  ]
}
```

### 13. Hideout
```typescript
{
  modules: [
    {
      id: string;
      name: string;
      currentLevel: number;
      maxLevel: number;
    }
  ]
}
```

### 14. Projects
```typescript
{
  projects: [
    {
      id: string;
      name: string;
      phases: number;
      completedPhases: number;
      totalPhases: number;
      fullyCompleted: boolean;
    }
  ]
}
```

### 15. Blueprints
```typescript
{
  blueprints: [
    {
      id: string;
      name: string;
      category: string;
      rarity: string;
      learned: boolean;
      targetItemId: string;
    }
  ]
}
```

### 16. Expedition Status
```typescript
{
  completedExpeditions: number;
  activeSeason: string;
  state: string;
  currentTier: number;
  nextTier: number | null;
  updatedAt: string;
}
```

---

## Stats Aggregator Field Mappings

The `statsAggregator.js` uses these field picker functions to handle multiple API response formats:

### Kill Pickers
```javascript
const pickKills = (r) =>
  num(r.arcKills ?? r.kills ?? r.player_kills ?? r.totalKills) +
  num(r.playerKills ?? r.pvpKills);

const pickArcKills = (r) =>
  num(r.arcKills ?? r.aiKills ?? r.botKills);

const pickPlayerKills = (r) =>
  num(r.playerKills ?? r.pvpKills);

const pickDowns = (r) =>
  num(r.playerDowns ?? r.downs ?? r.knockdowns);
```

### Damage Pickers
```javascript
const pickDmgDealt = (r) =>
  num(r.damage ?? r.damageDealt ?? r.damage_dealt ?? r.totalDamage);

const pickDmgRecv = (r) =>
  num(r.damageTaken ?? r.damageReceived ?? r.damage_received);

const pickHealed = (r) =>
  num(r.healing ?? r.healed ?? r.healingDone ?? r.health_restored);
```

### Economy Pickers
```javascript
const pickProfit = (r) => {
  if (r.netValue !== undefined) return num(r.netValue);
  if (r.valueExtracted !== undefined && r.valueBroughtIn !== undefined)
    return num(r.valueExtracted) - num(r.valueBroughtIn);
  if (r.netProfit !== undefined) return num(r.netProfit);
  return num(r.profit ?? r.lootValueGained ?? r.lootGained ?? r.lootValue ?? r.value);
};

const pickLootValue = (r) =>
  num(r.valueExtracted ?? r.lootValue ?? r.loot_value);

const pickLoadoutValue = (r) =>
  num(r.valueBroughtIn ?? r.loadoutValue ?? r.loadout_value);
```

### Time/Duration Pickers
```javascript
const pickDuration = (r) => {
  if (r.durationMs !== undefined) return num(r.durationMs) / 1000;
  return num(r.duration ?? r.durationSeconds ?? r.time_topside ?? r.timeAlive);
};
```

### Score/XP Pickers
```javascript
const pickScore = (r) => num(r.score ?? r.xp ?? r.experience ?? r.totalScore);
```

### Scavenging Pickers
```javascript
const pickContainersLooted = (r) =>
  num(r.containersLooted ?? r.lootedContainers ?? r.containers);

const pickVaultsBreached = (r) =>
  num(r.vaultsBreached ?? r.vaultsOpened ?? r.lockedVaults);

const pickKeysConsumed = (r) =>
  num(r.keysUsed ?? r.keysConsumed ?? r.consumedKeys);

const pickItemsScrapped = (r) =>
  num(r.itemsScrapped ?? r.itemsRecycled ?? r.itemsScrappedCount ?? r.scrappedItems);

const pickItemsExtracted = (r) =>
  num(r.itemsExtracted ?? r.itemsExtractedCount ?? r.extractedItems);

const pickRareContainers = (r) =>
  num(r.rareContainersFound ?? r.rareContainers ?? r.vaultContainersOpened);

const pickLockedDoors = (r) =>
  num(r.lockedDoorsOpened ?? r.lockedDoors ?? r.doorsOpened);

const pickIndustrialBins = (r) =>
  num(r.industrialBinsOpened ?? r.industrialBins ?? r.bins);
```

### Revive Pickers
```javascript
const pickRevivesGiven = (r) =>
  num(r.revivesGiven ?? r.revives ?? r.allyRevives);

const pickRevivesReceived = (r) =>
  num(r.revivesReceived ?? r.wasRevived ?? r.timesRevived);
```

### Map Picker
```javascript
const pickMap = (r) => r.mapName || r.map_name || r.map || "Unknown";
```

### Outcome Checkers
```javascript
const isExtract = (r) => {
  const s = (r.outcome || r.status || r.extraction || '')
    .toString()
    .toLowerCase();
  return s === "extracted" || s.includes("extract");
};

const isDeath = (r) => {
  const s = (r.outcome || r.status || r.extraction || '')
    .toString()
    .toLowerCase();
  return s === "failed" || s === "died" || s.includes("die") || s === "death";
};
```

### Canonical ARC Unit Names
```javascript
const ARC_UNIT_NAMES = [
  "Wasp", "Fireball", "Tick", "Pop", "Hornet",
  "Turret", "Snitch", "Firefly", "Spotter", "Shredder",
];
```

---

## Stats Overview Output Structure

The `buildStatsOverview()` function returns this comprehensive object:

### 1. Raider Identity (`raider_identity`)
```typescript
{
  raider_alias: string;        // profile?.username || dbUser?.displayName
  metaforge_id: string | null;   // dbUser?.embarkId || dbUser?.id
  raider_level: number;         // profile?.playerLevel || dbUser?.level
  total_xp: number;            // dbUser?.totalXp
  raider_status: "Online" | "Offline";
  authenticated: boolean;      // !!profile
}
```

### 2. Wallet & Economy (`wallet_and_economy`)
```typescript
{
  total_funds: number;           // credits + tokens
  total_coins: number;           // liveCoins
  creds_balance: number;       // main currency
  cred_balance: number;        // CRED currency
  creds_max: null;               // Not tracked
  tokens_balance: number;      // premium currency
  stash_market_value: number;    // computed from stash items
  net_profit_career: number;     // totalProfit from rounds
  avg_profit_per_round: number;
  loot_efficiency_per_min: number;
}
```

### 3. Performance Analytics (`performance_analytics`)
```typescript
{
  survival_rate: number;         // 0-1 (percentage)
  kd_ratio: number;
  total_rounds: number;
  successful_raids: number;     // extractions
  time_topside_seconds: number;
  score_total: number;
  avg_damage_per_round: number;
  avg_score_per_round: number;
}
```

### 4. Combat Detailed (`combat_detailed`)
```typescript
{
  player_kills: number;
  player_downs: number;
  arc_kills_total: number;
  damage_dealt_total: number;
  damage_received_total: number;
  health_restored_total: number;
  revives_given: number;
  revives_received: number;
  unit_breakdown: {
    kills_wasp: number;
    kills_fireball: number;
    kills_tick: number;
    kills_pop: number;
    kills_hornet: number;
    kills_turret: number;
    kills_snitch: number;
    kills_firefly: number;
    kills_spotter: number;
    kills_shredder: number;
    // ... all enemy types
  };
  enemies: [
    {
      name: string;    // "Wasp"
      count: number;   // 1175
    }
  ];
}
```

### 5. Scavenging & World (`scavenging_and_world`)
```typescript
{
  containers_looted: number;
  rare_containers_found: number;
  vaults_breached: number;
  keys_consumed: number;
  locked_doors_opened: number;
  industrial_bins_opened: number;
  items_scrapped_count: number;
  items_extracted_count: number;
}
```

### 6. Map Specific Data (`map_specific_data`)
```typescript
[
  {
    map_id: string;           // "the_dam"
    map_name: string;         // "The Dam"
    map_target_id: number;    // -636184135
    survival_rate: number;    // 0-1
    rounds_played: number;
    extracted: number;
    time_topside: number;     // seconds
    net_profit: number;
    avg_profit: number;
    kills: number;
  }
]
```

### 7. Inventory & Stash (`inventory_and_stash`)
```typescript
{
  stash_capacity_used: number;
  stash_capacity_total: number | null;
  stash_total_value: number;
  stash_items: Array<StashItem>;
}
```

### 8. Leveling Logic (`leveling_logic`)
```typescript
{
  current_rank: number;
  xp_earned_last_match: number;  // last round score
  total_career_xp: number;
}
```

### 9. Progression (`progression`)
```typescript
{
  workshop: number;      // hideout completion %
  projects: number;      // projects completion %
  quests: number;        // quests completion %
  blueprints: number;    // blueprints completion %
}
```

### 10. Legacy Identity Shape (`identity`)
```typescript
{
  raiderAlias: string;
  handle: string;        // "username#1234"
  avatar: string | null;
  slug: string | null;
  level: number;
  totalXp: number;
  xp: number;
  status: string;
}
```

### 11. Currency (Legacy)
```typescript
{
  totalFunds: number;
  coins: number;
  cred: number;
  credits: number;
  tokens: number;
}
```

### 12. Performance (Legacy)
```typescript
{
  survivalRate: number;
  kdRatio: number;
  totalRounds: number;
  successfulRaids: number;
  timeTopsideSeconds: number;
  arcKillsTotal: number;
  scoreTotal: number;
  avgScorePerRound: number;
}
```

### 13. Combat (Legacy)
```typescript
{
  kills: number;
  arcKills: number;
  playerKills: number;
  downs: number;
  damageDealt: number;
  damageReceived: number;
  healthRestored: number;
  avgDamagePerRound: number;
  revivesGiven: number;
  revivesReceived: number;
}
```

### 14. Economy (Legacy)
```typescript
{
  netProfit: number;
  avgProfitPerRound: number;
  lootEfficiencyPerMin: number;
  stashValue: number;
  stashCapacityUsed: number;
}
```

### 15. Maps (Legacy Array)
```typescript
[
  {
    map: string;            // "The Dam"
    roundsPlayed: number;
    extractions: number;
    deaths: number;
    timeTopside: number;
    netProfit: number;
    kills: number;
    survivalRate: number;
  }
]
```

### 16. Enemies (Legacy Array)
```typescript
[
  {
    name: string;    // "Wasp"
    kills: number;   // 1175
  }
]
```

### 17. Weapons / Top Weapons
```typescript
// Modern shape (from dedicatedWeaponKills)
[
  {
    name: string;           // "Venator IV"
    kills: number;          // 648
    itemId: string;         // "venator_iv"
    weaponAssetId: number;  // 168902929
  }
]

// Legacy aggregated shape
[
  {
    name: string;
    damage: number;
    kills: number;
  }
]

// weapon_performance (top 10)
[
  {
    weapon_name: string;
    weapon_kills_total: number;
    weapon_damage_total: number;  // 0 (not provided by endpoint)
  }
]
```

### 18. Trade Info
```typescript
{
  raiderRating: number;      // dbUser?.marketplaceRep
  activeListingsCount: number; // dbUser?.activeListings
  lastSync: string | null;     // dbUser?.lastActive
}
```

### 19. Rounds Summary
```typescript
{
  roundsCount: number;
  recentRounds: [
    {
      map: string;
      outcome: string;
      duration: number;      // seconds
      kills: number;
      profit: number;
      timestamp: string;
    }
  ];
}
```

---

## TypeScript Interfaces

```typescript
// ArcTracker API v2 Types

interface ArcTrackerProfile {
  userId: string;
  username: string;
  playerLevel: number;
  memberSince: string;
}

interface ArcTrackerEnemyKill {
  targetId: number;
  name: string;
  count: number;
}

interface ArcTrackerEnemyKillsResponse {
  enemies: ArcTrackerEnemyKill[];
}

interface ArcTrackerWeaponKill {
  weaponAssetId: number;
  itemId: string | null;
  name: string;
  count: number;
}

interface ArcTrackerWeaponKillsResponse {
  weapons: ArcTrackerWeaponKill[];
}

interface ArcTrackerMapPerformance {
  mapTargetId: number;
  mapName: string;
  raids: number;
  extracted: number;
  totalDurationMs: number;
  totalNetValue: number;
}

interface ArcTrackerMapPerformanceResponse {
  maps: ArcTrackerMapPerformance[];
}

interface ArcTrackerSummary {
  totalRounds: number;
  totalExtracted: number;
  totalDied: number;
  totalTimeMs: number;
  totalValueExtracted: number;
  totalValueBroughtIn: number;
  totalNetValue: number;
  totalArcKills: number;
  totalPlayerKills: number;
  totalDamage: number;
  totalContainersLooted: number;
}

interface ArcTrackerRound {
  roundId: string;
  map?: string;
  mapName: string;
  outcome?: string;
  status?: string;
  durationMs?: number;
  duration?: number;
  valueBroughtIn?: number;
  valueExtracted?: number;
  netValue?: number;
  netProfit?: number;
  kills?: number;
  arcKills?: number;
  playerKills?: number;
  playerDowns?: number;
  damage?: number;
  damageDealt?: number;
  damageTaken?: number;
  damageReceived?: number;
  healing?: number;
  healed?: number;
  score?: number;
  xp?: number;
  containersLooted?: number;
  vaultsBreached?: number;
  keysUsed?: number;
  itemsScrapped?: number;
  itemsExtracted?: number;
  rareContainersFound?: number;
  lockedDoorsOpened?: number;
  industrialBinsOpened?: number;
  revivesGiven?: number;
  revivesReceived?: number;
  roundEndedAt?: string;
  syncedAt?: string;
  seasonNumber?: number;
  isLegacy?: boolean;
  arcBreakdown?: ArcTrackerArcBreakdown[];
  weaponDamageBreakdown?: ArcTrackerWeaponDamageBreakdown[];
}

interface ArcTrackerArcBreakdown {
  targetName: string;
  kills: number;
  damage: number;
  type: string;
}

interface ArcTrackerWeaponDamageBreakdown {
  weaponName: string;
  amount: number;
}

interface ArcTrackerStash {
  items: StashItem[];
  currencies?: {
    credits?: number;
    cred?: number;
    raiderTokens?: number;
    xp?: number;
  };
  slots?: { used: number; total: number };
  usedSlots?: number;
  maxSlots?: number;
  totalValue?: number;
}

interface StashItem {
  id: string;
  name: string;
  quantity: number;
  value?: number;
  price?: number;
  // ... other item properties
}

interface ArcTrackerItem {
  id: string;
  name: string;
  nameSearch: string;
  type: string;
  rarity: string;
  imageFilename: string;
  relatedBlueprintId: string | null;
  isBlueprint: boolean;
  targetItemId: string | null;
}

interface ArcTrackerItemsIndex {
  version: string;
  generatedAt: string;
  locale: string;
  itemCount: number;
  items: ArcTrackerItem[];
}

interface ArcTrackerSettings {
  enabled: boolean;
  nextSyncAt: number;
  lastSyncAt: number;
  disabledReason: string | null;
  consecutiveFailures: number;
  lastErrorMessage: string | null;
  lastErrorAt: number | null;
  isSubscriber: boolean;
  isEmbarkLinked: boolean;
  isTokenExpired: boolean;
}

// Stats Aggregator Output Types

interface StatsOverview {
  raider_identity: RaiderIdentity;
  wallet_and_economy: WalletAndEconomy;
  performance_analytics: PerformanceAnalytics;
  combat_detailed: CombatDetailed;
  scavenging_and_world: ScavengingAndWorld;
  map_specific_data: MapSpecificData[];
  inventory_and_stash: InventoryAndStash;
  leveling_logic: LevelingLogic;
  progression: Progression;
  // Legacy shapes
  identity: LegacyIdentity;
  currency: LegacyCurrency;
  performance: LegacyPerformance;
  combat: LegacyCombat;
  economy: LegacyEconomy;
  maps: LegacyMap[];
  enemies: LegacyEnemy[];
  weapons: LegacyWeapon[];
  weapon_performance: WeaponPerformance[];
  topWeapons: TopWeapon[];
  trade: TradeInfo;
  roundsCount: number;
  recentRounds: RecentRound[];
}

interface RaiderIdentity {
  raider_alias: string;
  metaforge_id: string | null;
  raider_level: number;
  total_xp: number;
  raider_status: "Online" | "Offline";
  authenticated: boolean;
}

interface WalletAndEconomy {
  total_funds: number;
  total_coins: number;
  creds_balance: number;
  cred_balance: number;
  creds_max: null;
  tokens_balance: number;
  stash_market_value: number;
  net_profit_career: number;
  avg_profit_per_round: number;
  loot_efficiency_per_min: number;
}

interface PerformanceAnalytics {
  survival_rate: number;
  kd_ratio: number;
  total_rounds: number;
  successful_raids: number;
  time_topside_seconds: number;
  score_total: number;
  avg_damage_per_round: number;
  avg_score_per_round: number;
}

interface CombatDetailed {
  player_kills: number;
  player_downs: number;
  arc_kills_total: number;
  damage_dealt_total: number;
  damage_received_total: number;
  health_restored_total: number;
  revives_given: number;
  revives_received: number;
  unit_breakdown: Record<string, number>;
  enemies: { name: string; count: number }[];
}

interface ScavengingAndWorld {
  containers_looted: number;
  rare_containers_found: number;
  vaults_breached: number;
  keys_consumed: number;
  locked_doors_opened: number;
  industrial_bins_opened: number;
  items_scrapped_count: number;
  items_extracted_count: number;
}

interface MapSpecificData {
  map_id: string;
  map_name: string;
  map_target_id: number;
  survival_rate: number;
  rounds_played: number;
  extracted: number;
  time_topside: number;
  net_profit: number;
  avg_profit: number;
  kills: number;
}

interface InventoryAndStash {
  stash_capacity_used: number;
  stash_capacity_total: number | null;
  stash_total_value: number;
  stash_items: StashItem[];
}

interface LevelingLogic {
  current_rank: number;
  xp_earned_last_match: number;
  total_career_xp: number;
}

interface Progression {
  workshop: number;
  projects: number;
  quests: number;
  blueprints: number;
}

// Legacy Interfaces

interface LegacyIdentity {
  raiderAlias: string;
  handle: string;
  avatar: string | null;
  slug: string | null;
  level: number;
  totalXp: number;
  xp: number;
  status: string;
}

interface LegacyCurrency {
  totalFunds: number;
  coins: number;
  cred: number;
  credits: number;
  tokens: number;
}

interface LegacyPerformance {
  survivalRate: number;
  kdRatio: number;
  totalRounds: number;
  successfulRaids: number;
  timeTopsideSeconds: number;
  arcKillsTotal: number;
  scoreTotal: number;
  avgScorePerRound: number;
}

interface LegacyCombat {
  kills: number;
  arcKills: number;
  playerKills: number;
  downs: number;
  damageDealt: number;
  damageReceived: number;
  healthRestored: number;
  avgDamagePerRound: number;
  revivesGiven: number;
  revivesReceived: number;
}

interface LegacyEconomy {
  netProfit: number;
  avgProfitPerRound: number;
  lootEfficiencyPerMin: number;
  stashValue: number;
  stashCapacityUsed: number;
}

interface LegacyMap {
  map: string;
  roundsPlayed: number;
  extractions: number;
  deaths: number;
  timeTopside: number;
  netProfit: number;
  kills: number;
  survivalRate: number;
}

interface LegacyEnemy {
  name: string;
  kills: number;
}

interface LegacyWeapon {
  name: string;
  damage: number;
  kills: number;
}

interface WeaponPerformance {
  weapon_name: string;
  weapon_kills_total: number;
  weapon_damage_total: number;
}

interface TopWeapon {
  name: string;
  kills: number;
  itemId?: string;
}

interface TradeInfo {
  raiderRating: number;
  activeListingsCount: number;
  lastSync: string | null;
}

interface RecentRound {
  map: string;
  outcome: string;
  duration: number;
  kills: number;
  profit: number;
  timestamp: string;
}
```

---

## API Endpoint Query Parameters

### Stash
- `locale`: string (default: 'en')
- `page`: number (default: 1)
- `per_page` / `perPage`: number (default: 500)
- `sort`: string

### Rounds
- `locale`: string (default: 'en')
- `limit`: number (default: 50)
- `offset`: number (default: 0)
- `outcome`: string (filter by outcome)
- `map`: string (filter by map)
- `season`: number (filter by season)
- `date_from` / `dateFrom`: string (ISO date)
- `date_to` / `dateTo`: string (ISO date)
- `sort`: string (default: 'newest')

### Loadout, Quests, Hideout, Blueprints
- `locale`: string (default: 'en')
- `filter`: string (for quests/blueprints)

### Projects
- `locale`: string (default: 'en')
- `season`: number (filter by season)

---

## Error Handling

ArcTracker API returns errors in this format:
```typescript
{
  error: {
    code: string;
    message: string;
  }
}
```

HTTP Status Codes:
- `401`: Unauthorized (invalid/expired token)
- `403`: Forbidden (invalid app key)
- `429`: Rate limited (500 requests/hour per app key)
- `500`: Server error

---

## Cache Configuration

- Cache TTL: 60 seconds (`CACHE_TTL_MS`)
- Max Cache Size: 500 entries (`MAX_CACHE_SIZE`)
- Automatic cleanup of expired entries

---

## Rate Limiting

- 500 requests per hour per app key
- In-memory caching helps respect limits

---

## File Locations

- ArcTracker Service: `/server/services/arctracker.js`
- Stats Aggregator: `/server/services/statsAggregator.js`
- User Data API: `/server/services/userDataApi.js`
- Stats Routes: `/server/routes/stats.js`

---

*Generated: May 9, 2026*
*ArcTracker API Version: v2*
