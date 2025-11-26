import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import nodePlugin from "eslint-plugin-node";
import securityPlugin from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tsparser,
      ecmaVersion: "latest",
      sourceType: "module",
    },

    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      node: nodePlugin,
      security: securityPlugin,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },

    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Unused imports removal
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Node rules
      "node/no-unsupported-features/es-syntax": "off",
      "node/no-missing-import": "off",

      // Basic style
      quotes: ["error", "single"],
      semi: ["error", "always"],

      // Clean code
      "no-console": "warn",
    },

    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },

  // Disable all stylistic conflicts with Prettier
  eslintConfigPrettier,
];
