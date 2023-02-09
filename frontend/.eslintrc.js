module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "@ipfonts/eslint-config-custom"],
  settings: {
    next: {
      rootDir: "./frontend/",
    },
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "@": "./",
        },
        packages: ["frontend/*"],
        extensions: [".js", ".jsx"],
      },
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  // TODO - undisable the following rules one PR at a time
  // while fixing the lint issues
  rules: {
    "react/prop-types": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/mouse-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
  },
};
