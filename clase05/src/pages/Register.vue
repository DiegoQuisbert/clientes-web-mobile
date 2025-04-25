<script>
    import MainH1 from '../components/MainH1.vue';
    import { register } from '../services/auth';
    export default {
        name: 'Register',
        components: {
            MainH1
        },
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                },
                loading: false,
            }
        },
        methods: {
            async handleSumit() {
                try {
                    this.loading = true;
                    await register(this.user.email, this.user.password);
                    this.loading = false;
                } catch (error){
                    //TODO...
                }
            }
        }
    }
</script>

<template>
    <MainH1>Crear una cuenta</MainH1>

    <form action="#" @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="email" class="block mb-2"> Email </label>
            <input v-model="user.email" type="email" id="email" class="w-full p-2 border border-gray-500 rounded">
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-2"> password </label>
            <input v-model="user.password" type="password" id="password"
                class="w-full p-2 border border-gray-500 rounded">
        </div>
    </form>
</template>
