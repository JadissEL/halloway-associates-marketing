#!/usr/bin/env node
/**
 * Halloway Associates — lightweight repo governance check.
 * Usage: node scripts/verify-project.mjs [--skip-build]
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
const skipBuild = process.argv.includes('--skip-build')

const REQUIRED_DOCS = [
  'docs/CONTROL_PLANE.md',
  'docs/IDENTITY.md',
  'docs/ARCHITECTURE.md',
  'docs/INTEGRATIONS.md',
  'docs/AUDIT_MULTI_AGENT.md',
  'docs/KNOWN_CONFLICTS_RESOLVED.md',
  'docs/DEFINITION_OF_DONE.md',
  'docs/business/LAUNCH_SWITCH.md',
  'docs/business/ICP_100_NICHES.md',
  'docs/business/OFFER_AND_BEACHHEAD.md',
  'docs/business/14_OPEN_DECISIONS.md',
  'docs/OUTREACH_COPY_INFLUENCERS.md',
  'docs/OUTREACH_FOLLOWUPS.md',
  'docs/FOLLOWUP_CHEATSHEET.md',
  'docs/PRE_GTM_VERDICT.md',
  'docs/EMAIL_DNS_PLAN.md',
  'docs/business/checklists/pre_gtm_readiness.md',
  'outreach/emails/EN-influencer.md',
  'outreach/emails/FR-influencer.md',
  'outreach/followups/influencers/e1_intro.md',
  'outreach/followups/influencers/e5_breakup.md',
  'outreach/followups/influencers/reply_interested.md',
  'outbound-os/docs/FOLLOWUP_OPS.md',
  'AGENTS.md',
  'README.md',
  'config/brand.json',
  'config/offers.json',
  'config/niches.json',
  'docs/business/OFFERS_AND_DISCOUNTS.md',
  'docs/OFFER_CHEATSHEET.md',
  '.env.example',
  'outbound-os/.env.example',
]

const EXPECTED_BRAND = {
  COMPANY_NAME: 'Halloway Associates',
  SITE_URL: 'https://hallowayassociates.com',
  CONTACT_EMAIL: 'jadisselantaki@hallowayassociates.com',
}

/** Banned leftovers on public / brand surfaces (not _archive, not historical docs notes). */
const BANNED = [
  /localpresence\.example/i,
  /@localpresence\./i,
  /yourname@/i,
  /example@example\.com/i,
  /\bacme\.com\b/i,
]

const SCAN_ROOTS = ['src', 'public', 'config', 'outreach', 'index.html']
const SCAN_EXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.json', '.html', '.md', '.css', '.svg'])

let failures = 0
let warnings = 0

function fail(msg) {
  console.error(`FAIL  ${msg}`)
  failures++
}
function warn(msg) {
  console.warn(`WARN  ${msg}`)
  warnings++
}
function ok(msg) {
  console.log(`OK    ${msg}`)
}

