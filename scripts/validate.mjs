import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { maturities, parseThought } from "./content-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "thoughts");
const translationsDirectory = path.join(root, "content", "translations");
const files = fs.readdirSync(contentDirectory).filter((file) => file.endsWith(".md")).sort();
const entries = files.map((file) => parseThought(path.join(contentDirectory, file)));
const translations = fs.existsSync(translationsDirectory)
  ? fs.readdirSync(translationsDirectory).filter((file) => file.endsWith(".md")).sort().map((file) => parseThought(path.join(translationsDirectory, file)))
  : [];
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

const translationKeys = new Set();
for (const translation of translations) {
  for (const field of ["title", "slug", "language", "excerpt"]) {
    if (!(field in translation)) errors.push(`${translation.sourceFile}: missing ${field}`);
  }
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(translation.language || "")) errors.push(`${translation.sourceFile}: invalid language`);
  if (!slugs.has(translation.slug)) errors.push(`${translation.sourceFile}: source slug does not exist: ${translation.slug}`);
  if ((translation.title || "").length > 120) errors.push(`${translation.sourceFile}: title exceeds 120 characters`);
  if ((translation.excerpt || "").length > 280) errors.push(`${translation.sourceFile}: excerpt exceeds 280 characters`);
  const key = `${translation.slug}:${translation.language}`;
  if (translationKeys.has(key)) errors.push(`${translation.sourceFile}: duplicate translation ${key}`);
  translationKeys.add(key);
}

for (const entry of entries) {
  if (entry.language && !/^[a-z]{2}(?:-[A-Z]{2})?$/.test(entry.language)) errors.push(`${entry.sourceFile}: invalid language`);
  if (entry.defaultLanguage) {
    const baseLanguage = entry.language || "en";
    if (entry.defaultLanguage !== baseLanguage && !translationKeys.has(`${entry.slug}:${entry.defaultLanguage}`)) {
      errors.push(`${entry.sourceFile}: defaultLanguage has no matching translation: ${entry.defaultLanguage}`);
    }
  }
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

console.log(`Validated ${entries.length} thought files, ${translations.length} translations, and their link graph.`);
