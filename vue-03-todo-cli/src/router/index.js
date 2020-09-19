import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import About from '@/views/About.vue';
import TodoApp from '@/views/TodoApp';

Vue.use(VueRouter);

const routes = [
  //config
  {
    name: 'index',
    path: '/',
    component: Home,
  },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'todos',
    path: '/todos',
    component: TodoApp,
    children: [
      //또 하나의 라우트 객체라고 보면 된다.
      {
        name: 'todos-filter',
        path: ':id', //받을 param의 이름을 적는다.
      },
    ],
  },
];

export default new VueRouter({
  // https://router.vuejs.org/kr/guide/essentials/history-mode.html
  // mode: 'history',
  routes,
});
