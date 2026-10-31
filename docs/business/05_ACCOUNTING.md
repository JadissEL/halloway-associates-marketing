# 05 — Accounting (France-oriented, informational)

| Meta | Value |
|------|--------|
| **Purpose** | Practical FR-oriented accounting structure founder can edit; not legal/tax advice. |
| **Owner role** | Ops / finance admin |
| **Last updated** | 2026-10-31 |
| **Status** | `draft` |
| **Non-goals** | Choosing the legal form for you; filing VAT; replacing an accountant. |

> **Disclaimer:** Informational only. Confirm with a qualified expert in your jurisdiction (`{{CITY}}` / FR / EL as applicable).

---

## Suggested legal form overview (FR)

| Form | Fit sketch |
|------|------------|
| **Micro-entreprise** | Simplest start; CA ceilings; limited deductibility |
| **EURL** / **SASU** | More “company-like”; better for growth / care MRR |
| Foreign / EL entity | If operating from Greece — local counsel required |

Fill: `{{LEGAL_FORM}}`, `{{SIRET}}` in `config/brand.json`.

---

## Chart of accounts — categories needed

1. Revenue — Projects (kits)  
2. Revenue — Care retainers  
3. Revenue — Consulting sessions  
4. Revenue — Add-ons  
5. COGS / subcontractors (design/dev)  
6. Software & SaaS  
7. Hosting & domains  
8. Marketing (later)  
9. Professional fees (legal, accounting)  
10. Bank & payment fees  
11. Taxes / VAT control accounts  
12. Owner draws  

---

## Revenue recognition (practical)

| Type | Recognition |
|------|-------------|
| Kit project | Recognize as milestones: deposit = deferred; remainder at launch (or % completion if you track) |
| Care | Monthly period earned |
| Consulting | On session delivery |

---

## VAT notes (placeholders)

- [ ] Regime: `{{VAT_REGIME}}` (franchise / normal)  
- [ ] Rate applicable: `{{VAT_RATE}}`  
- [ ] Invoice must show HT / TTC when applicable  
- Confirm with accountant before first invoice.

---

## Invoice numbering

```
HA-YYYY-NNNN
```

Example: `HA-2026-0001`  
Never reuse numbers; void with credit note if needed.

---

## Expense + receipt policy

- Keep digital receipt for every OpEx ≥ €20  
- Folder: `clients/_admin/receipts/YYYY-MM/` (local, not git secrets)  
- Tag category from chart above  

---

## Client folder structure (local drive)

```
clients/
  _templates/
  YYYY_ClientName/
    01_audit/
    02_proposal/
    03_contract_payment/
    04_intake/
    05_delivery/
    06_launch/
    07_invoices/
    08_care/
```

Do **not** commit client PII/invoices to git.

---

## Monthly close checklist

- [ ] All invoices issued / numbered  
- [ ] Deposits vs deferred revenue reconciled  
- [ ] Care renewals billed  
- [ ] Expenses categorized + receipts filed  
- [ ] Bank balance vs books  
- [ ] VAT notes for accountant (if due)  
- [ ] Owner draw recorded  

---

## Tools (options — pick one later)

| Option | Notes |
|--------|-------|
| Spreadsheet MVP | Fastest pre-GTM |
| Freebe / Indy-class | Freelancer FR-oriented |
| Pennylane | More company-grade |
| Accountant portal | When volume grows |

---

## Templates

### Payment milestones (default)

| Milestone | % |
|-----------|---|
| Kickoff / signed | 50% |
| Launch | 50% |

Alt: 40/60 if cash-smoother for client.

### Invoice checklist

- [ ] Number HA-YYYY-NNNN  
- [ ] Client legal name + address  
- [ ] Description + period  
- [ ] HT / VAT / TTC if applicable  
- [ ] Payment terms + IBAN placeholder  
- [ ] Link to proposal ID  

### Proposal structure

See procedural SOP-03 + `outreach/proposal-template.md`.
