# Workspace Inventory Report

Generated on: 2026-05-29

## Root Directories

- **.clinerules/** - Custom CLI rules and hooks for development workflow
- **.devin/** - Development configuration
- **.git/** - Git repository metadata
- **.github/** - GitHub configuration, workflows, and issue templates
- **.vscode/** - VSCode IDE configuration
- **.windsurf/** - Windsurf IDE rules and workflows
- **add/** - Additional files (empty)
- **all_svgs/** - SVG icon library for UI elements
- **atlas/** - Blueprint atlas application with map data
- **client/** - Frontend React application
- **data/** - Game data JSON files
- **logs/** - Application logs directory (empty)
- **rules/** - Custom rules directory (empty)
- **scripts/** - Utility scripts for data processing
- **server/** - Backend Node.js/Express server
- **shiestybuddy/** - Browser extension code
- **skills/** - Skills directory (empty)
- **tools/** - Tools directory (empty)
- **❇️SHIESTYAPI❇️/** - API data exports

---

## Assets Location

### Images & Static Assets

**client/public/** - Public static assets
- Maps: bluegate.png, burriedcity.png, dambattlegrounds.png, spaceport.png, stella.png, riventides.webp, dam_battle.jpeg
- Icons: favicon.ico, favicon.png

**shiestybuddy/icons/** - Browser extension icons
- Platform icons: browser.webp, embarkcorner.webp, epic.webp, epicgames.webp, steam.webp, xbox.webp, playstation.webp, playstationdark.webp
- Logo variants: logo16x16.png, logo32x32.png, logo48x48.png, logo128x128.png, ico.png, favicon.ico

**atlas/** - Blueprint atlas images
- looting-mk3-safekeeper.png, tactical-mk3-revival.png

### SVGs

**all_svgs/** - Main SVG library
- UI icons: hamburger_menu_icon.svg, info_circle_icon.svg
- Skill tree assets: skill_tree_connection_paths_disabled.svg, skill_tree_animated_color_rails.svg
- Extracted SVGs (numbered 07-32)
- Reference images: ARC_Skilltree_reference.png
- unique_svgs/ (empty)

**client/src/skill-tree/components/svgs/** - Skill tree SVG components
- AnimatedRails.tsx, ConnectionPaths.tsx, LockIcon.tsx, SkillTreeLogo.tsx

### Fonts

**client/public/fonts/** - Custom fonts
- BarlowCondensed-Bold.ttf, BarlowCondensed-SemiBold.ttf

---

## Map Files Location

### Map Data

**client/src/data/pois/** - Point of Interest data for all maps
- blue-gate.ts, burial-city.ts, dam-battlegrounds.ts, riven-tides.ts, spaceport.ts, stella-montis.ts
- containers.ts, locationTypes.ts, map-interactive-config.ts, maps.ts, poi-types.ts, poiMarkers.ts, index.ts

**client/src/data/map-events/** - Map event data and CSS
- map-events.json
- css/ - Map styling (components.css, layout.css, map.css, marker-ui.css, styles.css, variables.css)

**client/public/** - Map images (see Assets section above)

---

## Data JSON Files Location

### Root Level Data

- **MASTER_DATA.json** - Master game data
- **events.json** - Game events data
- **events-control.json** - Event control configuration
- **map-events.json** - Map event data
- **guild_config.json** - Discord guild configuration
- **arc_blueprint_detail_boxes.json** - Blueprint detail boxes
- **schema.json** - Data schema
- **version.json** - Version information
- **site.webmanifest.json** - Web app manifest
- **manifest.json** - Extension manifest

### Client Data

**client/data/metaforge-items.json** - Metaforge items

**client/src/data/** - Client-side game data
- items-master.json - Master items database
- projects.json - Project data
- quests-all.json - All quests data
- trades.json - Trading data
- bots.json - Bot data
- item-tag-reasons.json - Item tag reasoning
- item-tags-computed.json - Computed item tags
- version.json - Data version
- workshop_upgrades.json - Workshop upgrades
- skillNodes.json - Skill tree nodes
- maps.json - Map metadata
- mapUtils.ts - Map utilities

**client/src/data/hideout/** - Hideout station configs (9 JSON files)
- equipment_bench.json, explosives_bench.json, med_station.json, refiner.json, scrappy.json, stash.json, utility_bench.json, weapon_bench.json, workbench.json

**client/src/data/items/** - Item data (567 files)

**client/src/data/map-events/** - Map event data

**client/src/data/pois/** - Point of interest data (TypeScript files)

**client/src/data/quest/** - Individual quest JSON files (100 files)

**client/src/data/quests/** - Quest data (100 files)

### Server Data

**server/data/** - Server-side game data
- ardb-item-tags.json - Item tags
- ardb-items.json - Items database (10.4MB)
- ardb-projects.json - Projects database
- metaforge-items.json - Metaforge items (1.3MB)
- items/index.js - Items index

### Root Data Directory

**data/metaforge-items.json** - Metaforge items (1.3MB)

### Atlas Data

**atlas/arc-raiders-blueprint-atlas.json** - Blueprint atlas data

### API Data Exports

**❇️SHIESTYAPI❇️/** - API data exports
- ARC-DMG-KILLS.json, BREAK-DOWN-ARC-TRACKER-FULL-PROGRESS.MD

### Scripts Data

**scripts/xp-referane.json** - XP reference data

### Extension Data

**shiestybuddy/rules.json** - Extension rules

---

## API Routes Location

**server/routes/** - All API endpoint handlers (14 files)
- arctracker.js - ARC tracker endpoints
- catalog.js - Catalog endpoints
- discord.js - Discord integration endpoints
- embark.js - Embark platform endpoints
- extension.js - Browser extension endpoints
- g2g.js - G2G marketplace endpoints
- health.js - Health check endpoints
- mapProgress.js - Map progress endpoints
- marketplace.js - Marketplace endpoints (50KB)
- metaforge.js - Metaforge endpoints
- player.js - Player data endpoints (84KB)
- publicProfile.js - Public profile endpoints
- raiderSync.js - Raider sync endpoints
- stats.js - Statistics endpoints

---

## Mongo Schemas/Models Location

**server/models/** - Mongoose models (9 files)
- AutoSyncSettings.js - Auto sync settings
- BlueprintFind.js - Blueprint finds
- CapturedToken.js - Authentication tokens
- MarketplaceListing.js - Marketplace listings
- MarketplaceOffer.js - Marketplace offers
- MarketplacePriceSnapshot.js - Price snapshots
- Notification.js - Notifications
- SyncData.js - Sync data
- User.js - User accounts

---

## Style Files Location

### Root Level CSS

- **client/master.css** - Master stylesheet
- **client/index.css** - Main index CSS (in src/)
- **client/StashSidebar.css** - Stash sidebar CSS (in src/)

### Component CSS

- **client/src/components/ItemCard.module.css** - Item card module CSS
- **client/src/skill-tree/index.css** - Skill tree CSS
- **client/src/skill-tree/components/skill-tree.css** - Skill tree component CSS

### Map Event CSS

**client/src/data/map-events/css/** - Map event styling (6 files)
- components.css, layout.css, map.css, marker-ui.css, styles.css, variables.css

### Atlas CSS

- **atlas/index-mkvXXOxi.css** - Atlas stylesheet

---

## Folder Usage Summary

### Frontend (client/)

**src/** - React source code
- components/ - Reusable UI components
- pages/ - Page components (21 pages)
- data/ - Client-side game data
- lib/ - Utility libraries and helpers
- hooks/ - Custom React hooks
- context/ - React context providers
- types/ - TypeScript type definitions
- skill-tree/ - Skill tree feature

**public/** - Static assets served directly
- fonts/ - Custom fonts
- Map images and icons

**dist/** - Build output (empty)

### Backend (server/)

- routes/ - API endpoint handlers (14 files)
- models/ - Mongoose database models (9 files)
- services/ - Business logic services (18 files)
- lib/ - Shared libraries (2 files)
- middleware/ - Express middleware (1 file)
- utils/ - Utility functions (4 files)
- data/ - Server-side game data

### Extensions & Tools

**shiestybuddy/** - Browser extension (Chrome/Edge)
- background.js - Background script
- content.js - Content script
- embark-content.js - Embark content script
- embark-login.js - Embark login script
- popup.html - Extension popup
- popup.js - Popup script
- icons/ - Extension icons
- _metadata/ - Metadata and rulesets

**scripts/** - Data processing and scraping scripts
- rewrite-static-asset-urls.mjs - Asset URL rewriter
- scrape-loot.yml - Loot scraping configuration
- xp-referane.json - XP reference data

**atlas/** - Blueprint atlas standalone app
- arc-raiders-blueprint-atlas.json - Blueprint data
- index.html - Atlas HTML
- CSS and JS bundles

### Configuration

**.github/** - GitHub Actions workflows and issue templates
- workflows/ - CI/CD workflows (4 files)
- ISSUE_TEMPLATE/ - Issue templates (3 files)

**.windsurf/** - Windsurf IDE configuration
- rules/ - IDE rules
- workflows/ - IDE workflows

**.clinerules/** - CLI rules and hooks
- hooks/ - Custom hooks

---

## Detailed Directory Structure

### client/src/components/

- AtlasBlueprintPanel.tsx
- BottomHeader.tsx
- BouncingScrappy.tsx
- CharacterBackground.tsx
- CraftRelationships.tsx
- DiscordProfileCard.tsx
- ErrorBoundary.tsx
- FixedBackdrop.tsx
- Header.tsx
- ItemCard.tsx
- ItemCard.module.css
- ItemTooltip.tsx
- NotificationBell.tsx
- Tooltip.tsx
- live-data/ - Live data components (4 files)
- stats/ - Statistics components (12 files)
- ui/ - UI components (6 files)

### client/src/pages/

- BlueprintsPage.tsx
- CodexPage.tsx
- DashboardPage.tsx
- EnhancedStatsPage.tsx
- InteractiveMapPage.tsx
- LiveEventTimersPage.tsx
- LoadoutPage.tsx
- MarketplacePage.tsx
- MyProfilePage.tsx
- PerformanceMonitorPage.tsx
- ProjectsPage.tsx
- PublicProfilePage.tsx
- RaidHistoryPage.tsx
- SettingsPage.tsx
- SkillTreePage.tsx
- StashPage.tsx
- StatTrendsPage.tsx
- TradersPage.tsx
- TrialsLeaderboardPage.tsx
- WorkshopPage.tsx
- XpBreakdownPage.tsx

### server/services/

- arctracker.js
- ardb.js
- assetMap.js
- atlasBlueprints.js
- autoSync.js
- blueprintIntel.js
- discordBot.js
- discordCommands.js
- embarkProxy.js
- g2g.js
- gameCatalog.js
- listingOptimizer.js
- metaforge.js
- metaforgeCatalog.js
- normalizedCatalog.js
- raiderSync.js
- statsAggregator.js
- userDataApi.js

### client/src/lib/

- analytics/ - Analytics utilities
- arc-raiders/ - ARC Raiders API clients
- events/ - Event configuration
- hooks/ - Custom hooks
- inventory/ - Inventory utilities
- live-data/ - Live data utilities
- api.ts - Main API client
- arcBotIcon.ts
- arcRaidersData.ts
- arctracker.ts
- arctrackerMaster.ts
- assetUrl.ts
- blueprintReferenceArt.ts
- cache.ts
- client.ts
- completionsStorage.ts
- discordUtils.ts
- extensionBridge.ts
- gameIcons.ts
- hudBuilder.ts
- itemDb.ts
- mapProgressStorage.ts
- metaforge.ts
- progressSummary.ts
- searchUtils.ts
- tagGenerator.ts
- tagGeneratorClient.ts
- tagReasoning.ts
- trialsService.ts
- types.ts
- utils.ts
- useCraftRelationships.ts

### client/src/skill-tree/

- components/ - Skill tree components (12 files)
- data/ - Skill tree data (2 files)
- store/ - State management (1 file)
- types/ - TypeScript types (1 file)
- index.css - Main stylesheet

---

## Summary

- **Total API Routes**: 14 route files
- **Total Mongo Models**: 9 model files
- **Total Service Files**: 18 service files
- **Total Page Components**: 21 pages
- **Total Component Files**: 36+ components
- **Total Data JSON Files**: 700+ files across multiple directories
- **Total SVG Files**: 30+ SVG icons and components
- **Total CSS Files**: 10+ stylesheets
- **Font Files**: 2 custom fonts
