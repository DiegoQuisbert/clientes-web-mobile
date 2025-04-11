<script>
// Importamos el componente.
import Home from './pages/Home.vue';

// En la Options API, el script de los componentes debe exportar por default un
// objeto de configuración del componente.
export default {
    // El name nos permite asociar un nombre al componente. Es opcional, y debería
    // ser el mismo que el nombre del archivo (sin el ".vue").
    name: 'App',

    // En la Options API, tenemos que declarar dentro el componente los otros
    // componentes que vamos a utilizar.
    components: { Home },
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

    La mayoría de estilos que aceptan valores arbitrarios siguen el formato de: estilo-valor, ejemplo: padding, color, background-color, margin, etc
    ej:
    .p-4 => padding:1rem;
    .mb-2 => margin-bottom: .5rem;
    .bg-white => background.color: #fff;
    .p-4 => padding:1rem;
    
    Para valores que llevan una unidad de medida para indicar una dimensión, muy comunmente tailwind utiliza un numero que sirve de multiplo por defeco, este numero es multiplo de .25rem (4px)
    - 
    -->
    <nav class="flex items-center gap-8 p-4 bg-slate-300">
        <RouterLink class="text-lg" to="/">DV Social</RouterLink>
        <ul class="flex gap-4">
            <li>
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/chat-global">Chat Global</RouterLink>
            </li>
            <li>
                <RouterLink to="/iniciar-sesion">Ingresar</RouterLink>
            </li>
            <li>
                <RouterLink to="/crear-cuenta">Cuenta Cuenta</RouterLink>
            </li>
        </ul>
    </nav>
    
    <main class="container mx-auto p-4">
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