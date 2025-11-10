<template>
    <input v-model="nome_evento" type="text" placeholder="Nome evento r">
    <button @click="remove_evento">rimuovi</button>
</template>

<script>
import { db } from "../../firebase/firebase"
import { query, collection, where, getDocs, doc, deleteDoc } from "firebase/firestore"

export default {
    name: 'RemoveEvento',
    data() {
        return {
            nome_evento: ""
        };
    }, 
    methods: {
       async remove_evento() {
        try {
            const q = query(collection(db, "eventi"), where("nome_evento", "==", this.nome_evento));
            const snapshot = await getDocs(q);

            for(const docSnap of snapshot.docs) {
                await deleteDoc(doc(db, "eventi", docSnap.id));
            }

            this.$emit("eventoRimosso");
            this.nome_evento = "";
        } catch(error) {
            console.error("errore");
        }
       }
    }
}
</script>

