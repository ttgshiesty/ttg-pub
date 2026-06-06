# Code Review Workflow

Use this when reviewing code changes for bugs, security issues, or improvements.

## Focus Areas

1. Logic errors and incorrect behavior.
2. Edge cases not handled.
3. Null or undefined reference issues.
4. Race conditions and concurrency bugs.
5. Security vulnerabilities.
6. Resource leaks.
7. API contract violations.
8. Cache staleness, bad cache keys, incorrect invalidation, ineffective caching.
9. Violations of existing code patterns.

## Rules

- Do not report low-confidence speculative issues.
- Base findings on code and documented contracts.
- Report pre-existing bugs if they impact the reviewed area.
- Prefer concise findings with exact file paths and fixes.
