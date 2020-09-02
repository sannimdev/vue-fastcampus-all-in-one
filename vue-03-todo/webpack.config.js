const path = require('path'); //nodejs에서 path모듈 자체를 제공하므로 경로를 명시할 필요는 없음
module.exports = {
  //진입점 (entry)
  //프로젝트가 돌아가기 위해 가장 먼저 실행되어야 하는 파일
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  //결과물에 대한 설정
  output: {
    // filename: 'app.js', 또는
    filename: '[name].js', //app.js ([name]은 진입점의 app이라는 키 이르믕ㄹ 참조)
    path: path.join(__dirname, 'dist'),
  },
  module: {},
  // plugins만 복수형
  plugins: [],
};
//웹팩은 nodejs 런타임에서 실행
