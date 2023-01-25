module.exports = {
    settings: {
        react: {
            version: 'detect' 
        }
    },
    extends: [
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    "rules": {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
};