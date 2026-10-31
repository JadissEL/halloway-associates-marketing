# Secrets — where they live

| Location | Git? | Purpose |
|----------|------|---------|
| **`.secrets/TOKENS.env`** | **No** | Project vault (keys, Neon URL, JWT, Resend, IDs) |
| **`%USERPROFILE%\.secrets\TOKENS.env`** | N/A | **Cross-project** vault (all Cursor workspaces) |
| **`%USERPROFILE%\.cursor\mcp.secrets.env`** | N/A | MCP bridge keys (GitHub, Render, …) |
| `.env` / `outbound-os/.env` / `server/.env` | No | Runtime copies synced from vault |
| `.env.example` | Yes | Names only, no values |
| Cursor MCP OAuth + `~\.cursor\mcp.json` | Cursor app | Notion/Linear/Slack/Google/… — **user-level, all projects** |
| `docs/` / `config/` | Yes | Never put real tokens here |

See `C:\Users\Jadiss\.cursor\CROSS_PROJECT_MCP.md`.

## Marketing skip (prefer not to use in this repo)

Hunter · Namecheap · Ahrefs · G2 · Supabase · n8n-local.  
**GitHub:** token stored globally (`GITHUB_PAT` / `GITHUB_TOKEN`) by founder request — MCP bridge enabled user-wide.

## Ops

After creating a new key in a dashboard, append it to `.secrets/TOKENS.env`, mirror into the relevant `.env`, and if it should work in **every** Cursor project also append to `%USERPROFILE%\.secrets\TOKENS.env` (and User env / `mcp.secrets.env` for MCP bridges). Keep `DRY_RUN=true` until GO_LIVE.

**Fully quit & reopen Cursor** after changing User env tokens so MCP reloads.
