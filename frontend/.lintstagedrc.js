const path = require("path");

const buildEslintCommand = (filenames) => {
  return `pnpm --filter frontend run lint --file ${filenames
    .map((f) => `./${path.relative(__dirname, f)}`)
    .join(" --file ")}`;
};

const buildPrettierCommand = (filenames) => {
  return `pnpm --filter frontend run prettier ${filenames.map(
    (f) => `./${path.relative(__dirname, f)}`
  )}`;
};

module.exports = {
  "*": "pnpm prettier:frontend",
  "*.{js,jsx}": buildEslintCommand,
};
