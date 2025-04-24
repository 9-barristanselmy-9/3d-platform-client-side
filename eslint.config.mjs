import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    plugins: ["@typescript-eslint"],
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",

      "@typescript-eslint/ban-types": [
        "error",
        {
          types: {
            object: false,
            "{}": false,
          },
          extendDefaults: true,
        },
      ],
    },
  }),
];

export default eslintConfig;
