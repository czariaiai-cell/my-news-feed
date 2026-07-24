---
name: "bytow-real-estate-monitor"
description: "Daily research for real estate plots near Bytów (30km radius, 6-10km priority)."
---

# Real Estate Monitor: Bytów Area

This skill provides a procedure to monitor real estate websites (OLX, Adresowo, Otodom, Facebook Marketplace) for new building or recreational plots within 30km of Bytów (Pomorskie), with a priority focus on a 6-10km radius.

## Procedure
1.  **Search:** Use web search to query for new listings in target locations (Bytów, Ugoszcz, Studzienice, Borzytuchom).
2.  **Filter & Rank:** Filter for "building" (budowlane) and "recreational" (rekreacyjne) plots. Rank by price, location, and potential value using `sonnet` reasoning.
3.  **Report:** Generate a clear markdown table with links.

## Automation
- A cron job runs this procedure daily at 03:00 UTC.
- Deliver results to the main chat session.

## Configuration
- **Target Area:** Bytów +30km (Priority: 6-10km).
- **Model:** `sonnet` (via `claude-cli/claude-sonnet-5`).
