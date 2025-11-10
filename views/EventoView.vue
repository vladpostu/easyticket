<template>
    <div class="background">
        <div class="wrapper">
            <div v-if="evento" class="evento-dettagli-wrapper mt-5">
                <img :src="imgCopertinaURL" alt="">
                <div>
                    <h1 class="mt-3"> {{ evento.nome_evento }}</h1>
                    <h5> {{ evento.data }} </h5>
                </div>
            </div>
            <form class="partecipante-form">
                <h4 class="mb-4">Registrati all'evento</h4>
                <div class="mb-3">
                    <label for="nome_partecipante" class="form-label">Nome</label>
                    <input v-model="nome" type="text" placeholder="" class="form-control" id="nome_partecipante" />
                </div>
                <div class="mb-3">
                    <label for="cognome_partecipante" class="form-label">Cognome</label>
                    <input v-model="cognome" type="text" placeholder="" class="form-control" />
                </div>
                <div class="mb-3">
                    <label for="data_nascita_partecipante" class="form-label">Data di nascita </label>
                    <input v-model="data_di_nascita" type="date" placeholder="" id="data_nascita_partecipante"
                        class="form-control">
                </div>
                <button @click="aggiungiPartecipante" class="btn btn-primary mt-4">Partecipa</button>
                <button @click="recuperaBiglietto" class="btn btn-outline-light mt-3 btn-sm">Recupera
                    biglietto</button>
                <div class="form-text" style="width: 200px;">Se vuoi recuperare il tuo biglietto compila i campi e premi il pulsante "Recupera
                    Biglietto"
                </div>
            </form>
        </div>
    </div>

</template>

<style scoped>
.evento-dettagli-wrapper {
    display: flex;
    flex-direction: column;
}

.evento-dettagli-wrapper img {
    width: 500px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 50px;
    flex-wrap: wrap-reverse;
    padding: 50px;
}

.partecipante-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
}

.mb-3 input {
    width: 250px;
}

.mb-3 label {
    margin-left: 8px;
}

.mb-3 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.background {
    background-color: #1D546C;
    position: absolute;
    width: 100vw;
}

.wrapper {
    color: #F4F4F4 !important;
}

div {
    color: #F4F4F4 !important;
}
</style>

<script>
import { getDoc, doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
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
            imgCopertinaURL: "",
        }
    },
    async mounted() {
        try {
            const docRef = doc(db, 'eventi', this.eventoId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                this.evento = docSnap.data()
                this.imgCopertinaURL = this.evento.imgCopertina;
            }
        } catch (error) {
            console.log(error)
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

            if (!snapshot.empty) {
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