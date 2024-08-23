
import { ESLint } from "eslint";

module.exports = {
    [

        {
            files: ["*.ts", "*.tsx", "*.js"],
            languageOptions: {
                parser: "@typescript-eslint/parser",
                parserOptions: {
                    ecmaVersion: 2020,
                    sourceType: "module",
                },
            },
            plugins: {
      "@typescript-eslint": "@typescript-eslint/eslint-plugin",
      prettier: "eslint-plugin-prettier",
    },
    rules: {
        ...ESLint.recommended,
        ...{
            "@typescript-eslint/no-unused-vars": ["error"],
            "prettier/prettier": ["error"],
        },
    },
    extends: [
        "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
    ],
  },
]
} 