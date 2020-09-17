import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import About from '@/views/About.vue';
import TodoApp from '@/views/TodoApp';

Vue.use(VueRouter);

const routes = [
  //config
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/todos',
    component: TodoApp,
  },
];

export default new VueRouter({
  // https://router.vuejs.org/kr/guide/essentials/history-mode.html
  // mode: 'history',
  routes,
});
