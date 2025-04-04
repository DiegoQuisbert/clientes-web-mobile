<script>
import MainH1 from '../components/MainH1.vue';

export default {
    name: 'GlobalChat',
    components: {MainH1}
}
</script>

<template>
    <MainH1>Chat global</MainH1>

    <div class="md:flex gap-4">
        <div class="md:w-9/12 min-h-100 p-4 md:,b-0 border border-gray-400 rounded">
            <h2 class="sr-only">Lista de mensajes</h2>
        </div>
        <div class="w-3/12">
            <h2 class="mb-4 text-2xl">Enviar un mensaje</h2>
            <form action="#">
                <div class="mb-4">
                    <label for="email" class="block mb-2"> Email </label>
                    <input type="email" id="email" class="w-full p-2 border border-gray-500 rounded">
                </div>
                <div class="mb-4">
                    <label for="message" class="block mb-2"> message </label>
                    <textarea id="message" class="w-full p-2 border border-gray-500 rounded"></textarea>
                </div>
                <button type="submit" class="transition-colors cursor-pointer py-2 px-4 rounded bg-blue-600 text-white hover:bg-blue-500 focus:bg-blue-500">Enviar</button>
            </form>
        </div>
    </div>
</template>