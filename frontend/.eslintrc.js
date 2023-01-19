module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "@ipfonts/eslint-config-custom"],
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
