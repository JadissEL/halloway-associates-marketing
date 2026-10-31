# Conflits — résolution identité (2026-10-31)

**Source of truth:** `config/brand.json` + `src/lib/brand.js` + `docs/IDENTITY_FIX.md`.

## Résolu — C1 Nom de marque

| Élément | Valeur canonique |
|---------|------------------|
| Entité / studio | **Halloway Associates** |
| Domaine | **https://hallowayassociates.com** |
| Email | **jadisselantaki@hallowayassociates.com** |
| Fondateur | Jadiss Elantaki |
| Origine | Greek startup |

`LocalPresence` / `localpresence.*` = **legacy only** (internal package/DB names). Not a public brand alias.

## Résolu — C2 Nom du package / offre

| Champ | Valeur |
|-------|--------|
| `PACKAGE_NAME` | Digital Presence Kit |
| `PACKAGE_NAME_FR` | Kit présence digitale |
| Offres | (1) présence digitale sites & apps (2) consulting sessions |

Ancien SKU « Local Presence Kit » retiré des surfaces publiques / outreach / business docs alignés.

## C3 — Périmètre offre

Cœur delivery : présence digitale (site/app + contact/réservation).  
Consulting = deuxième offre (sessions), pas un rename du MVP.

## C4 — README

Racine = Halloway Associates. Business OS = même identité.

## C5 — Outbound OS

Dry-run par défaut. Pas d’activation cold live dans ce lot. Brand defaults alignés Halloway.

## C6 — CRM-lite vs Outbound OS

Inchangé (rôles séparés). Voir `12-operations/`.
