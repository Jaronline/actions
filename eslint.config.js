import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(
	{
		ignores: ['.yarn/**', '*/dist/**', 'node_modules']
	},
	{
		files: ['**/*.{js,ts,mts,mjs}'],
		extends: [js.configs.recommended, tseslint.configs.recommended]
	},
	eslintPluginPrettierRecommended
);
