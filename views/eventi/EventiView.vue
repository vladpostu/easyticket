<template>
  <div v-if="loaded" class="eventi">
    <router-link
      :to="getLinkView(evento)"
      v-for="evento in eventi"
      :key="evento.id"
      class="card"
      style="width: 18rem;"
    >
      <img :src="evento.imgCopertina" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ evento.nome_evento }}</h5>
        <p>{{ invertiData(evento.data) }}</p>
        <p class="card-text">
          Some quick example text to build on the card title and make up the bulk of the card’s content.
        </p>
      </div>
    </router-link>
  </div>

  <!-- Spinner di caricamento -->
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

/* SPINNER LOADER */
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
  border-top-color: #1B3B69; /* Colore coerente con card-title */
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
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
}

.card img {
  height: 180px;
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

/* CARD BODY */
.card-body {
  padding: 16px 18px;
  text-align: left;
}

.card-title {
  font-size: 1.2rem;
  color: #0C2B4E;
  font-weight: 700;
  margin-bottom: 8px;
}

.card-body p {
  margin: 4px 0;
  color: #555;
  font-size: 0.95rem;
}

.card-body p:first-of-type {
  color: #1B3B69;
  font-weight: 500;
}

/* LINK */
a {
  text-decoration: none !important;
  color: inherit;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .eventi {
    gap: 18px;
  }

  .card {
    width: 100%;
    max-width: 340px;
  }

  .card img {
    height: 200px;
  }
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