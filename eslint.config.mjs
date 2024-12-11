import globals from "globals";
import js from "@eslint/js";

export default [
  {
    ignores: ["**/template/**/*"],
    languageOptions: { globals: globals.browser },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          args: "none",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
];
