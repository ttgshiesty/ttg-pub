# Stats Audit Workflow

Use this for SHiESTY player stats, dashboards, leaderboards, Discord summaries, and ArcTracker aggregation.

## Check

- Incorrect boolean stat names.
- Misspelled stat fields.
- Frontend/backend stat mismatches.
- MongoDB schema mismatches.
- Discord bot stat mismatches.
- Wrong calculations.
- Duplicate or unused stat fields.
- API response mapping problems.
- Hardcoded limits.
- Missing pagination.
- API query limits.
- MongoDB query limits.
- Sync truncation.
- Missing records.
- Why only 200 rounds are pulled.

## Trace These Files First

- `server/services/statsAggregator.js`
- `server/services/arctracker.js`
- `server/services/userDataApi.js`
- `server/routes/stats.js`
- `server/routes/player.js`
- `server/services/discordCommands.js`
- `client/src/pages/DashboardPage.tsx`
- `client/src/pages/MyProfilePage.tsx`
- `client/src/pages/RaidHistoryPage.tsx`
- `client/src/context/PlayerContext.tsx`
- `client/src/components/Header.tsx`

## Compare Against

- `AI_CONTEXT/API_RETURNS_REAL.md`
- `AI_CONTEXT/COMPLETE_API_RETURNS.md`
- `AI_CONTEXT/API_REFERENCE_COMPLETE.md`
