import react from "@eslint-react/eslint-plugin";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";
import baseConfig from "./base.js";

export default tseslint.config(
	...baseConfig,
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
		extends: [
			...pluginQuery.configs["flat/recommended"],
			...pluginRouter.configs["flat/recommended"],
		],
	},
);
