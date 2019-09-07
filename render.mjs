import marked from "marked";
import fs from "fs";
import { promisify } from "util";
import { getOutputFolder, getInputFolder } from "./config.mjs";

// Better support for await/async
const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

/**
 * Main block
 */
async function main() {
  const inputFolder = getInputFolder();
  const outputFolder = getOutputFolder();
  const files = await readdir(inputFolder);

  // Ensure that output folder is there
  mkdir(outputFolder);

  files.forEach(async (filename, index) => {
    const markdown = await readFile(`${inputFolder}/${filename}`);
    const html = marked(markdown.toString());
    const outputFile = `${outputFolder}/${filename}.html`;

    // Write the HTML
    writeFile(outputFile, html);
    console.log("Writting: ", outputFile);
  });
}

try {
  main();
} catch (e) {
  console.error(e);
}
