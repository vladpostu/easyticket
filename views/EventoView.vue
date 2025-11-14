<template>
    <div class="background">
        <div class="wrapper">

            <div v-if="evento" class="evento-dettagli-wrapper mt-5">
                <img :src="imgCopertinaURL" alt="">

                <div class="evento-info">
                    <h1 class="evento-titolo"> {{ evento.nome_evento }}</h1>
                    <h5 class="evento-data"> {{ invertiData(evento.data )}} </h5>
                    <div 
  class="leftDaysToBook" 
  :class="{
    danger: daysLeftToBook <= 0,
    warning: daysLeftToBook > 0 && daysLeftToBook <= 3,
    ok: daysLeftToBook > 3
  }"
>
  <template v-if="daysLeftToBook > 0">
    {{ $t("in") }} {{ daysLeftToBook }} {{ $t("days") }}
  </template>

  <template v-else>
    {{ $t("eventExpired") }}
  </template>
</div>


                    <p class="evento-artisti">{{ evento.artists }}</p>

                    <p class="evento-descrizione">
                        {{ evento.description }}
                    </p>
                </div>
            </div>

            <form class="partecipante-form">
                <h4 class="mb-4">{{ $t("registerParticipantAtEvent") }}</h4>

                <div class="mb-3">
                    <label for="nome_partecipante" class="form-label">{{ $t("name") }}</label>
                    <input v-model="nome" type="text" class="form-control" id="nome_partecipante" />
                </div>

                <div class="mb-3">
                    <label for="cognome_partecipante" class="form-label">{{ $t("surname") }}</label>
                    <input v-model="cognome" type="text" class="form-control" />
                </div>

                <div class="mb-3">
                    <label for="data_nascita_partecipante" class="form-label">{{ $t("dateOfBirth") }}</label>
                    <input v-model="data_di_nascita" type="date" id="data_nascita_partecipante" class="form-control">
                </div>

                <button type="button" @click="aggiungiPartecipante" class="btn btn-primary mt-4">
                    {{ $t("joinButton") }}
                </button>

                <button type="button" @click="recuperaBiglietto" class="btn btn-outline-light mt-3 btn-sm">
                    {{ $t("recoverTicketButton") }}
                </button>

                <div class="form-text">{{ $t("recoverTicketMessage") }}</div>
            </form>

        </div>
    </div>
</template>

<style>
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
  align-items: flex-end;
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

/* WRAPPER INFO + ALERT A DESTRA */
.evento-info {
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
  text-align: center;
}

/* TITOLO */
.evento-titolo {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

/* DATA */
.evento-data {
  font-size: 1.1rem;
  font-weight: 500;
  color: #cfe0ec;
  margin-top: 4px;
}

/* ALERT "LEFT DAYS TO BOOK" */
.leftDaysToBook {
  position: absolute;
  right: -20px;
  top: 0;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  backdrop-filter: blur(6px);
  white-space: nowrap;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
}

/* EVENTO PASSATO */
.leftDaysToBook.danger {
  background: rgba(255, 80, 80, 0.25);
  border: 1px solid rgba(255, 80, 80, 0.45);
  color: #ffd4d4;
}

/* EVENTO VICINO */
.leftDaysToBook.warning {
  background: rgba(255, 200, 90, 0.25);
  border: 1px solid rgba(255, 200, 90, 0.45);
  color: #ffeccc;
}

/* EVENTO LONTANO */
.leftDaysToBook.ok {
  background: rgba(70, 190, 120, 0.25);
  border: 1px solid rgba(70, 190, 120, 0.45);
  color: #e1ffec;
}

/* ARTISTI */
.evento-artisti {
  margin-top: 12px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #ffffff;
  opacity: 0.9;
}

/* DESCRIZIONE */
.evento-descrizione {
  margin-top: 12px;
  font-size: 0.95rem;
  line-height: 1.5rem;
  color: #d5dfe8;
  max-width: 600px;
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

  .evento-descrizione {
    max-width: 90%;
  }

  .partecipante-form {
    width: 100%;
    max-width: 360px;
    padding: 30px;
  }

  /* ALERT VA SOTTO IN MOBILE */
  .leftDaysToBook {
    position: static;
    margin-top: 12px;
    width: 100%;
    text-align: center;
  }

  .evento-info {
    text-align: center;
  }
}

</style>

<script>
import { getDoc, doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { invertiData } from '@/utils/dateUtils';

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
            daysLeftToBook: "",
        }
    },
    async mounted() {
        try {
            const docRef = doc(db, 'eventi', this.eventoId)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                this.evento = docSnap.data()
                this.imgCopertinaURL = this.evento.imgCopertina;
                const dif = new Date(this.evento.data) - (new Date)
                this.daysLeftToBook = Math.ceil(dif / (1000 * 60 * 60 * 24))
            }
        } catch (error) {
            console.log(error)
        }

    },
    methods: {
        invertiData,
        async aggiungiPartecipante() {
            try {
              const partecipanteRef = collection(db, "eventi", this.eventoId, "partecipanti")
            let partecipanteId;

            console.log("ci sono")

            const docRef = await addDoc(partecipanteRef, {
                nome: this.nome,
                cognome: this.cognome,
                data_di_nascita: this.data_di_nascita,
                presenzaConfermata: this.presenzaConfermata,
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
            } catch(error) {
              console.log(error);
            }
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