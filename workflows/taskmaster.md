# Taskmaster Workflow

Default context: `master`.

## Basic Loop

1. `task-master list`
2. `task-master next`
3. `task-master show <id>`
4. `task-master expand --id=<id>`
5. Implement only after approval when code changes are needed.
6. `task-master update-subtask --id=<id> --prompt="..."`
7. `task-master set-status --id=<id> --status=done`
8. Repeat.

## Tags

Use tags only when helpful:

- Feature branch work.
- Team collaboration.
- Experiments.
- Large features.
- PRD-driven work.

Do not force tag workflows for simple tasks.

## Safe Use

Taskmaster commands can modify task files. Explain before running modifying commands.
