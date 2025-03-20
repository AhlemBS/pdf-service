module.exports = {
  parser: "@typescript-eslint/parser", // Use TypeScript parser
  parserOptions: {
    ecmaVersion: "latest", // Use the latest ECMAScript features
    sourceType: "module", // Allow ES Modules (important for Node 18)
    project: "./tsconfig.json", // Make sure ESLint works with your tsconfig
  },
  extends: [
    "eslint:recommended", // Use ESLint's recommended rules
    "plugin:@typescript-eslint/recommended", // Use TypeScript's recommended rules
    "plugin:prettier/recommended", // Integrates Prettier with ESLint
  ],
  plugins: ["@typescript-eslint", "prettier"], // Add Prettier and TypeScript plugins
  rules: {
    // Override some rules if necessary
    "prettier/prettier": ["error", { singleQuote: true, semi: false }], // Enforce Prettier formatting
    "@typescript-eslint/no-explicit-any": "off", // Optional: Allow `any` type
    "@typescript-eslint/explicit-module-boundary-types": "off", // Optional: Allow missing return type in functions
  },
  env: {
    node: true, // For Node.js environment
    es2021: true, // Support for ES2021 features
  },
  ignorePatterns: ["node_modules/"], // Ignore node_modules folder
};
