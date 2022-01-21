module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    quotes: ['warn', 'single'],
    'no-unused-vars': 0,
    'no-trailing-spaces': 0
  }
}
