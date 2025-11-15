<template>
  <div class="page">
    <div class="layout">

      <section v-if="evento" class="event-block">

        <!-- Img wrapper con badge -->
        <div class="img-wrapper">
          <img :src="imgCopertinaURL" class="event-img" />

          <span 
            class="days-left"
            :class="{
              expired: daysLeftToBook < 0,
              lastday: daysLeftToBook === 0
            }"
          >
            <template v-if="daysLeftToBook > 0">
              {{ $t('in') }} {{ daysLeftToBook }} {{ $t('days') }}
            </template>
            <template v-else-if="daysLeftToBook === 0">
              {{ $t("lastDay") }}
            </template>
            <template v-else>
              {{ $t("eventExpired")}}
            </template>
          </span>
        </div>

        <header class="event-info">
          <h1 class="event-title">{{ evento.nome_evento }}</h1>

          <p class="event-date">{{ invertiData(evento.data) }}</p>

          <p class="event-artists">{{ evento.artists }}</p>
          <p class="event-description">{{ evento.description }}</p>
        </header>
      </section>

      <section class="form" :class="{ formExpired: daysLeftToBook < 0 }">

        <div v-if="daysLeftToBook < 0" class="expired-banner">
          <span>{{ $t("eventExpired") }}</span>
        </div>

        <h4 class="form-title">{{ $t("registerParticipantAtEvent") }}</h4>

        <div class="field">
          <label>{{ $t("name") }}</label>
          <input v-model="nome" type="text" :disabled="daysLeftToBook < 0" />
        </div>

        <div class="field">
          <label>{{ $t("surname") }}</label>
          <input v-model="cognome" type="text" :disabled="daysLeftToBook < 0" />
        </div>

        <div class="field">
          <label>{{ $t("dateOfBirth") }}</label>
          <input v-model="data_di_nascita" type="date" :disabled="daysLeftToBook < 0" />
        </div>

        <button 
          type="button" 
          @click="aggiungiPartecipante" 
          class="btn primary"
          :disabled="daysLeftToBook < 0"
        >
          {{ $t("joinButton") }}
        </button>

        <button 
          type="button" 
          @click="recuperaBiglietto" 
          class="btn outline"
        >
          {{ $t("recoverTicketButton") }}
        </button>

        <p class="note">{{ $t("recoverTicketMessage") }}</p>
      </section>

    </div>
  </div>
</template>

<style scoped>
.page {
  width: 100%;
  min-height: 100vh;
  background: #0b2642;
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  color: #fff;
}

.layout {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
}

/* EVENT BLOCK */
.event-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 460px;
}

.img-wrapper {
  position: relative;
  width: 100%;
}

.event-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 14px;
  box-shadow: 0 5px 18px rgba(0,0,0,0.32);
}

.days-left {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 7px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  background: #e5eeff;
  color: #17355f;
  box-shadow: 0 3px 10px rgba(0,0,0,0.25);
  backdrop-filter: blur(3px);
  transition: 0.25s ease;
}

.days-left.lastday {
  background: #ffecb3;
  color: #6b4f00;
}

.days-left.expired {
  background: #ffdddd;
  color: #a33a3a;
  opacity: 0.9;
}

.event-info {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.event-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.event-date {
  color: #d3e1ed;
  font-size: 1rem;
  margin-bottom: 10px;
}

.event-artists {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 6px;
}

.event-description {
  margin-top: 10px;
  font-size: 0.95rem;
  line-height: 1.6rem;
  color: #cfd9e4;
}

/* FORM */
.form {
  width: 380px;
  background: rgba(255,255,255,0.08);
  padding: 35px 40px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.28);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

/* FORM EXPIRED — tono coerente con il badge expired */
.formExpired {
  opacity: 0.6;
  filter: grayscale(25%);
  pointer-events: none;
  position: relative;
}

.expired-banner {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  background: rgba(255, 90, 90, 0.18);
  border: 1px solid rgba(255, 150, 150, 0.3);
  border-radius: 8px;
  font-weight: 600;
  color: #ffb6b6;
  margin-bottom: 22px;
}

.form-title {
  font-size: 1.3rem;
  margin-bottom: 25px;
  font-weight: 600;
}

.field {
  width: 100%;
  margin-bottom: 16px;
}

.field label {
  font-size: 0.9rem;
  margin-bottom: 6px;
  display: block;
  opacity: 0.9;
}

.field input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background: rgba(255,255,255,0.95);
  color: #0c2b4e;
  font-weight: 500;
}

.btn {
  width: 100%;
  padding: 11px 0;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s;
  margin-top: 6px;
}

.primary {
  background: #1a6cb0;
  color: #fff;
  border: none;
}
.primary:hover {
  background: #155a92;
}

.outline {
  background: transparent;
  color: #fff;
  border: 1.6px solid #dce6f1;
  margin-top: 14px;
}
.outline:hover {
  background: rgba(255,255,255,0.15);
}

.note {
  margin-top: 14px;
  font-size: 0.85rem;
  text-align: center;
  opacity: 0.85;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .layout {
    flex-direction: column-reverse;
    align-items: center;
    gap: 40px;
  }

  .event-block,
  .form {
    width: 100%;
    max-width: 360px;
  }

  .event-img {
    height: 230px;
  }
}
</style>



<script>
import { getDoc, doc, addDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { invertiData } from '@/utils/dateUtils.js';

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