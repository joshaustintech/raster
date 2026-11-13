// Dev-only: keyboard pass (focus visible on every Tab stop, menu/Embed/toggle operable), target sizes, 640px (200% zoom) overflow, lazy/decoding.
// Usage: node scripts/a11y/keyboard.mjs [--dest DIR]  (serves an already-built site; default /tmp/raster-a11y-public)
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname, resolve } from "node:path";
const i = process.argv.indexOf("--dest"); const dest = resolve(i > 0 ? process.argv[i + 1] : "/tmp/raster-a11y-public");
const T = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".woff2": "font/woff2", ".png": "image/png", ".svg": "image/svg+xml" };
const srv = createServer((q, r) => { let f = join(dest, decodeURIComponent(q.url.split("?")[0])); if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html"); if (!existsSync(f)) { r.statusCode = 404; r.end(); return; } r.setHeader("content-type", T[extname(f)] || "x"); r.end(readFileSync(f)); }).listen(1402);
const o = "http://localhost:1402"; const b = await chromium.launch(); let bad = 0; const say = (...a) => { console.log(...a); };
for (const path of ["/", "/notes/", "/notes/queue-latency/", "/about/", "/work/observability/"]) {
  const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage(); await p.goto(o + path, { waitUntil: "networkidle" });
  const stops = []; for (let n = 0; n < 80; n++) { await p.keyboard.press("Tab"); const s = await p.evaluate(() => { const e = document.activeElement; if (!e || e === document.body) return null; const first = !e.dataset.kbSeen; e.dataset.kbSeen = "1"; const cs = getComputedStyle(e); const t = e.tagName === "INPUT" ? (e.closest("label") || e) : e.classList.contains("rs-card__link") ? e.closest(".rs-card") : e; const r = t.getBoundingClientRect(); /* checkbox: label row is the target; card link is stretched over the card */ return { first, id: e.tagName + "." + e.className + (e.dataset.action ? "[" + e.dataset.action + "]" : ""), out: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0, h: Math.round(Math.max(r.height, (getComputedStyle(e, "::after").position === "absolute" && e.classList.contains("rs-post__time")) ? parseFloat(getComputedStyle(e, "::after").height) || 0 : 0)), w: Math.round(r.width), inText: !!e.closest("p, li, figcaption, blockquote") && e.tagName === "A" && !e.classList.contains("rs-btn") && !e.closest("nav, .rs-footer, .rs-card, .rs-post__actions") }; }); if (!s || !s.first) break; stops.push(s); }
  for (const s of stops) { if (!s.out) { bad++; say(`NO FOCUS RING ${path} ${s.id}`); } if (!s.inText && (s.h < 44) && s.w > 0) { bad++; say(`TARGET <44px high ${path} ${s.id} ${s.w}x${s.h}`); } }
  say(`${path}: ${stops.length} tab stops checked`);
}
// Menu + theme toggle + Embed
{
  const c = await b.newContext({ viewport: { width: 375, height: 800 } }); const p = await c.newPage(); await p.goto(o + "/notes/queue-latency/", { waitUntil: "networkidle" });
  await p.focus("summary"); await p.keyboard.press("Enter"); const open = await p.evaluate(() => document.querySelector("details.rs-nav__menu").open); say("menu opens with Enter:", open); if (!open) bad++;
  await p.keyboard.press("Enter"); // toggle shut again
  const t = p.locator("[data-theme-toggle]"); await t.focus(); const before = await p.evaluate(() => document.documentElement.dataset.theme || ""); await p.keyboard.press("Enter"); const after = await p.evaluate(() => document.documentElement.dataset.theme || ""); say("theme toggle cycles:", JSON.stringify(before), "->", JSON.stringify(after), "label:", await t.textContent()); if (before === after) bad++;
  const e = p.locator('[data-action="embed"]'); await e.focus(); await p.keyboard.press("Enter"); const ex = await e.getAttribute("aria-expanded"); const vis = await p.locator(".rs-post__panel").isVisible(); say("Embed toggles panel via keyboard: aria-expanded=" + ex, "visible=" + vis); if (ex !== "true" || !vis) bad++;
  await p.keyboard.press("Enter"); say("Embed closes:", await e.getAttribute("aria-expanded"));
}
// 200% zoom equivalent (640 css px) and 400% (320) overflow on all built pages
{
  const files = []; (function w(d) { for (const f of require_readdir(d)) { const q = join(d, f); statSync(q).isDirectory() ? w(q) : f === "index.html" && files.push(q); } })(dest);
  let n = 0; for (const f of files) { const url = "/" + f.slice(dest.length + 1).replace(/index\.html$/, ""); if (/^\/(embed|tags\/.+\/page|.*\/page\/)/.test(url)) continue; for (const w of [320, 640]) { const p = await (await b.newContext({ viewport: { width: w, height: 800 } })).newPage(); await p.goto(o + url, { waitUntil: "load" }); const d = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth); if (d > 0) { bad++; say(`OVERFLOW ${url} @${w}: +${d}px`); } await p.close(); } n++; }
  say(`overflow checked on ${n} pages at 320 and 640px`);
  const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage(); await p.goto(o + "/work/", { waitUntil: "load" });
  const imgs = await p.evaluate(() => [...document.images].map(i => ({ lazy: i.loading, dec: i.decoding, w: i.getAttribute("width"), h: i.getAttribute("height"), y: i.getBoundingClientRect().top })));
  const noDims = imgs.filter(i => !i.w || !i.h); const noDec = imgs.filter(i => i.dec !== "async"); say(`/work/: ${imgs.length} images, missing width/height: ${noDims.length}, missing decoding=async: ${noDec.length}`); bad += noDims.length + noDec.length;
}
await b.close(); srv.close(); say(bad ? `${bad} problem(s)` : "keyboard/target/zoom pass clean"); process.exit(bad ? 1 : 0);
import { readdirSync } from "node:fs"; function require_readdir(d) { return readdirSync(d); }
