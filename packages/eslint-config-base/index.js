module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["./src/base.js", "./src/react.js", "./src/prettier.js"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
        jsx: true        
    }
  }
};
