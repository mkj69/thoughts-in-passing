import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { markdownToHtml, parseThought, plainText } from "./content-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDirectory = path.join(root, "content", "thoughts");
const outputFile = path.join(root, "docs", "data", "thoughts.json");

const thoughts = fs.readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .sort()
  .map((file) => parseThought(path.join(contentDirectory, file)))
  .map(({ body, sourceFile, ...metadata }) => ({
    ...metadata,
    html: markdownToHtml(body),
    text: plainText(body),
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(thoughts, null, 2)}\n`);
console.log(`Built ${thoughts.length} thoughts → ${path.relative(root, outputFile)}`);
