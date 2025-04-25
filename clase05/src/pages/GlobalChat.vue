<script>
import { nextTick } from 'vue';
import MainH1 from '../components/MainH1.vue';
import { getGlobalChatLastMessages, listenForGlobalChatMessages, saveGlobalChatMessage } from '../services/global-chat';

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
                    email: this.newMessage.email,
                    body: this.newMessage.body,
                });
                    this.newMessage.body = '';
            }catch(error){
                //manejar errores si que si
            }
            
        },
    },
    async mounted() {
        //Escuchamos los mensajes que lleguen y los agregamos a nuestro array.
        listenForGlobalChatMessages(

            
            async receivedMessage => {
                this.messages.push(receivedMessage);

                await nextTick();
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;

            } 
        );

        try{
            this.messages= await getGlobalChatLastMessages();

            //por qué necesitamoes nextTick()?, para que el objeto que tenemos es que cuando los mensajes se carguen al dom, se mueva la barra de scroll vertical al final, los mensajes los estamos recibiendo en la estructura anterior en la cvariable messages del state, dicha variable la recorremos en eltemplate con un v-for, como sabemos que con tan solo agregar el array a la propiedad, Vue va a actualizar el DOM, para agregar los elementos 
            
            await nextTick();

            //movemos el scroll  vertical al final
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;

        }catch(error){
            //TODO...
        }
    }
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="md:flex gap-4">
        
        <!--  
        Ka propiedad "ref" permite asociar una referfencia al nodo del DOM del eleento, con la qe vamosa poder interactuar programáticamente con el nodo
        Le asignamos un nombre y ese nombre va a estar disponible conteniendo el nodo 
        -->

        <div
            ref="chatContainer"
            class="overflow-y-auto md:w-9/12 h-100 p-4 md:,b-0 border border-gray-400 rounded"
         >
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