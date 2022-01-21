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
    'un-used-vars': ['warn', { vars: 'all', args: 'after-used' }]
  }
}
