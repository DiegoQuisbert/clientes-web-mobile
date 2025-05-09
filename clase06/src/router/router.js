// Importamos las funciones para crear el router.
import { createRouter, createWebHistory } from "vue-router";

// Importamos los componentes para las rutas.
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import GlobalChat from '../pages/GlobalChat.vue';
import MyProfile from '../pages/MyProfile.vue';
import { suscribeToAuthUserChanges } from "../services/auth";

// Definimos la lista de rutas.
const routes = [
    { path: '/',                component: Home, },
    { path: '/iniciar-sesion',  component: Login, },
    { path: '/crear-cuenta',    component: Register, },
    { path: '/chat-global',     component: GlobalChat, meta: {requiresAuth: true, }, },
    { path: '/mi-perfil',       component: MyProfile, meta: {requiresAuth: true, }, },
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

//pedimos la data de usuario autenticado
let user = {
    id: null,
    email: null,
}

suscribeToAuthUserChanges(newUserData => user = newUserData);

// Registramos un "guard" para que si una ruta requiere de autenticación y el usuario no lo está, lo redireccione al login
//recibe un callback que se ejecuta antes del cambio o del acceso a cualquier ruta, este callback recibe como parámetros, las rutas a las que vamos y als que vinimos
//Sino, podemos retornar un valor falsy para cancelar la navegación o un valor donde queramos redireccionar al usuario
router.beforeEach((to, from)=>{
    if(to.meta.requiresAuth && user.id === null) {
        return '/iniciar-sesion';
    }
});

// Exportamos el router.
export default router;