<template>
    <h2 class="mt-4">Area Organizzatore</h2>
    <h5 class="mt-4"><span style="font-weight: 300;">Ciao,</span> {{  currentUser.email }}</h5>
    <button class="btn btn-outline-danger btn-sm logout-button mt-1" @click="logout">Esci</button>
    <div>
        <router-link class="btn btn-primary mt-5" to="/area-riservata/area-organizzatore/aggiungi-evento">Aggiungi un nuovo evento</router-link>
    </div>
    <div class="eventi-org">
        <div class="ms-2 fw-bold">I tuoi eventi</div>
        <EventiView class="eventi-comp" :organizzatoreId="organizzatoreIdRecuperato"/>
    </div>
</template>

<style scoped>
    .eventi-org {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        width: 90%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        justify-content: flex-start;
        align-items: start;
    }

    .eventi-comp {
        justify-content: flex-start !important;
        width: 100% !important;
    }

    .logout-button {
        width: 80px !important;
    }
</style> 

<script>

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import EventiView from '../eventi/EventiView.vue';
export default {
    name: "AreaOrganizzatore",
    beforeMount() {
    },
    mounted() {
        console.log("org id " + localStorage.getItem("organizzatoreId"))
    },
    data() {
        return {
            organizzatoreIdRecuperato: localStorage.getItem("organizzatoreId"),
            currentUser: auth.currentUser
        }
    },
    components: {EventiView},
    methods: {
        async logout() {
            try {
                await signOut(auth)
                this.$router.push({name: "AreaRiservata"})
            } catch(error) {
                console.log(error)
            }
        }
    }
}
</script>