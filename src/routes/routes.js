import { createRouter, createWebHashHistory } from 'vue-router';
import Factura from '../views/Factura.vue';
import Items from '../views/Items.vue';
import Cliente from '../views/Cliente.vue';
import Login from '../views/login.vue';



const routes = [
  { path: '/', component: Login },
  { path: '/factura', component: Factura},
  { path: '/items', component: Items},
  { path: '/cliente', component: Cliente}
];

export const router = createRouter({
  history: createWebHashHistory(),
 routes
});