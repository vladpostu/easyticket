<template>
    <h2>Eventi Organizzatore</h2>
    <div class="evento" v-for="evento in eventi" :key="evento.id">
        <div class="evento-nome">
            {{ evento.nome_evento }}
        </div>
        <div class="evento-nome">
            {{ evento.data }}
        </div>
    </div>
</template>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default {
    name: "EventiOrganizzatore",
    data() {
        return {
            eventi: []
        }
    },
    methods: {
        async caricaEventi() {
            const q = query(
                collection(db, "eventi"),
                where("emailOrganizzatore", "==", localStorage.getItem("organizzatoreEmail"))
            )

            const snapshot = await getDocs(q);
            this.eventi = snapshot.docs.map(doc => ({
                id: doc.id, 
                ...doc.data()
            }));
        }
    },
    async mounted() {
        await this.caricaEventi();
    }
}
</script>


