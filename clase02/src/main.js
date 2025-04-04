/*
# Rutas con npm y Vite
Cuando hablamos de las rutas de los archivos de JS manejados por npm y Vite, 
específicamente cuando hablamos de los imports, hay 3 posibles tipos de valores que 
podemos poner:

## Rutas absolutas
Las rutas absolutas son las que contiene la información completa para poder llegar
al recurso sin importar donde estemos parados.
Esto suele incluir cosas como el protocolo (http:// o https://), el dominio (mi.sitio.com), etc.
Ejemplo:
  https://mi.sitio.com/saraza.js

## Rutas relativas
Son rutas que marcan el camino al recurso en relación a la ubicación actual donde
estamos.
En las rutas para imports de npm, las rutas relativas siempre deben empezar con "/",
"./" o "../".
La razón de este requerimiento es para poder diferenciar las rutas relativas del
siguiente caso.
Ejemplo:
  ./saraza.js

## Rutas de paquetes de npm
Si escribimos solo un nombre de ruta, sin prefijo de ruta relativa o absoluta, npm
va a suponer automáticamente que estamos hablando de un paquete de npm instalado
localmente y que existe en [node_modules].
Ejemplo:
  vue
*/

import './style.css';
import { createApp } from 'vue'; // Importamos la función para crear la aplicación de Vue.
import App from './App.vue'; // Importamos el componente raíz.
import router from './router/router';

// Creamos la aplicación, pasando el componente raíz.
const app = createApp(App);

// Registramos el router en la aplicación.
app.use(router);

// Montamos la aplicación en el div#app del [index.html].
app.mount('#app');