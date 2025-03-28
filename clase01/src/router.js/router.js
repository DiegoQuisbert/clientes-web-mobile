//importamos las funciones para crear el router
import {createRouter, createWebHistory} from "vue-router";

//importamos los componentes para las rutas
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import GlobalChat from '../views/GlobalChat.vue';

//definimos la lista de rutas
const routes= [
    {path: '/',                 component: Home,},
    {path: '/chat-global',      component: GlobalChat,},
    {path: '/iniciar-sesion',   component: Login,},
    {path: '/crear-cuenta',     component: Register,},
];

//creamos el router con createRouter
//esta funcion recibe 1 objeto con al menos 2 propiedades
//1 routes: lista de rutas
//2 history: el modo de historia que queremos para usar para el router, puede ser un createWebHistory() o createWebHostHistory()

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;