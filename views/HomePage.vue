<template>
    <div class="image-container">
        <img src="../src/assets/imgs/crowd-1056764_1280.jpg" alt="" />
        <div class="moto">Scopri gli eventi dedicati a te</div>
    </div>
    <EventiView :organizzatoreId=this.organizzatoreId />
    <!-- <div class="eventi">
        <div>Ultime aggiunte</div>
        <div class="eventi-container">
            <div v-for="evento in eventi" :key="evento.id" class="evento">
                <router-link :to="{ name: 'EventoView', params: { eventoId: evento.id } }">
                    <div class="evento_nome">
                        {{  evento.nome_evento }}
                    </div> 
                    <div class="evento_data">
                        {{  evento.data }}
                    </div>
                </router-link>
            </div>
        </div>
    </div> -->
</template>

<style scoped>
    .image-container {
        position: relative;
        height: 250px;
        width: 100%;
        overflow: hidden;
    }

    .image-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    .image-container::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.45); /* cambia l’opacità a piacere */
        z-index: 1;
    }

    .image-container .moto {
        font-size: 2em;
        position: absolute;
        color: rgb(255, 255, 255);
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        text-shadow: 0 5px 10px rgba(0, 0, 0, 0.7);
        font-weight: 700;
        z-index: 2;
    }


</style>

<script>

import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import EventiView from './eventi/EventiView'

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