import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { maturities, parseThought } from "./content-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "thoughts");
const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md")).sort();
const entries = files.map((file) => parseThought(path.join(contentDirectory, file)));
const required = ["title", "slug", "date", "maturity", "tags", "related", "excerpt", "placeholder"];
const errors = [];
const slugs = new Set();

for (const entry of entries) {
  for (const field of required) {
    if (!(field in entry)) errors.push(`${entry.sourceFile}: missing ${field}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug || "")) errors.push(`${entry.sourceFile}: invalid slug`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date || "") || Number.isNaN(Date.parse(`${entry.date}T00:00:00Z`))) errors.push(`${entry.sourceFile}: invalid date`);
  if (!maturities.has(entry.maturity)) errors.push(`${entry.sourceFile}: invalid maturity`);
  if (!Array.isArray(entry.tags) || !entry.tags.length) errors.push(`${entry.sourceFile}: tags must be a non-empty array`);
  if (!Array.isArray(entry.related)) errors.push(`${entry.sourceFile}: related must be an array`);
  if (typeof entry.placeholder !== "boolean") errors.push(`${entry.sourceFile}: placeholder must be true or false`);
  if ((entry.excerpt || "").length > 280) errors.push(`${entry.sourceFile}: excerpt exceeds 280 characters`);
  if (slugs.has(entry.slug)) errors.push(`${entry.sourceFile}: duplicate slug ${entry.slug}`);
  slugs.add(entry.slug);
}

for (const entry of entries) {
  for (const related of entry.related || []) {
    if (!slugs.has(related)) errors.push(`${entry.sourceFile}: related slug does not exist: ${related}`);
    if (related === entry.slug) errors.push(`${entry.sourceFile}: an entry cannot relate to itself`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${entries.length} thought files and their link graph.`);
