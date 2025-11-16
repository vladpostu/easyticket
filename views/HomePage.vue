<template>
    <div class="image-container">
        <img src="../src/assets/imgs/crowd-1056764_1280.jpg" class="img-fluid" alt="" />
        <div class="moto">{{ $t("welcome")}}</div>
    </div>
    <EventiView :organizzatoreId=this.organizzatoreId />
</template>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 25px 25px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
  font-family: "Poppins", "Inter", system-ui, sans-serif;
}

.image-container img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7) saturate(1.1);
  transition: transform 6s ease, filter 0.5s ease;
}

.image-container:hover img {
  transform: scale(1.05);
  filter: brightness(0.8);
}

.image-container::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.65) 70%
  );
  z-index: 1;
}

.image-container .moto {
  position: relative;
  z-index: 2;
  color: #ffffff;
  font-weight: 700;
  font-size: 2.6rem;
  text-align: center;
  letter-spacing: 0.6px;
  line-height: 1.25;
  padding: 0 1rem;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.7);
  background: linear-gradient(90deg, #ffffff, #e2e2e2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: slideFadeIn 1.3s ease forwards;
  transform: translateY(10px);
}

@keyframes slideFadeIn {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(10px);
  }
}

@media (max-width: 992px) {
  .image-container {
    height: 340px;
  }
  .image-container .moto {
    font-size: 2rem;
    max-width: 90%;
  }
}

@media (max-width: 576px) {
  .image-container {
    height: 260px;
  }
  .image-container .moto {
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
</style>


<script>

import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import EventiView from './eventi/EventiView.vue'

export default {
    name: 'HomePage',
    components: {
        EventiView,
    },
    data() {
        return {
            eventi: [],
            organizzatoreId: ""
        }
    },
    methods: {
            async aggiornaLista() {
                const q = query(
                    collection(db, "eventi")
                );

                const snapshot = await getDocs(q)
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