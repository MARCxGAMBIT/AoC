import globals from "globals";
import js from "@eslint/js";

console.log(globals);

export default [
  {
    ignores: ["**/template/**/*"],
    languageOptions: { globals: globals.node },
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
