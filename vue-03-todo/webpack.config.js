const path = require('path'); //nodejs에서 path모듈 자체를 제공하므로 경로를 명시할 필요는 없음
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge'); // merge가 아니라 {merge}
//destructuring
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('@babel/polyfill');

module.exports = {};
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

/*
  devtool: eval
  빌드시간을 최대한 축소하고 디버깅이 가능한 방식으로 생성
  개발용으로 적합
  그러나 파일의 용량이 커질 수 있음
  devtool: cheap-modeul-source-map
  용량의 최소화, 제품화할 때 가장 좋은 옵션
  그러나 디버깅하기가 어렵다는 단점을 지님
*/
//환경변수와 옵션(개발용인지 배포용인지)
module.exports = (env, opts) => {
  const config = {
    //중복되는 옵션 정의
    resolve: {
      extensions: ['.vue', '.js'],
    },
    //진입점 (entry)
    //프로젝트가 돌아가기 위해 가장 먼저 실행되어야 하는 파일
    entry: {
      app: ['@babel/polyfill', path.join(__dirname, 'main.js')],
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
          use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.scss$/,
          use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
      ],
      /////
    },
    // plugins만 복수형
    plugins: [
      new VueLoaderPlugin(),
      //dist폴더에 합쳐줄 것임
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'index.html'),
      }),
      new CopyPlugin({
        /*
      강의내용과 다른 부분. 업데이트가 되었나 봄.
      CopyPlugin에 객체가 있고
      그 안에 patterns라는 항목 안에 배열의 원소로서  from, to가 담긴객체가 존재함
      */
        patterns: [
          {
            from: 'assets/',
            //'' 빈 문자열 값은 루트 디렉터리 값을 의미함
            to: '',
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
  };
  //개발용 옵션
  if (opts.mode === 'development') {
    return merge(config, {
      // 추가 개발용 옵션
      devtool: 'eval',
      devServer: {
        //npm run dev를 실행할 때 바로 브라우저를 오픈하여 실행하겠다는 의미.
        open: false,
        //HMR(수정사항이 바로 반영되어 브라우저에서 바로 확인할 수 있음, hot은 기본값이 true이다.)
        hot: true,
      },
    });
  }
  //배포용 옵션
  else {
    return merge(config, {
      // 추가 배포용 옵션
      devtool: 'chear-module-source-map',
      plugins: [
        //output에 설정한 경로를 삭제하고 시작
        new CleanWebpackPlugin(),
      ],
    });
  }
};