function readJson(rel) {
  return JSON.parse(readFileSync(join(ROOT, rel), 'utf8'))
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

console.log('=== Halloway verify-project ===\n')

/* 1. Required docs */
console.log('--- Required docs ---')
for (const rel of REQUIRED_DOCS) {
  if (existsSync(join(ROOT, rel))) ok(rel)
  else fail(`missing ${rel}`)
}

/* 2. Brand */
console.log('\n--- Brand config ---')
try {
  const brand = readJson('config/brand.json')
  for (const [k, v] of Object.entries(EXPECTED_BRAND)) {
    if (brand[k] === v) ok(`${k} = ${v}`)
    else fail(`${k}: expected "${v}", got "${brand[k]}"`)
  }
  if (!Array.isArray(brand.OFFERS) || brand.OFFERS.length < 2) {
    fail('OFFERS must list at least 2 offers')
  } else ok(`OFFERS (${brand.OFFERS.length})`)
  const markets = brand.TARGET_MARKETS
  if (!Array.isArray(markets) || markets.length < 1) {
    fail('TARGET_MARKETS must be a non-empty array')
  } else if (!markets.includes('Greece')) {
    fail('TARGET_MARKETS must include Greece (HQ)')
  } else ok(`TARGET_MARKETS (${markets.length} countries)`)
  if (brand.COMMERCIAL_LOCK === 'OFFER_BEACHHEAD_LOCKED') ok('COMMERCIAL_LOCK = OFFER_BEACHHEAD_LOCKED')
  else fail(`COMMERCIAL_LOCK expected OFFER_BEACHHEAD_LOCKED, got ${brand.COMMERCIAL_LOCK}`)
  if (brand.FLAGSHIP_PRODUCT_NAME === 'Influencer Digital Kit') ok('FLAGSHIP_PRODUCT_NAME locked')
  else fail(`FLAGSHIP_PRODUCT_NAME drift: ${brand.FLAGSHIP_PRODUCT_NAME}`)
  const bh = brand.BEACHHEAD || {}
  if (bh.country === 'Greece' && bh.city === 'Athens') ok('BEACHHEAD = Athens, Greece')
  else fail(`BEACHHEAD expected Athens/Greece, got ${bh.city}/${bh.country}`)
  const later = brand.TARGET_MARKETS_LATER
  if (Array.isArray(later) && later.length >= 10 && !later.includes('Greece')) {
    ok(`TARGET_MARKETS_LATER (${later.length}, Greece excluded)`)
  } else fail('TARGET_MARKETS_LATER must list later countries and exclude Greece')
  const pr = brand.PRICING || {}
  if (pr.depositPercent === 50 && pr.kitMin === 790 && pr.consultingSessionEur === 150) {
    ok('PRICING deposit 50% · kit 790+ · consulting €150')
  } else fail('PRICING lock mismatch (deposit/kitMin/consulting)')
  const offers = readJson('config/offers.json')
  if (offers.currency === 'EUR' && offers.deposit_percent_default === 50) ok('offers.json EUR · deposit 50%')
  else fail('offers.json deposit/currency mismatch')
  const pro = (offers.tiers || []).find((t) => t.id === 'pro')
  if (pro?.recommended && pro.price_floor_eur >= 790) ok('offers Pro recommended + floor')
  else fail('offers.json Pro tier missing/not recommended')
  if (offers.discount_stack_cap_percent === 20) ok('discount stack cap 20%')
  else fail('discount_stack_cap_percent expected 20')
} catch (e) {
  fail(`brand.json: ${e.message}`)
}

/* 3. Niches canonical */
console.log('\n--- ICP niches ---')
try {
  const niches = readJson('config/niches.json')
  const count = niches.niches?.length ?? 0
  if (count === 100) ok(`config/niches.json has 100 niches`)
  else fail(`expected 100 niches, got ${count}`)
  if (niches.flagship_id === 'influencers') ok('flagship_id = influencers')
  else fail(`flagship_id expected influencers, got ${niches.flagship_id}`)
  if (niches.brand === 'Halloway Associates') ok('niches.brand = Halloway Associates')
  else fail(`niches.brand drift: ${niches.brand}`)
  const enriched = niches.niches.filter(
    (n) => Array.isArray(n.ai_services) && n.ai_services.length && Array.isArray(n.third_party_connections) && n.third_party_connections.length,
  )
  if (enriched.length === 100) ok('all 100 niches have ai_services + third_party_connections')
  else fail(`enrichment incomplete: ${enriched.length}/100 niches with AI + third-party fields`)
  if (existsSync(join(ROOT, 'business/04-icp'))) {
    fail('duplicate ICP tree business/04-icp still present — archive it')
  } else ok('no competing business/04-icp tree')
} catch (e) {
  fail(`niches.json: ${e.message}`)
}

/* 4. Launch switch OFF */
console.log('\n--- Outreach lock ---')
try {
  const launch = readFileSync(join(ROOT, 'docs/business/LAUNCH_SWITCH.md'), 'utf8')
  if (/SWITCH\s*=\s*OFF/i.test(launch)) ok('LAUNCH_SWITCH = OFF')
  else fail('LAUNCH_SWITCH is not OFF')
} catch (e) {
  fail(`LAUNCH_SWITCH: ${e.message}`)
}

/* 5. Banned string scan */
console.log('\n--- Banned leftovers ---')
let bannedHits = 0
for (const rootName of SCAN_ROOTS) {
  const abs = join(ROOT, rootName)
  const files = existsSync(abs) && statSync(abs).isFile() ? [abs] : walk(abs)
  for (const file of files) {
    const ext = file.slice(file.lastIndexOf('.'))
    if (!SCAN_EXT.has(ext)) continue
    let text
    try {
      text = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    for (const re of BANNED) {
      if (re.test(text)) {
        bannedHits++
        fail(`banned pattern ${re} in ${relative(ROOT, file)}`)
      }
    }
    // Public LocalPresence brand (not package.json internal)
    if (/LocalPresence/.test(text) && !file.includes('IDENTITY') && rootName !== 'outreach') {
      // allow none in src/public/config
      if (['src', 'public', 'config'].includes(rootName) || rootName === 'index.html') {
        bannedHits++
        fail(`LocalPresence on public path: ${relative(ROOT, file)}`)
      }
    }
  }
}
if (bannedHits === 0) ok('no banned leftovers in scanned public paths')

/* 6. Env strategy presence */
console.log('\n--- Env examples ---')
ok('.env.example (marketing)')
ok('outbound-os/.env.example (OS)')
if (existsSync(join(ROOT, 'outbound-os/server/.env.example'))) {
  ok('outbound-os/server/.env.example')
} else {
  warn('no outbound-os/server/.env.example (copy from outbound-os/.env.example is documented)')
}

/* 7. Builds */
console.log('\n--- Builds ---')
if (skipBuild) {
  warn('skipped builds (--skip-build)')
} else {
  const mkt = spawnSync('npm', ['run', 'build'], { cwd: ROOT, encoding: 'utf8', shell: true })
  if (mkt.status === 0) ok('marketing npm run build')
  else fail(`marketing build failed:\n${(mkt.stderr || mkt.stdout || '').slice(-800)}`)

  const os = spawnSync('npm', ['run', 'build'], {
    cwd: join(ROOT, 'outbound-os'),
    encoding: 'utf8',
    shell: true,
  })
  if (os.status === 0) ok('outbound-os npm run build')
  else fail(`outbound-os build failed:\n${(os.stderr || os.stdout || '').slice(-800)}`)
}

console.log('\n=== Summary ===')
console.log(`failures=${failures} warnings=${warnings}`)
if (failures > 0) {
  console.error('VERDICT: CONTROL_PARTIAL (verify failed)')
  process.exit(1)
}
console.log('VERDICT: verify passed (see DEFINITION_OF_DONE for CONTROL_ESTABLISHED)')
process.exit(0)
