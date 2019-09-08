import marked from "marked";
import fs from "fs";
import { promisify } from "util";

// Config
const INPUT_FOLDER = "./posts";
const OUTPUT_FOLDER = "./target";
const LEXER_FOLDER = "./lexer";

// Better support for await/async
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

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
    .replace(
      "<!-- INDEX -->",
      `<script>window.index = ${JSON.stringify(json)}</script>`
    );

  await writeFile(filePath, withScripts);
}

/**
 * Extract metadata from the filename
 *
 * @param filename Example `12-05-2014-Porto.md`
 */
function extractMetadata(filename) {
  const date = filename.substring(0, 10); // e.g. 01-01-1970
  const title = filename.substring(11, filename.length - 3); // e.g. Tanzania

  return {
    date,
    title
  };
}
/**
 * Main block
 */
async function main() {
  const files = await readdir(INPUT_FOLDER);

  // Ensure that output folder is there
  await createFolder(OUTPUT_FOLDER);
  await createFolder(LEXER_FOLDER);

  const promises = files.map(async filename => {
    const inputFile = `${INPUT_FOLDER}/${filename}`;
    const markdown = await readFile(inputFile);
    const html = marked(markdown.toString());
    const json = marked.lexer(markdown.toString());

    // Write the HTML and JSON
    console.log(`Creating files for "${inputFile}"`);
    await writeFile(`${OUTPUT_FOLDER}/${filename}.html`, html);
    await writeFile(`${LEXER_FOLDER}/${filename}.json`, JSON.stringify(json));

    // Add to index
    return extractMetadata(filename);
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