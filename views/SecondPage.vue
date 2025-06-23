<template>
    <h1>page 2</h1>
    <ul>
        <li v-for="evento in eventi" :key="evento.nome">
            {{  evento.nome }}
        </li>
    </ul>
</template>

<style scoped>
    ul {
        border: 1px solid black;
        width: 300px;
    }
</style>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export default {
    name: 'SecondPage',
    data() {
        return {
            eventi: []
        }
    },
    async mounted() {
        const snapshot = await getDocs(collection(db, 'test'))
        this.eventi = snapshot.docs.map(doc => doc.data())
    }
}
</script>