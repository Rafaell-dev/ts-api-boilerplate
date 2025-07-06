import { defineConfig, globalIgnores } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([globalIgnores(['**/dist', '**/node_modules']), {
	extends: compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	),

	plugins: {
		'@typescript-eslint': typescriptEslint,
		prettier,
	},

	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node,
		},

		parser: tsParser,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	rules: {
		indent: ['error', 'tab', {
			SwitchCase: 1,
		}],

		
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'never',
		}],
		
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-cond-assign': 'off',
		'prettier;prettier': 'error',
	},
}]);