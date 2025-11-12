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
.background {
  background-color: #0C2B4E;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F4F4F4;
  padding: 60px 20px;
}

.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 80px;
  flex-wrap: wrap-reverse;
  max-width: 1200px;
  width: 100%;
}

/* --- DETTAGLI EVENTO --- */
.evento-dettagli-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.evento-dettagli-wrapper img {
  width: 450px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.evento-dettagli-wrapper h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-top: 20px;
}

.evento-dettagli-wrapper h5 {
  font-size: 1.1rem;
  font-weight: 400;
  color: #d3e1eb;
}

/* --- FORM --- */
.partecipante-form {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 40px 50px;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  backdrop-filter: blur(8px);
}

.partecipante-form h4 {
  margin-bottom: 25px;
  font-weight: 600;
  color: #fff;
}

.mb-3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.mb-3 label {
  font-size: 0.95rem;
  color: #d7e7f3;
  margin-bottom: 6px;
}

.mb-3 input {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 10px 12px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.9);
  color: #0C2B4E;
  font-weight: 500;
}

.mb-3 input:focus {
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
}

/* --- BOTTONI --- */
.btn {
  width: 100%;
  border-radius: 6px;
  padding: 10px 0;
  font-weight: 600;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
}

.btn-primary {
  background-color: #1B74BB;
  border: none;
  color: #fff;
}

.btn-primary:hover {
  background-color: #155f99;
}

.btn-outline-light {
  border: 1.5px solid #e6eef5;
  background-color: transparent;
  color: #f4f4f4;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* --- TESTO INFORMATIVO --- */
.form-text {
  font-size: 0.85rem;
  margin-top: 10px;
  text-align: center;
  color: #e0e0e0;
  line-height: 1.3;
  width: 80%;
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .wrapper {
    flex-direction: column-reverse;
    gap: 40px;
    padding: 30px 20px;
    align-items: center;
  }

  .evento-dettagli-wrapper img {
    width: 100%;
    max-width: 360px;
    height: 240px;
  }

  .partecipante-form {
    width: 100%;
    max-width: 360px;
    padding: 30px;
  }
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