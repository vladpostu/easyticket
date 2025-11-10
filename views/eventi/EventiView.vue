<template>
    <div class="evento-container">
        <div v-for="evento in eventi" :key="evento.id">
            {{  evento.nome_evento }}
        </div>
    </div>
</template>

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
            if(this.organizzatoreId == "") {
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