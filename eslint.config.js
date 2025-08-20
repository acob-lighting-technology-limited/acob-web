import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        HTMLElement: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',

      // General rules
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-duplicate-imports': 'error',
      'no-unreachable': 'error',
      'no-unused-expressions': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
    },
  },
  {
    ignores: [
      // Dependencies
      'node_modules/',
      '.pnp',
      '.pnp.js',

      // Production builds
      '.next/',
      'out/',
      'dist/',
      'build/',

      // Sanity
      '.sanity/',
      'sanity/dist/',

      // Environment files
      '.env*',

      // Logs
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',

      // Coverage
      'coverage/',
      '.nyc_output',

      // Cache
      '.eslintcache',
      '.cache',
      '.parcel-cache',

      // Editor files
      '.vscode/',
      '.idea/',

      // OS files
      '.DS_Store',
      'Thumbs.db',
    ],
  },
];
