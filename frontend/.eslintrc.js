module.exports = {
  extends: ["next/core-web-vitals", "standard", "prettier"],
  settings: {
    next: {
      rootDir: "./frontend/",
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
