# Local secrets vault

**This folder stays on your machine.** `.secrets/TOKENS.env` holds API keys and connection strings permanently for Halloway Associates.

- Do **not** commit `TOKENS.env` (blocked by root `.gitignore`).
- Source of truth for secrets: `.secrets/TOKENS.env`
- Runtime copies: root `.env`, `outbound-os/.env`, `outbound-os/server/.env` (also gitignored)
- Committed placeholders only: `.env.example`, `outbound-os/.env.example`

MCP OAuth sessions (Notion, Linear, Slack, Google, …) live in **Cursor**, not in this file. Paste dashboard API keys into `TOKENS.env` when you create them.

## Cross-project

Same keys that must work everywhere also live in:

- `%USERPROFILE%\.secrets\TOKENS.env`
- `%USERPROFILE%\.cursor\mcp.secrets.env` + User env
- `%USERPROFILE%\.cursor\mcp.json` (MCP servers for **all** workspaces)

## Skip list (this Marketing repo)

Hunter · Namecheap · Ahrefs · G2 · Supabase · n8n-local  
GitHub token is stored globally (founder override).
