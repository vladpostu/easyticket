<template>
    <div v-if="evento" class="mt-5">
        <h3>{{ evento.nome_evento }}</h3>
        <div> {{ evento.data }}</div>
    </div>
    <div class="partecipanti-label">Partecipanti</div>
    <div class="partecipanti">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Cognome</th>
                    <th scope="col">Data di Nascita</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(partecipante, index) in partecipanti" :key="partecipante.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{partecipante.nome}}</td>
                    <td>{{ partecipante.cognome }}</td>
                    <td>{{ partecipante.data_di_nascita }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
/* === Struttura generale === */
.mt-5 {
  margin-top: 3rem;
  text-align: center;
  font-family: "Inter", system-ui, sans-serif;
  color: #1a1a1a;
}

h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.mt-5 > div {
  font-size: 1.1rem;
  color: #6b7280;
}

/* === Label partecipanti === */
.partecipanti-label {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #111827;
  text-align: left;
  width: 90%;
  max-width: 900px;
  margin: 40px auto 10px auto;
  border-left: 4px solid #2563eb;
  padding-left: 10px;
}

/* === Contenitore tabella === */
.partecipanti {
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  overflow-x: auto; /* scroll solo se serve */
}

/* === Tabella === */
.table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* evita che collassi su schermi piccoli */
  font-size: 0.95rem;
}

.table thead {
  background-color: #f8f9fb;
  border-bottom: 2px solid #e5e7eb;
}

.table thead th {
  text-align: left;
  font-weight: 600;
  color: #374151;
  padding: 14px 12px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.table tbody td,
.table tbody th {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
}

/* Riga alternata */
.table-striped tbody tr:nth-child(odd) {
  background-color: #fafbfc;
}

/* Hover effetto */
.table tbody tr:hover {
  background-color: #f1f5f9;
  transition: background 0.2s ease;
}

/* Prima colonna numerica */
.table th[scope="row"] {
  text-align: center;
  font-weight: 600;
  color: #2563eb;
}

/* === Responsive === */
@media (max-width: 768px) {
  .partecipanti {
    padding: 16px;
  }

  .table {
    font-size: 0.9rem;
    min-width: unset; /* lascia la tabella scrollabile */
  }

  .table thead th {
    font-size: 0.8rem;
  }

  .table tbody td,
  .table tbody th {
    padding: 10px;
  }
}
</style>



<script>
import { db } from '../../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export default {
    name: "EventoOrganizzatore",
    props: ["eventoId"],
    data() {
        return {
            evento: null,
            partecipanti: []
        }
    },
    methods: {
        async fetchDatiEvento() {
            try {
                const eventoRef = doc(db, "eventi", this.eventoId)
                const snapshot = await getDoc(eventoRef)

                if (snapshot.exists()) {
                    this.evento = snapshot.data()
                }

                const partecipantiRef = collection(db, "eventi", this.eventoId, "partecipanti")
                const snapshotPartecipanti = await getDocs(partecipantiRef)

                if (!snapshotPartecipanti.empty) {
                    this.partecipanti = snapshotPartecipanti.docs.map(e => ({
                        id: e.id,
                        ...e.data(),
                    }))
                } else {
                    this.partecipanti = []
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted() {
        this.fetchDatiEvento();
    }
}
</script>