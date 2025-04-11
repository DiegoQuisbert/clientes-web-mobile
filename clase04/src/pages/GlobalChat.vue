<script>
import MainH1 from '../components/MainH1.vue';
import { listenForGlobalChatMessages, saveGlobalChatMessage } from '../services/global-chat';

export default {
    name: 'GlobalChat',
    components: {MainH1},

    /* 
    Definimos el "state" del componente
    El "state" es como llamamos a los datos internos del componente que pueden cambiar durante su vida.
    La propiedad "data" debe ser una función que retorne un objeto con los datos del state
    */

    data() {
        return {
            messages: [],
            newMessage: {
                email: ' ',
                body: ' ',
            }
        };
    },
    methods: {
        async sendMessage() {
            try {
                saveGlobalChatMessage({
                    id: this.messages.length + 1,
                    email: this.newMessage.email,
                    body: this.newMessage.body,
                    created_at: new Date(),
                });
                    this.newMessage.body = '';
            }catch(error){
                //manejar errores si que si
            }
            
        },
    },
    mounted() {
        //Escuchamos los mensajes que lleguen y los agregamos a nuestro array.
        listenForGlobalChatMessages(
            receivedMessage => this.messages.push
            (receivedMessage)
        );
    }
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="md:flex gap-4">
        <div class="md:w-9/12 min-h-100 p-4 md:,b-0 border border-gray-400 rounded">
            <h2 class="sr-only">Lista de mensajes</h2>

            <!-- 
            v-for es una "directiva" de Vue que permite repetir un segmento de HTML por cada uno de los elementos de un array
            Una "directiva" de Vue es un atributo de etiqueta que empieza con el prefijo "v-" 
             -->

            <ol class="flex flex-col gap-4">
                <li 
                v-for="message in messages"
                class="flex flex-col gap.05"
                >
                    <div><b>{{message.email}}</b> dijo: </div>
                    <div>{{ message.body }}</div>     
                    <div class="text-sm text-gray-600">{{message.created_at}}</div>     
                </li>
            </ol>
        </div>
        <div class="w-3/12">
            <h2 class="mb-4 text-2xl">Enviar un mensaje</h2>

            <!-- 
            Para asociar eventos en Vue usamos la directiva "v-on:event" por ejemplo:
            v-on:submit
            Aternativamente como es mega común tener que  
            
            Como valor le asignamos la función que queremos correr

            Adicionalmente Vue permite agregar un 
            -->
            <form 
                action="#"
                @submit.prevent="() => sendMessage()"
            >
                <div class="mb-4">
                    <label for="email" class="block mb-2"> Email </label>
                    <input
                        v-model="newMessage.email" 
                        type="email" 
                        id="email" 
                        class="w-full p-2 border border-gray-500 rounded"
                        >
                </div>
                <div class="mb-4">
                    <label for="message" class="block mb-2"> message </label>
                    <textarea 
                        v-model="newMessage.body"
                        id="body" 
                        class="w-full p-2 border border-gray-500 rounded"
                        ></textarea>
                </div>
                <button type="submit" class="transition-colors cursor-pointer py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500">Enviar</button>
            </form>
        </div>
    </div>
</template>