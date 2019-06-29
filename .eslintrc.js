module.exports = {
  plugins: [
    "prettier"
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  rules: {
    "no-console": [
        0
    ],
    "@typescript-eslint/indent": "ignore",
    "prettier/prettier": "error"
  }
};
