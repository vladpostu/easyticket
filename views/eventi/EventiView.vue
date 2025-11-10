<template>
    <div class="eventi">
        <router-link :to="{name: 'EventoView', params: {eventoId: evento.id}}" v-for="evento in eventi" :key="evento.id" class="card" style="width: 18rem;">
            <img :src="evento.imgCopertina" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{evento.nome_evento}}</h5>
                <p>{{ evento.data }}</p>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    card’s content.</p>
            </div>
        </router-link>
    </div>
</template>
<!-- <div class="evento-container">
        <div v-for="evento in eventi" :key="evento.id" class="evento">
            <router-link :to="{ name: 'EventoView', params: { eventoId: evento.id } }" class="evento">
                <div class="evento-copertina-wrapper">
                    <img :src="evento.imgCopertina" alt="" class="evento-copertina">
                </div>
                <div class="dettagli-evento">
                    <div class="nome-evento"> {{evento.nome_evento }}</div>
                    <div class="data-evento"> {{ evento.data }}</div>
                </div>
            </router-link>
        </div>
</div> -->
<style scoped>
    .eventi {
        width: 90%;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        align-items: baseline;
        justify-content: center;
    }

    .card img {
        height: 300px;
    }

    a {
        text-decoration: none;
    }
</style>

<script>
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default {
    name: "EventiView",
    data() {
        return {
            eventi: []
        }
    },
    props: ["organizzatoreId"],
    methods: {
        async fetchEventi() {
            if (this.organizzatoreId == "") {
                const eventiRef = collection(db, "eventi")
                const snapshot = await getDocs(eventiRef)

                this.eventi = snapshot.docs.map((evento) => ({
                    id: evento.id,
                    ...evento.data()
                }))
            } else {
                const q = query(collection(db, "eventi"),
                    where("idOrganizzatore", "==", this.organizzatoreId)
                )

                const snapshot = await getDocs(q);
                this.eventi = snapshot.docs.map((evento) => ({
                    id: evento.id,
                    ...evento.data()
                }))
            }
        }
    },
    mounted() {
        this.fetchEventi();
    }
}
</script>