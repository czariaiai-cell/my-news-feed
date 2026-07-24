---
name: "federated-brain-connector"
description: "Workflow to link a Global Brain with Project-Specific Vaults in Obsidian."
---

# Federated Brain Connector Protocol

## Objective
Establish a link between a central Global Brain and various Project-specific vaults to allow context-aware AI operations.

## Architecture
1. **Global Brain**: `~/obsidian/global_brain` - Contains core identity, workflows, and high-level summaries.
2. **Project Vaults**: `~/obsidian/projects/<project_name>` - Domain-specific data.

## Connection Mechanism
- **Shared Directory**: Use a `shared_knowledge` subfolder within the Global Brain that is symlinked or included in the search path of all project vaults.
- **Obsidian Linking**: Use standard WikiLinks `[[...]]`.
- **OpenClaw Indexing**: A sub-agent script will monitor folders for new notes and update a master index in the Global Brain.

## Implementation Steps
1. Create `~/obsidian/global_brain` and `~/obsidian/projects`.
2. Move generic project files to `~/obsidian/global_brain`.
3. Use symlinks for shared assets: `ln -s ~/obsidian/global_brain/templates ~/obsidian/projects/<project>/templates`.
4. Run indexing script periodically via `cron`.
