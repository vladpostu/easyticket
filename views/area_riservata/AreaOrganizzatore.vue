<template>
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
</style> 

<script>

import EventiView from '../eventi/EventiView.vue';
export default {
    name: "AreaOrganizzatore",
    beforeMount() {
        if(!localStorage.getItem("organizzatoreId")) {
            this.$router.push({name: "OrganizzatoreLogin"});
        }
    },
    mounted() {
        console.log("org id " + localStorage.getItem("organizzatoreId"))
    },
    data() {
        return {
            organizzatoreIdRecuperato: localStorage.getItem("organizzatoreId"),
        }
    },
    components: {EventiView},
    methods: {
        logout() {
            localStorage.setItem("organizzatoreId", "");
            localStorage.setItem("organizzatoreEmail", "");
            this.$router.push("/area-riservata");
        }
    }
}
</script>