export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        IntersectionObserver: "readonly",
        URL: "readonly"
      }
    },
    rules: {
      "no-unused-vars": ["error", { "caughtErrors": "none" }],
      "no-undef": "error",
      "no-redeclare": "error",
      "eqeqeq": "error",
      "no-console": "off"
    }
  }
];
