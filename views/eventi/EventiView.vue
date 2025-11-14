<template>
  <div v-if="loaded" class="eventi">
    <router-link v-for="evento in eventi" :key="evento.id" :to="getLinkView(evento)" class="card">
      <img :src="evento.imgCopertina" class="card-img-top" alt="" />

      <div class="card-body">
        <h5 class="card-title">{{ evento.nome_evento }}</h5>

        <p class="card-date">{{ invertiData(evento.data) }}</p>

        <p class="card-artists">{{ evento.artists }}</p>

        <p class="card-description">
          {{ evento.description }}
        </p>
      </div>
    </router-link>
  </div>

  <div v-else class="loader-container">
    <div class="spinner"></div>
  </div>
</template>

<style>
.eventi {
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

/* SPINNER */
.loader-container {
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 55px;
  height: 55px;
  border: 5px solid #e3e8ef;
  border-top-color: #1b3b69;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* CARD */
.card {
  display: flex;
  flex-direction: column;
  width: 280px;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

.card img {
  height: 180px;
  width: 100%;
  object-fit: cover;
}

/* CARD BODY */
.card-body {
  padding: 16px 18px;
  text-align: left;
}

.card-title {
  font-size: 1.25rem;
  color: #0c2b4e;
  font-weight: 700;
  margin-bottom: 6px;
}

.card-date {
  margin: 4px 0;
  color: #1b3b69;
  font-weight: 500;
  font-size: 0.95rem;
}

/* ARTISTS */
.card-artists {
  margin: 6px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #0c2b4e;
  opacity: 0.85;
}

/* DESCRIPTION */
.card-description {
  margin-top: 10px;
  font-size: 0.92rem;
  line-height: 1.35rem;
  color: #555;
  opacity: 0.9;
}

/* LINK */
a {
  text-decoration: none !important;
  color: inherit;
}
</style>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { invertiData } from '@/utils/dateUtils';

export default {
  name: "EventiView",
  data() {
    return {
      eventi: [],
      loaded: false,
    }
  },
  props: ["organizzatoreId"],
  methods: {
    invertiData,
    async fetchEventi() {
      if (!this.organizzatoreId) { // if there is not organizer uid
        const eventiRef = collection(db, "eventi")
        const snapshot = await getDocs(eventiRef)

        this.eventi = snapshot.docs.map((evento) => ({
          id: evento.id,
          ...evento.data()
        }))

        this.loaded = true;
      } else { // if there is organizer uidsß
        const q = query(collection(db, "eventi"),
          where("idOrganizzatore", "==", this.organizzatoreId)
        )

        const snapshot = await getDocs(q);

        this.loaded = true;

        this.eventi = snapshot.docs.map((evento) => ({
          id: evento.id,
          ...evento.data()
        }))
      }
    },
    getLinkView(evento) {
      if (this.organizzatoreId) {
        return { name: "EventoOrganizzatore", params: { eventoId: evento.id } }
      } else {
        return { name: "EventoView", params: { eventoId: evento.id } }
      }
    }
  },
  mounted() {
    this.fetchEventi();
    console.log(this.organizzatoreId)
  }
}
</script>