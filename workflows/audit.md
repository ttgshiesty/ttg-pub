# Audit Workflow

Use this whenever the user says audit, check, inspect, verify, find, report, compare, or asks what is wrong.

## Steps

1. Read project rules and relevant docs.
2. Identify relevant files.
3. Trace frontend usage.
4. Trace backend usage.
5. Trace database/schema usage.
6. Trace Discord bot usage if stats/user data are involved.
7. Trace API response mappings.
8. Return a report only.

## Do Not

- Edit files.
- Rewrite files.
- Run destructive commands.
- Change Git state.
- Change database state.
- Deploy.

## Report Format

```md
## Finding

- File path:
- Current code/field:
- Expected code/field:
- Problem:
- Root cause:
- Recommended correction:
- Files depending on it:
- Risk level:
```
