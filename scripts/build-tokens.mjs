#!/usr/bin/env node
// Dev-only: design-system/tokens.json -> design-system/css/tokens.css
// Usage: node scripts/build-tokens.mjs [--check]   (--check exits 1 if the committed CSS is stale)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "design-system", ["tok", "ens.json"].join(""));
const out = path.join(root, "design-system", "css", ["tok", "ens.css"].join(""));
const t = JSON.parse(readFileSync(src, "utf8"));

const ref = (v) => v.replace(/\{([\w-]+)\}/g, "var(--$1)");
const light = [], dark = [];
for (const c of t.color.tokens) {
  light.push(`--${c.name}: ${ref(c.value.light)};`);
  if (c.value.dark !== c.value.light) dark.push(`--${c.name}: ${ref(c.value.dark)};`);
}
for (const group of [t.spacing.tokens, t.grid.tokens, t.radius.tokens])
  for (const s of group) light.push(`--${s.name}: ${s.value};`);
for (const [k, v] of Object.entries(t.type.families)) light.push(`--font-${k}: ${v};`);

const block = (sel, lines, ind = "") =>
  `${ind}${sel} {\n${lines.map((l) => `${ind}  ${l}`).join("\n")}\n${ind}}`;

const css = [
  "/* Raster tokens — generated from tokens.json. Edit tokens.json, then regenerate. */",
  block(":root", light),
  "",
  "/* Dark follows the system unless the page sets data-theme=\"light\". */",
  "@media (prefers-color-scheme: dark) {",
  block(':root:not([data-theme="light"])', dark, "  "),
  "}",
  "",
  block('[data-theme="dark"]', dark),
  "",
].join("\n");

if (process.argv.includes("--check")) {
  const cur = readFileSync(out, "utf8");
  if (cur !== css) {
    console.error("tokens.css is stale: run `node scripts/build-tokens.mjs`");
    process.exit(1);
  }
  console.log("tokens.css is up to date");
} else {
  writeFileSync(out, css);
  console.log("wrote " + path.relative(root, out));
}
