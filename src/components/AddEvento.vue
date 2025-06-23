<template>
    <input v-model="nome_evento" type="text" placeholder="Nome evento">
    <input v-model="data" type="text" placeholder="Data Evento">
    <button @click="inserisciEvento">inserisci</button>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase'

export default {
    name: 'AddEvento',
    data() {
        return {
            nome_evento: '',
            data: ''
        }
    },
    methods: {
        async inserisciEvento() {
            const nuovoEvento = {
                nome_evento: this.nome_evento,
                data: this.data
            }

            try {
                await addDoc(collection(db, 'eventi'), nuovoEvento)
                this.data = ''
                this.nome_evento = ''
                this.$emit('eventoInserito')
            } catch(error) {
                console.log(error)
            }
        }
    }
}
</script>