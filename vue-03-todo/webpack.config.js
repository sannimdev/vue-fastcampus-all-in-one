const path = require('path'); //nodejs에서 path모듈 자체를 제공하므로 경로를 명시할 필요는 없음
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
  module: {
    ///// https://vue-loader.vuejs.org/guide/#manual-setup 에서 복붙
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        //node_modules 안에 있는 모듈은 굳이 바벨로 해석할 필요가 없음
        exclude: /node_modules/,
        loader: 'babel-loader',
        //최신버전에서는 loader가 아니라 use를 명시하여도 동작한다. (use: 'babel-loader')
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
    ],
    /////
  },
  // plugins만 복수형
  plugins: [new VueLoaderPlugin()],
};
//웹팩은 nodejs 런타임에서 실행

/* 
주의사항

ERROR in ./App.vue?vue&type=style&index=0&id=472cff63&scoped=true&lang=css& (./node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=472cff63&scoped=true&lang=css&) 16:3
Module parse failed: Unexpected token (16:3)
File was processed with these loaders:
 * ./node_modules/vue-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
|
|
> h1 {
|   color: red;
| }
 @ ./App.vue?vue&type=style&index=0&id=472cff63&scoped=true&lang=css& 1:0-146 1:162-165 1:167-310 1:167-310
 @ ./App.vue
 @ ./main.js

 스크립트, 스타일까지 해석할 수 있는 로더를 설정하지 않으면 번들링 시 위와 같은 오류가 발생한다.
*/
