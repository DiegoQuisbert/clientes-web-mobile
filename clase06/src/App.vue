<script>
// Importamos el componente.
import Home from './pages/Home.vue';
import {logout, suscribeToAuthUserChanges } from './services/auth';

// En la Options API, el script de los componentes debe exportar por default un
// objeto de configuración del componente.
export default {
    // El name nos permite asociar un nombre al componente. Es opcional, y debería
    // ser el mismo que el nombre del archivo (sin el ".vue").
    name: 'App',

    // En la Options API, tenemos que declarar dentro el componente los otros
    // componentes que vamos a utilizar.
    components: { Home },
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
        }
        
    },
    methods: {
        handleLogout() {
            logout();
            //Repaso: cuando agregamos vue router en nuestra app, crea en todos los componentes, 2 propiedades, $router y $route. $router es una referenciadel objeto Router y $route una referencia del objeto ruta.
            this.$router.push('/iniciar-sesion');
        }
    },
    async mounted() {
        // this.user = await getCurrentAuthUser();
        //nos sucribimos a los cambios del usuario autenticado
        suscribeToAuthUserChanges(newUserData => this.user = newUserData);
    },
}
</script>

<template>
    <!-- 
    Tailwind sigue, en la mayoría de los casos, una serie de convenciones para los
    nombres de sus clases:
    - Para algunas clases que tienen valores prestablecidos y "únicos", Tailwind
    utiliza el nombre del valor como nombre de la clase. Ejemplo: display.
    Si ponemos:
        .flex                   => display: flex;
        .inline-block           => display: inline-block;
        .grid                   => display: grid;
    - La mayoría de los estilos que aceptan valores arbitrarios siguen el formato 
    de: estilo-valor. Ejemplo: padding, color, background-color, margin, etc.
    Si ponemos:
        .p-4                    => padding: 1rem;
        .mb-2                   => margin-bottom: .5rem;
        .bg-white               => background-color: #fff;
        .justify-center         => justify-content: center;
    Nota: Para valores que llevan una unidad de medida para indicar una dimensión,
    muy comúnmente Tailwind utiliza un número que sirve de múltiplo (ej: "-4"). Por
    defecto, este número es un múltiplo de ".25rem" (aprox. 4px).
    -->
    <nav class="flex items-center gap-8 p-4 bg-slate-300">
        <RouterLink class="text-lg" to="/">DV Social</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <template v-if="user.id !== null">
            
            <li>
                <RouterLink to="/chat-global">Chat Global</RouterLink>
            </li>
            <li>
                <RouterLink to="/mi-perfil">Mi perfil</RouterLink>
            </li>
            <li>
                <form
                    action="#"
                    @submit.prevent="handleLogout"
                >
                <button>{{ user.email }} (cerrar sesión) </button>
                </form>
            </li>
            </template>
            <template v-else>
            <li>
                <RouterLink to="/iniciar-sesion">Ingresar</RouterLink>
            </li>
            <li>
                <RouterLink to="/crear-cuenta">Crear Cuenta</RouterLink>
            </li>
            </template>
        </ul>
    </nav>
    <main class="container p-4 mx-auto">
        <RouterView />
    </main>
    <footer class="flex justify-center items-center h-25 bg-slate-800 text-white">
        <p>Da Vinci &copy; 2025</p>
    </footer>
</template>

<style scoped>
/* Por defecto, cualquier estilo que coloquemos dentro de un <style> de un componente se "extiende" o "sangra" ("bleeds") a todo el resto de la página.
Es decir, si existe otro elemento en otro componente que tenga la clase "footer", va a ser impactado por estos estilos.

Para evitar este comportamiento, Vue permite agregar el atributo "scoped" al <style>. Esto lo que hace es asegurarse de que los estilos de este componente *solo* impacten a los elementos de este componente. */

/* .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: #333;
    color: #fff;
}

.footer p {
    margin: 0;
} */
</style>