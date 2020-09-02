import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  //   render(createElement) {
  //     return createElement(App);
  //   },
  render: (h) => h(App),
});

// main.js: 진입점으로 사용되는 파일로서 App.vue를 연결할 것임.
// App.js는 모든 앱을 아우르는 최상위 컴포넌트로써 사용될 것임.

// console.log('Hello webpack!');
