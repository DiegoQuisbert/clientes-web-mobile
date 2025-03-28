<script>
    // En la Options API, el script de los componentes debe exportar por default un objeto de configuración de componente

    import Home from './views/Home.vue'

    export default {
        //Name nos permite asociar un nombre al componente, es opcional y debería de ser el mismo nombre que el archivo, pero sin el "".vue"
        name: 'App',
        //en la API de opciones, tenemos que declarar dentro del componente, los otros componentes que vamos a utilizar
        components:{ Home },
    }
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">DV Social</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/crear-cuenta">Register</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/chat-global">Register</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/iniciar-sesion">Register</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="container py-4">
        <RouterView />
    </main>
    <footer class="footer">
        <p>Da Vinci &copy; 2025</p>
    </footer>

</template>

<style scoped>

/* Por defecto, cualquier estilo que coloquemos dentro de un style de un componente, se extiende o sangra a todo el resto de la páginam osea que si existe otro elemento en otra componente que tenga la clase "footer", va a ser impactado por estos estilos */
/* Para evitar esto, se le puede agregar el atributo "scoped" al <style> para que los estilos queden bloqueados en este componente */

.footer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        background-color: #333;
        color: #fff;
}

.footer p {
    margin: 0;
}
</style>