<template>
    <div v-if="partecipante">
        {{ partecipante.nome }}
    </div>
    <div v-if="partecipanteId">
        <img :src="qrPartecipanteId" alt="QR CODE">
    </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore"
import { db } from '../firebase/firebase'
import QRCode from 'qrcode'


export default {
    name: "PartecipanteView",
    props: ["eventoId", "partecipanteId"],
    data() {
        return {
            partecipante: null,
            qrPartecipanteId: "",
        }
    },
    methods: {
    },
    async mounted() {
        const partecipanteRef = doc(db, "eventi", this.eventoId, "partecipanti", this.partecipanteId);
        const snapshot = await getDoc(partecipanteRef);
        this.partecipante = snapshot.data();

        const partecipanteId = snapshot.id;
        const qrUrl = await QRCode.toDataURL(partecipanteId);
        this.qrPartecipanteId = qrUrl;

    }
}
</script>