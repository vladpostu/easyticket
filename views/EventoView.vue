<template>
    <h1>evento</h1>
    <div v-if="evento">
        {{  evento.nome_evento }}
        {{  evento.data }}
    </div>
</template>

<script>

import {getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export default {
    name: "EventoView",
    props: ['id'],
    data() {
        return {
            evento: null
        }
    },
    async mounted() {
        const docRef = doc(db, 'eventi', this.id)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            this.evento = docSnap.data()
        } 
    }
}
</script>