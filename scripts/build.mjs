import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markdownToHtml, parseThought, plainText } from "./content-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "thoughts");
const translationsDirectory = path.join(root, "content", "translations");
const outputFile = path.join(root, "docs", "data", "thoughts.json");

const translationsBySlug = new Map();

if (fs.existsSync(translationsDirectory)) {
  for (const file of fs.readdirSync(translationsDirectory).filter((name) => name.endsWith(".md")).sort()) {
    const { body, slug, language, title, excerpt } = parseThought(path.join(translationsDirectory, file));
    const translations = translationsBySlug.get(slug) || {};
    translations[language] = {
      language,
      title,
      excerpt,
      html: markdownToHtml(body),
      text: plainText(body),
    };
    translationsBySlug.set(slug, translations);
  }
}

const thoughts = fs.readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .sort()
  .map((file) => parseThought(path.join(contentDirectory, file)))
  .map(({ body, sourceFile, ...metadata }) => {
    const translations = translationsBySlug.get(metadata.slug) || {};
    return {
      ...metadata,
      html: markdownToHtml(body),
      text: plainText(body),
      ...(Object.keys(translations).length ? { translations } : {}),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(thoughts, null, 2)}\n`);
console.log(`Built ${thoughts.length} thoughts → ${path.relative(root, outputFile)}`);
