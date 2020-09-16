// node의 path 모듈을 가져옵니다.
const path = require('path');

module.exports = {
  // 웹팩 설정
  configureWebpack: {
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    resolve: {
      alias: {
        // '@'는 현재 프로젝트의 client/src/까지의 최종 경로를 의미합니다.
        '@': path.join(__dirname, 'src'),
        scss: path.join(__dirname, 'src/scss'),
      },
    },
  },
};

//https://velog.io/@skyepodium/vue-cli-3.x-%EC%9D%B4%EC%83%81%EC%97%90%EC%84%9C-import-%EA%B2%BD%EB%A1%9C-alias-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-2xk4z3ze57
