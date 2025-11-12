<template>
  <div class="partecipante-view">
    <div v-if="partecipante" class="partecipante-info">
      <h3>{{ partecipante.nome }} {{ partecipante.cognome }}</h3>
      <div class="dati-partecipante">
        <div><strong>Data di nascita:</strong> {{ partecipante.data_di_nascita }}</div>
        <div><strong>Email:</strong> {{ partecipante.email }}</div>
      </div>
    </div>

    <div v-if="qrPartecipanteId" class="qr-container">
      <img :src="qrPartecipanteId" alt="QR Code Partecipante" class="qr-img" />
      <div class="qr-label">Mostra questo QR al check-in</div>
    </div>
  </div>
</template>

<style scoped>
.partecipante-view {
  max-width: 500px;
  margin: 50px auto;
  background: #fff;
  padding: 24px 28px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  font-family: "Inter", system-ui, sans-serif;
  text-align: center;
}

.partecipante-info h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1a1a1a;
}

.dati-partecipante {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 30px;
}

.dati-partecipante div {
  margin: 6px 0;
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border: 2px solid #2563eb;
  border-radius: 12px;
  margin-bottom: 12px;
}

.qr-label {
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
}

@media (max-width: 500px) {
  .qr-img {
    width: 150px;
    height: 150px;
  }
}
</style>

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