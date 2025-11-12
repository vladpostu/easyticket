<template>
    <h1>index</h1>
    <router-link to="/home">home</router-link>
</template>

<script>
export default {
    name: 'IndexView',
    beforeRouteEnter(to, from, next) {
        next({name: "HomeView"})
    }
}
</script>