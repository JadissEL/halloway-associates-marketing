# Follow-up statuses ↔ actions

Canonical stages: [`docs/OUTREACH_FOLLOWUPS.md`](../../docs/OUTREACH_FOLLOWUPS.md) §2.

| Stage | Trigger | Sequence | Pipeline | Suppression |
|-------|---------|----------|----------|-------------|
| 0 Cold | Enrolled, no reply | Run E1–E5 | — | — |
| 1 Soft open | Opens/clicks, no reply | Continue; shorten next | — | — |
| 2 Curious | Question | **Pause** cold steps; human reply | warm | — |
| 3 Interested | Demo/pricing ask | Pause; send kit + next step | **hot** | — |
| 4 Audit booked | Calendar set | Pause sales | hot / audit | — |
| 5 Negotiation | Scope/price | Pause; proposal only | negotiation | — |
| 6 Won | Signed / paid | **Stop** sales FUs | won | optional sales-suppress |
| 7 Lost / No | Explicit no | Stop; one close | lost | suppress or 180d |
| 8 Nurture | “Not now” + date/default 60d | One nurture then stop | nurture | — |
| Bounce | Hard/soft bounce | Stop | — | bounce list |
| Unsub | Link or “stop” | Stop forever | — | **absolute** |

**MVP:** auto-draft OK · **auto-send replies = OFF** · human owns hot threads.
