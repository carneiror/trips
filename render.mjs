import marked from "marked";
import path from "path";
import fs from "fs";
import { promisify } from "util";
import CONFIG from "./config.cjs";

// Environment running: prod or dev
const NODE_ENV = process.env.NODE_ENV;
const BASE_URL = NODE_ENV === "prod" ? CONFIG.URL : "";
const OUTPUT_FOLDER = NODE_ENV === "prod" ? CONFIG.OUTPUT_FOLDER : CONFIG.TARGET_FOLDER;
const INPUT_FOLDER = CONFIG.INPUT_FOLDER;

// Better support for await/async
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const lstat = promisify(fs.lstat);

// Marked options
marked.setOptions({
  baseUrl: BASE_URL
});

/**
 * Filter to match all markdown files
 */
function isMarkdown(filename) {
  return path.extname(filename) === ".md";
}

/**
 * Create output folder
 */
async function createFolder(folder) {
  try {
    await mkdir(folder);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

/**
 * Ouput a string to be injected directly on HTML
 */
async function writeIndex(json) {
  const filePath = `${OUTPUT_FOLDER}/index.html`;
  const content = await readFile(filePath);

  const withScripts = content
    .toString()
    .replace("<!-- INDEX -->", `<script>window.index = ${JSON.stringify(json)}</script>`);

  await writeFile(filePath, withScripts);
}

/**
 * Extract metadata from the filename
 *
 * @param filename Example `12-05-2014-Porto.md`
 */
function extractMetadata(filename, lexer) {
  const date = filename.substring(0, 10); // e.g. 01-01-1970
  const title = filename.substring(11, filename.length - 3); // e.g. Tanzania
  const regex = /.*\((.*(jpg|png))\)/;
  let image = null;

  lexer.find(({ text }) => {
    const result = text && text.match(regex);

    if (result) {
      image = result[1];
      return true;
    }
  });

  return {
    date,
    title,
    filename,
    image: `${BASE_URL}/${image}`
  };
}
/**
 * Main block
 */
async function main() {
  const files = await readdir(INPUT_FOLDER);

  // Ensure that output folder is there
  await createFolder(OUTPUT_FOLDER);

  const promises = files.filter(isMarkdown).map(async filename => {
    const inputFile = `${INPUT_FOLDER}/${filename}`;
    const markdown = await readFile(inputFile);
    const html = marked(markdown.toString());
    const lexer = marked.lexer(markdown.toString());

    // Write the HTML and JSON
    console.log(`Creating files for "${inputFile}"`);
    await writeFile(`${OUTPUT_FOLDER}/${filename}.html`, html);

    // Add to index
    return extractMetadata(filename, lexer);
  });

  // Write index
  const index = await Promise.all(promises);
  await writeIndex(index);
}

try {
  main();
} catch (e) {
  console.error(e);
}
