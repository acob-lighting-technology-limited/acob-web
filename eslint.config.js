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
        navigator: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        HTMLElement: 'readonly',
        HTMLDivElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        HTMLFormElement: 'readonly',
        HTMLAnchorElement: 'readonly',
        HTMLSpanElement: 'readonly',
        HTMLLIElement: 'readonly',
        HTMLOListElement: 'readonly',
        HTMLIFrameElement: 'readonly',
        HTMLParagraphElement: 'readonly',
        HTMLHeadingElement: 'readonly',
        HTMLLinkElement: 'readonly',
        SVGSVGElement: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        Event: 'readonly',
        KeyboardEvent: 'readonly',
        TouchEvent: 'readonly',
        WheelEvent: 'readonly',
        PromiseRejectionEvent: 'readonly',
        ErrorEvent: 'readonly',
        IntersectionObserver: 'readonly',
        AbortController: 'readonly',
        DOMException: 'readonly',
        ReadableStream: 'readonly',
        TextEncoder: 'readonly',
        Response: 'readonly',
        RequestInfo: 'readonly',
        RequestInit: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        PerformanceEntry: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        performance: 'readonly',
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        NodeJS: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // General rules
      'no-unused-vars': 'off', // Disable base rule as we use @typescript-eslint/no-unused-vars
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'off', // Disable console warnings for now
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
      // Disable indent rule to avoid stack overflow issues - using Prettier for indentation
      indent: 'off',
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
  {
    // Test files configuration
    files: [
      '**/__tests__/**/*.{js,ts}',
      '**/*.test.{js,ts}',
      '**/*.spec.{js,ts}',
    ],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      'no-constant-binary-expression': 'off',
    },
  },
];
