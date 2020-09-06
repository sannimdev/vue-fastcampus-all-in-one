module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['standard', 'plugin:vue/essential'],
  plugins: ['vue'],
  //0은 사용하지 않음, 1은 오류 메시지 표시, 2는 경고 메시지 표시
  rules: {
    'no-new': 0,
    'spaced-comment': 0,
    'comma-dangle': 0,
    semi: 0,
    'no-trailing-spaces': 0,
    'brace-style': 0,
  },
};
