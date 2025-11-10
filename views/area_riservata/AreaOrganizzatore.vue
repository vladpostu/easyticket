<template>
    <div>organizzatore</div>
    <button @click="logout">Logout</button>
    <div>
        <router-link to="/area-riservata/area-organizzatore/eventi-organizzatore">Visualizza i miei eventi</router-link>
        <router-link to="/area-riservata/area-organizzatore/aggiungi-evento">Aggiungi un nuovo evento</router-link>
    </div>
</template>

<style scoped>
div:nth-child(2) {
    display: flex;
    flex-direction: column;
}
</style>

<script>
    export default {
        name: "AreaOrganizzatore",
        mounted() {
            if(!localStorage.getItem("organizzatoreId")) {
                this.$router.push("/area-riservata")
            }
        }, 
        methods: {
            logout() {
               localStorage.setItem("organizzatoreId", "");
               localStorage.setItem("organizzatoreEmail", "");
               this.$router.push("/area-riservata"); 
            }
        }
    }
</script>