/// <reference types="./types.d.ts" />

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * All packages that leverage t3-env should use this rule
 */
export const restrictEnvAccess = tseslint.config(
	{ ignores: ["**/env.ts"] },
	{
		files: ["**/*.js", "**/*.ts", "**/*.tsx"],
		rules: {
			"no-restricted-properties": [
				"error",
				{
					object: "process",
					property: "env",
					message:
						"Use `import { env } from '~/env'` instead to ensure validated types.",
				},
			],
			"no-restricted-imports": [
				"error",
				{
					name: "process",
					importNames: ["env"],
					message:
						"Use `import { env } from '~/env'` instead to ensure validated types.",
				},
			],
		},
	},
);

export default tseslint.config(
	{
		ignores: [
			"dist",
			".vinxi",
			".wrangler",
			".vercel",
			".netlify",
			".output",
			"build/",
		],
	},
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			eslintConfigPrettier,
			...pluginQuery.configs["flat/recommended"],
			...pluginRouter.configs["flat/recommended"],
		],
	},
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			"react-hooks": reactHooks,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
		},
	},
	reactCompiler.configs.recommended,
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				project: "./tsconfig.json",
				tsconfigRootDir: import.meta.dirname,
			},
		},
		...react.configs["recommended-type-checked"],
	},
	{
		rules: {
			// You can override any rules here
			// "@eslint-react/prefer-read-only-props": "off",
			// "@eslint-react/no-forward-ref": "off",
			// "@eslint-react/no-context-provider": "off",
			// "react-compiler/react-compiler": "warn",
		},
	},
);
