<template>
    <div class="ar">
        <router-link to="/area-riservata/organizzatore-login">Organizzatore</router-link>
        <router-link :to="{ name: 'AreaConvalidatore'}">Convalidatore</router-link>
    </div>
</template>

<style scoped> 
    .ar {
        display: flex;
        flex-direction: column;
    }
</style>

<script>
export default {
    name: "AreaRiservata",
    mounted() {
        localStorage.setItem("organizzatoreEmail", "")
        localStorage.setItem("organizzatoreId", "")
    }
}
</script>