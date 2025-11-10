<template>
    <h1>evento</h1>
    <div v-if="evento">
        {{  evento.nome_evento }}
        {{  evento.data }}
    </div>
    <div class="partecipante_form">
        <input v-model="nome" type="text" placeholder="nome">
        <input v-model="cognome" type="text" placeholder="cognome">
        <input v-model="data_di_nascita" type="text" placeholder="data di nascita">
    </div>
    <button @click="aggiungiPartecipante">Partecipa</button>
    <button @click="recuperaBiglietto">Recupera biglietto</button>
     
</template>

<style scoped> 
    .partecipante_form {
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        width: 400px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .partecipante_form > input {
        margin-top: 10px;
    }

    button {
        margin-top: 20px;
    }

</style>

<script>
import {getDoc, doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'

export default {
    name: "EventoView",
    props: ['eventoId'],
    data() {
        return {
            evento: null,
            nome: "",
            cognome: "",
            data_di_nascita: "",
            presenzaConfermata: false,
        }
    },
    async mounted() {
        const docRef = doc(db, 'eventi', this.eventoId)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()) {
            this.evento = docSnap.data()
        } 
    },
    methods: {
        async aggiungiPartecipante() {
            const partecipanteRef = collection(db, "eventi", this.eventoId, "partecipanti")
            var partecipanteId = this.nome + "_" + this.cognome 

            const docRef = await addDoc(partecipanteRef, {
                nome: this.nome,
                cognome: this.cognome,
                data_di_nascita: this.data_di_nascita,
                presenzaConfermata: this.presenzaConfermata
            });

            partecipanteId = docRef.id;

            this.nome = "";
            this.cognome = "";
            this.data_di_nascita = "";

            this.$router.push({
                name: "PartecipanteView",
                params: {
                    eventoId: this.eventoId,
                    partecipanteId: partecipanteId,
                }
            })
        },
        async recuperaBiglietto() {

            const partecipantiRef = collection(db, "eventi", this.eventoId, "partecipanti");

            const q = query(
                partecipantiRef,
                where("nome", "==", this.nome),
                where("cognome", "==", this.cognome),
                where("data_di_nascita", "==", this.data_di_nascita)
            );

            const snapshot = await getDocs(q);

            if(!snapshot.empty) {
                this.partecipanteId = snapshot.id;
                this.$router.push({
                name: "PartecipanteView",
                params: {
                    eventoId: this.eventoId,
                    partecipanteId: snapshot.docs[0].id,
                }
                
            })
        }
    }
}
}
</script>