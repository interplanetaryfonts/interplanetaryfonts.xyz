module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
