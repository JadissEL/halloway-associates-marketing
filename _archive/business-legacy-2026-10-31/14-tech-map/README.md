# 14 — Tech map ↔ métier

```mermaid
flowchart LR
  subgraph Public
    Vite[Vite marketing]
    Demos[demos]
    Card[carte]
  end
  subgraph Config
    BJ[config/brand.json]
  end
  subgraph Biz
    BOS[business/]
  end
  subgraph Acq["Acquisition — OFF"]
    OR[outreach/]
    OS[outbound-os]
  end
  BJ --> Vite
  BOS -.governs.-> Vite
  BOS -.governs.-> OR
  BOS -.governs.-> OS
```

| Couche | Path | Notes |
|--------|------|-------|
| Marque runtime | `config/brand.json` | Source éditable |
| UI | `src/` | Préserver |
| Qualité | `docs/QUALITY_*` | Technique |
| Métier | `business/` | Ce cadre |
| Vente assets | `outreach/` | Dormant |
| Ops email | `outbound-os/` | Dry-run |

## Ports locaux

| App | Port |
|-----|------|
| Marketing | 5173 |
| Outbound UI | 5174 |
| Outbound API | 3001 |
