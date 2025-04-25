// Importamos las funciones para crear el router.
import { createRouter, createWebHistory } from "vue-router";

// Importamos los componentes para las rutas.
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import GlobalChat from '../pages/GlobalChat.vue';

// Definimos la lista de rutas.
const routes = [
    { path: '/',                component: Home, },
    { path: '/chat-global',     component: GlobalChat, },
    { path: '/iniciar-sesion',  component: Login, },
    { path: '/crear-cuenta',    component: Register, },
];

// Creamos el router con createRouter.
// Esta función recibe 1 objeto con, al menos, 2 propiedades:
// 1. routes: La lista de rutas.
// 2. history: El modo de historia que queremos usar para el router. Puede ser
//  un createWebHistory() o createWebHashHistory().
const router = createRouter({
    routes,
    history: createWebHistory(),
});

// Exportamos el router.
export default router;