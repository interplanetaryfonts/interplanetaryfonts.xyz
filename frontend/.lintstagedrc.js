const path = require("path");

const buildEslintCommand = (filenames) => {
  return `pnpm --filter frontend run lint --file ${filenames
    .map((f) => `./${path.relative(__dirname, f)}`)
    .join(" --file ")}`;
};

module.exports = {
  "*.{js,jsx}": buildEslintCommand,
  "*": "pnpm prettier:frontend",
};
