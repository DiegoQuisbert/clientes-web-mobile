<script>

import MainH1 from '../components/MainH1.vue';

export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                id: null,
                email: null,
                bio: null,
                display_name: null,
                career: null,
            },
        }
    },
    mounted() {
        suscribeToAuthUserChanges(newUserData => this.user = newUserData);
    },
}
</script>

<template>
    <MainH1>Mi perfil</MainH1>
    <div class="p-4 italic">{{ user.bio || 'acá va mi biografía...' }}</div>

    <dl>
        <dt class="font-bold">Email</dt>
        <dd class="mb-2">{{ user.email }}</dd>

        <dt class="font-bold">Nombre de usuario</dt>
        <dd class="mb-2">{{ user.display_name }}</dd>

        <dt class="font-bold">Carrera</dt>
        <dd class="mb-2">{{ user.career}}</dd>
    </dl>


</template>