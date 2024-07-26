// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-console": "warn",
      "no-undef": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-destructuring": "error",
      "prefer-template": "error",
      "no-useless-concat": "error",
      "no-useless-return": "error",
      "no-useless-computed-key": "error",
      "no-useless-rename": "error",
      "no-useless-catch": "error",
      "no-useless-escape": "error",
      "no-useless-backreference": "error",
      "no-useless-call": "error",
      "no-useless-constructor": "error",
      "no-unused-vars": ["error", { "varsIgnorePattern": "^_", "argsIgnorePattern": "^_" }],
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
];
