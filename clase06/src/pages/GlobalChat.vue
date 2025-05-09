<script>
import { nextTick } from 'vue';
import MainH1 from '../components/MainH1.vue';
import { getGlobalChatLastMessages, listenForGlobalChatMessages, saveGlobalChatMessage } from '../services/global-chat';

export default {
    name: 'GlobalChat',
    components: { MainH1 },
    /*
    Definimos el "state" del componente.
    El "state" es como llamamos a los datos internos del componente que pueden cambiar durante su vida.
    La propiedad "data" debe ser una función que retorne un objeto con los datos del state.
    */
    data() {
        return {
            messages: [],
            newMessage: {
                email: '',
                body: '',
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
            } catch (error) {
                // TODO: Manejar caso de error :)
            }
        },
    },
    async mounted() {
        // Escuchamos los mensajes que lleguen y los agregamos a nuestro array.
        listenForGlobalChatMessages(
            async receivedMessage => {
                this.messages.push(receivedMessage);

                await nextTick();
                this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
            }
        );

        try {
            this.messages = await getGlobalChatLastMessages();

            /*
            ¿Qúe es, y por qué lo necesitamos, nextTick()?
            El objetivo que tenemos es que cuando los mensajes se carguen en el DOM,
            se mueva la barra de scroll vertical al final.
            Los mensajes los estamos recibiendo en la instrucción anterior en la
            variable "messages" del state del componente.
            Esta variable la recorremos en el template con un v-for.
            Como sabemos, tan solo con agregar el array a la propiedad, Vue va a
            actualizar el DOM para agregar los elementos.
            Debajo estamos poniendo que se mueva la barra de scroll, pero si no 
            agregamos el "await nextTick()" no funcionaba.
            La razón es porque Vue no modifica el DOM instantáneamente cada vez
            que recibe algún cambio. Sino que trata de "agrupar" o "empaquetar"
            (batch) múltiples modificaciones del DOM juntas.
            Modificar el DOM implica que el browser tiene que hacer un "redraw" de
            la página. Y esta es la acción, probablemente, más costosa de realizar
            para el browser.

            En la amplia mayoría de los casos, esto es lo que queremos que pase.
            Sin embargo, hay ocasiones, como esta, donde necesitamos específicamente
            esperar a que un cambio del DOM se realice antes de ejecutar lo 
            siguiente.
            Eso es lo que hace nextTick(). Espera a que el batch actual se aplique
            en el DOM.
            */
            await nextTick();

            // Movemos el scroll vertical al final.
            this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        } catch (error) {
            // TODO...
        }
    }
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="md:flex gap-4">
        <!-- 
        La propiedad "ref" permite asociar una "referencia" al nodo del DOM del
        elemento, con lo que vamos a poder interactuar programáticamente con el
        nodo.
        Le asignamos un nombre, y ese nombre va a estar disponible conteniendo el
        nodo en la propiedad this.$refs (Options API).
        -->
        <div 
            ref="chatContainer"
            class="overflow-y-auto md:w-9/12 h-100 p-4 mb-4 md:mb-0 border border-gray-400 rounded"
        >
            <h2 class="sr-only">Lista de mensajes</h2>

            <!-- 
            v-for es una "directiva" de Vue que permite repetir un segmento de HTML por cada uno de los elementos de
            un array.
            Una "directiva" de Vue es un atributo de etiqueta que empiza con el prefijo "v-" y que modifica de
            alguna manera el HTML.
            -->
            <ol class="flex flex-col gap-4">
                <li 
                    v-for="message in messages"
                    class="flex flex-col gap-0.5"
                >
                    <div><b>{{ message.email }}</b> dijo:</div>
                    <div>{{ message.body }}</div>
                    <div class="text-sm text-gray-600">{{ message.created_at }}</div>
                </li>
            </ol>
        </div>
        <div class="md:w-3/12">
            <h2 class="mb-4 text-2xl">Enviar un mensaje</h2>
            <!-- 
            Para asociar eventos en Vue usamos la directiva  "v-on:event", por ejemplo:
                v-on:submit
            Alternativamente, como es mega-común tener que asociar eventos, Vue ofrece el shortcut: "@":
                @submit

            Como valor, le asignamos la función que queremos correr.

            Adicionalmente, Vue permite agregar modificadores en los eventos, indicados por un sufijo ".modificador".
            Por ejemplo:
                @submit.prevent
            -->
            <form
                action="#"
                @submit.prevent="() => sendMessage()"
            >
                <div class="mb-4">
                    <label for="email" class="block mb-2">Email</label>
                    <input
                        v-model="newMessage.email"
                        type="email"
                        id="email"
                        class="w-full p-2 border border-gray-500 rounded"
                    >
                </div>
                <div class="mb-4">
                    <label for="body" class="block mb-2">Mensaje</label>
                    <textarea
                        v-model="newMessage.body"
                        id="body"
                        class="w-full p-2 border border-gray-500 rounded"
                    ></textarea>
                </div>
                <button type="submit" class="transition-colors py-2 px-4 rounded bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700 text-white">Enviar</button>
            </form>
        </div>
    </div>
</template>