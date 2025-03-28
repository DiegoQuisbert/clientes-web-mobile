/*

# Rutas con npm y Vite
Cuando queremos en los archivos de JS, manejamos por npm y Vite, específicamente cuando hablamos de los import, hay 3 posibles tipos que podemos poner

## Rutas absolutas 
Las rutas absolutas son las que contienene la información completa para poder llegar al recurso sin importar donde estemos parados, esto suele incluir cosas como wel protocolo (Http:// o https://) el dominio (como mi.sitio.com), etc.

Ejemplo:
https://mi.sitio.com/saraza.js

## Rutas relativas:
Son rutas que marcan en el camino al recurso en relación a la ubicación actual, donde estmaos.
En las rutas para imports de npm, las rutas relativas siempre deben empezar con '/' o './' o '../'
La razón de este requerimiento es para poder diferenciar las rutas relativas edl siguiente caso
Ejemplo:
  ./saraza.js

## Rutas con paquetes de npm
Si escribimos solo un nombre, de ruta, sin prefijo, de ruta relativa o absoluta, npm va a suponer automáticamente que estamos hablando de un paquete de npm installado localmente y que existe en [node_modules]
Ejemplo:
  vue
*/

import './style.css';
import {createApp} from 'vue';  //importamos la función para crear la app de vue

import App from './App.vue'; //importamos el componente raíz

//creamos la app, pasando el componente raíz
const app = createApp(App);

//montamos la app en el div#app del [index.html]
app.mount('#App');