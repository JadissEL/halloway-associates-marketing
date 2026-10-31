# Placeholders — carte unique

Remplir dans **`config/brand.json`** (runtime site) + recopier dans outreach / print / business legal quand pertinent.

| Token | Champ `brand.json` | Exemple / état actuel |
|-------|--------------------|------------------------|
| `{{FOUNDER_NAME}}` | `FOUNDER_NAME` | Jadiss Elantaki |
| `{{CITY}}` | `CITY_FR` / `CITY` | Grèce / Greece |
| `{{EMAIL}}` | `CONTACT_EMAIL` | jadisselantaki@hallowayassociates.com |
| `{{PHONE}}` | `PHONE` | *(vide — à remplir)* |
| `{{INSTAGRAM}}` | `INSTAGRAM` | *(vide — à remplir)* |
| `{{SITE_URL}}` | `SITE_URL` | https://hallowayassociates.com |
| `{{SIRET}}` | *(pas encore)* | à ajouter quand immatriculation |
| `{{LEGAL_FORM}}` | *(pas encore)* | EI / SASU / … |

Env Vite (override optionnel) : voir `.env.example` (`VITE_FOUNDER_NAME`, `VITE_CITY`, `VITE_PHONE`, …).
