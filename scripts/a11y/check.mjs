// Dev-only acceptance checks: axe, console errors, third-party requests, 320px overflow.
// Usage: node scripts/a11y/check.mjs [--dest DIR] [--no-build] [--port 1399]
import { chromium } from "playwright";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, extname, resolve } from "node:path";
const require = createRequire(import.meta.url);
const axeSrc = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const dest = resolve(arg("--dest", "/tmp/raster-a11y-public"));
const port = Number(arg("--port", 1399));
if (!process.argv.includes("--no-build"))
  execSync(`hugo --gc --minify --cleanDestinationDir -s exampleSite -d ${dest}`, { stdio: "inherit" });
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png", ".xml": "application/xml", ".json": "application/json", ".txt": "text/plain" };
const server = createServer((q, r) => {
  let p = decodeURIComponent(q.url.split("?")[0]); let f = join(dest, p);
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f)) { f = join(dest, "404.html"); r.statusCode = 404; }
  r.setHeader("content-type", types[extname(f)] || "application/octet-stream"); r.end(readFileSync(f));
}).listen(port);
const origin = `http://localhost:${port}`;
const pages = ["/", "/work/", "/work/observability/", "/writing/", "/writing/the-long-incident/", "/notes/", "/notes/queue-latency/", "/notes/queue-latency/embed/", "/about/", "/styleguide/", "/tags/", "/missing-page/"];
const extra = process.argv.includes("--pages") ? arg("--pages").split(",") : [];
const browser = await chromium.launch();
let fail = 0;
for (const path of [...pages, ...extra]) for (const theme of ["light", "dark"]) for (const w of [375, 768, 1280]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: theme });
  const page = await ctx.newPage(); const problems = [];
  page.on("console", m => { if (m.type() === "error" && !/404/.test(m.text() + path)) problems.push("console: " + m.text()); });
  page.on("pageerror", e => problems.push("pageerror: " + e.message));
  page.on("request", r => { if (!r.url().startsWith(origin) && !r.url().startsWith("data:") && !r.url().startsWith("blob:")) problems.push("third-party: " + r.url()); });
  await page.goto(origin + path, { waitUntil: "networkidle" });
  await page.evaluate(axeSrc + ";0");
  const res = await page.evaluate(() => axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } }));
  // Documented exceptions (reference markup is mandated): footer h3 groups can follow an h1 directly; unlabeled asides repeat.
  for (const v of res.violations) {
    if (v.id === "heading-order" && v.nodes.every(n => n.target.join(" ").includes("h3") || n.html.startsWith("<h3"))) continue;
    if (v.id === "landmark-unique" && v.nodes.every(n => n.html.startsWith("<aside"))) continue;
    problems.push(`axe ${v.id} (${v.impact}): ${v.nodes.slice(0, 3).map(n => n.target.join(" ")).join(" | ")}`); }
  if (w === 375) {
    await page.setViewportSize({ width: 320, height: 800 });
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > 0) problems.push(`horizontal scroll at 320px: +${o}px`);
    const signals = await page.evaluate(() => document.querySelectorAll(".rs-btn--signal, .rs-tag--signal").length);
    if (signals > 1) problems.push(`signal count ${signals}`);
    const inl = await page.evaluate(() => [...document.querySelectorAll("[style]")].map(e => e.getAttribute("style")).filter(s => !/^--focal:/.test(s)));
    if (inl.length) problems.push("inline styles: " + inl.slice(0, 3).join(" ; "));
  }
  if (problems.length) { fail++; console.log(`FAIL ${path} ${theme} ${w}\n  ` + problems.join("\n  ")); }
  await ctx.close();
}
await browser.close(); server.close();
console.log(fail ? `${fail} failing combinations` : "all clean"); process.exit(fail ? 1 : 0);
