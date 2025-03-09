import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Items from '../views/Items.vue';
import Cliente from '../views/Cliente.vue';



const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home},
  { path: '/items', component: Items},
  { path: '/cliente', component: Cliente}
];

export const router = createRouter({
  history: createWebHashHistory(),
 routes
});