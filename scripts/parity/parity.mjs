#!/usr/bin/env node
// Dev-only DOM parity check: design-system/reference/*.html vs /styleguide/ built from exampleSite.
// Usage: node scripts/parity/parity.mjs [--no-build] [--dest DIR] [--only Name,Name] [--screenshots]
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, readdirSync, existsSync, statSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const SKIP = new Set(["Cover", "GridSystem"]); // artwork / dev overlay, not production components
const only = opt("--only")?.split(",");
const dest = opt("--dest") ?? path.join(mkdtempSync(path.join(tmpdir(), "raster-parity-")), "site");

if (!args.includes("--no-build"))
  execFileSync("hugo", ["--gc", "--destination", dest], { cwd: path.join(root, "exampleSite"), stdio: "inherit" });

const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png" };
function serve(dir) {
  const s = createServer((req, res) => {
    let p = path.join(dir, decodeURIComponent(req.url.split("?")[0]));
    if (existsSync(p) && statSync(p).isDirectory()) p = path.join(p, "index.html");
    if (!existsSync(p)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { "content-type": mime[path.extname(p)] ?? "application/octet-stream" }).end(readFileSync(p));
  });
  return new Promise((r) => s.listen(0, "127.0.0.1", () => r(s)));
}

// Runs in the page. Normalised tree = tag + sorted class names + sorted attribute names (no values except class), no text.
// Component roots = elements with an rs-* class and no rs-* ancestor other than the layout wrappers.
function inPage() {
  const LAYOUT = new Set(["rs-c", "rs-wrap", "rs-cols", "rs-card-grid", "rs-mono"]);
  const hasRs = (e) => [...e.classList].some((c) => c.startsWith("rs-"));
  const isComp = (e) => hasRs(e) && [...e.classList].some((c) => c.startsWith("rs-") && !LAYOUT.has(c));
  // Context-dependent attributes (current page) and demo scaffolding are ignored; h1-h6 normalise to "h" (levels vary by page context).
  const IGNORE_ATTR = new Set(["class", "style", "aria-current"]);
  const rsOnly = (e) => [...e.classList].filter((c) => c.startsWith("rs-")).sort().join(".");
  const norm = (e) => ({
    t: /^H[1-6]$/.test(e.tagName) ? "h" : e.tagName.toLowerCase(),
    c: rsOnly(e),
    a: [...e.attributes].map((x) => x.name).filter((n) => !IGNORE_ATTR.has(n)).sort().join(","),
    k: [...e.children].filter((k) => !["SCRIPT", "STYLE"].includes(k.tagName)).map(norm),
  });
  const roots = [];
  (function walk(e) {
    if (isComp(e)) { roots.push(norm(e)); return; }
    for (const k of e.children) walk(k);
  })(document.body);
  return roots;
}

const sig = (n) => `${n.t}.${n.c}`;
const str = (n) => `<${n.t} class="${n.c}"${n.a ? " [" + n.a + "]" : ""}>`;
const same = (a, b) => sig(a) === sig(b) && a.a === b.a && a.k.length === b.k.length && a.k.every((k, i) => same(k, b.k[i]));
function firstDiff(a, b, p = "") {
  const here = `${p}/${str(a)}`;
  if (sig(a) !== sig(b) || a.a !== b.a) return `${here}\n      ref: ${str(a)}\n      got: ${str(b)}`;
  for (let i = 0; i < Math.max(a.k.length, b.k.length); i++) {
    if (!a.k[i]) return `${here}: extra child in styleguide ${str(b.k[i])}`;
    if (!b.k[i]) return `${here}: missing child in styleguide ${str(a.k[i])}`;
    const d = firstDiff(a.k[i], b.k[i], here);
    if (d) return d;
  }
  return null;
}

const server = await serve(dest);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const page = await browser.newPage();
const guide = await (async () => { await page.goto(`${base}/styleguide/`); return page.evaluate(inPage); })();
const refDir = path.join(root, "design-system", "reference");
let failed = 0;

for (const f of readdirSync(refDir).filter((f) => f.endsWith(".html")).sort()) {
  const name = f.replace(/\.html$/, "");
  if (SKIP.has(name) || (only && !only.includes(name))) continue;
  await page.goto("file://" + path.join(refDir, f));
  const refs = await page.evaluate(inPage);
  const lines = [];
  for (const r of refs) {
    if (guide.some((g) => same(r, g))) continue;
    const cands = guide.filter((g) => sig(g) === sig(r));
    lines.push(cands.length
      ? `    MISMATCH ${str(r)}: ${firstDiff(r, cands[0])}`
      : `    MISSING  ${str(r)}: no styleguide element with this tag+class`);
  }
  if (lines.length) failed++;
  console.log(`${lines.length ? "FAIL" : "ok  "} ${name} (${refs.length} roots)`);
  lines.forEach((l) => console.log(l));
}

// TODO(issue 21, optional): screenshot diff at 375/768/1280 x light/dark. Needs per-component crop
// (reference root vs matching styleguide element), pixelmatch with a tolerance, and a stable font load wait.
// Enable with --screenshots once implemented; until then it is deliberately a no-op.
if (args.includes("--screenshots")) console.log("screenshot diff: not implemented (see TODO in parity.mjs)");

await browser.close();
server.close();
console.log(failed ? `\n${failed} reference(s) differ` : "\nall references match");
process.exit(failed ? 1 : 0);
