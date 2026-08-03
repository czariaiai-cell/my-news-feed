# Pointer — Geopiguła Project Brain

The Geopiguła project brain lives at `brain/` in this repository.
Read `brain/index.md` first for full context — journal, wiki, skills, and agent directives.

This file exists only because Claude Code auto-loads `CLAUDE.md` in the project root.

## Key paths
- **Brain root**: `brain/index.md`
- **Daily journal**: `brain/journal/YYYY-MM-DD.md`
- **Knowledge base**: `brain/wiki/`
- **Agent directives**: `brain/agents.md`
- **Skills**: `brain/skills/`

## Git push from inside Docker container (HTTPS override)
```bash
git push https://czariaiai-cell:${GITHUB_TOKEN}@github.com/czariaiai-cell/my-news-feed.git main
```
`GITHUB_TOKEN` is set in the OpenClaw container environment.
