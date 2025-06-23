<template>
    <div>ashome</div>
        <ul>
            <li v-for="evento in eventi" :key="evento.id">
                <router-link :to="{ name: 'EventoView', params: { id: evento.id } }">
                    {{  evento.nome_evento }} 
                    {{  evento.data }}
                </router-link>
                
            </li>
    </ul>
    <AddEvento @eventoInserito="aggiornaLista"/>
</template>

<style scoped>
    ul {
        width: 100px;
        border: 1px solid gray;
    }

    li {
        background: lightblue;
    }
</style>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import AddEvento from '../src/components/AddEvento.vue'

export default {
    name: 'HomePage',
    components: {
        AddEvento
    },
    data() {
        return {
            eventi: []
        }
    },
    methods: {
            async aggiornaLista() {
            const snapshot = await getDocs(collection(db, 'eventi'))
            this.eventi = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) 
        }
    },
    async mounted() {
        await this.aggiornaLista();
    }
}
</script>