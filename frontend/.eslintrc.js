module.exports = {
  extends: ["next/core-web-vitals", "standard", "prettier"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
