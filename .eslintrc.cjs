module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	parser: '@typescript-eslint/parser',
	extends: [
		'standard-with-typescript',
		'plugin:prettier/recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'prettier/prettier': 2
	},
	plugins: ['@typescript-eslint', '@typescript-prettier']
}
