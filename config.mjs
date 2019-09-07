const CONFIG = {
  inputFolder: "./posts",
  outputFolder: "./site"
};

export function getOutputFolder() {
  return CONFIG.outputFolder;
}

export function getInputFolder() {
  return CONFIG.inputFolder;
}
