import { createRouter, createWebHashHistory } from 'vue-router';
import Factura from '../views/Factura.vue';
import Items from '../views/Items.vue';
import Cliente from '../views/Cliente.vue';
import Login from '../views/Login.vue';
import Home from '../views/home.vue';

const routes = [
  { 
    path: '/', 
    name: 'login',
    component: Login 
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/factura', 
        name: 'factura',
        component: Factura
      },
      {
        path: '/items', 
        name: 'items',
        component: Items
      },
      {
        path: '/cliente', 
        name: 'cliente',
        component: Cliente
      }
    ]
  },
  // Redirect to cliente by default when accessing /home
  {
    path: '/home',
    redirect: '/cliente'
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;