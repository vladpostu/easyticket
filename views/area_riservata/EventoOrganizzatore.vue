<template>
  <div v-if="evento" class="mt-5">
    <h3>{{ evento.nome_evento }}</h3>
    <div>{{ invertiData(evento.data) }}</div>
  </div>

  <div class="partecipanti-label">{{ $t("participants") }}</div>

  <!-- Input ricerca -->
  <div class="search-wrapper">
    <label for="" class="mb-2">{{ $t("searchParticipant") }}</label>
    <input
      type="text"
      v-model="screaming"
      placeholder=""
      class="search-input"
    />
    <span v-if="screaming" class="clear-btn" @click="screaming=''">&times;</span>
  </div>

  <div class="partecipanti">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{{ $t("name") }}</th>
          <th scope="col">{{ $t("surname") }}</th>
          <th scope="col">{{ $t("dateOfBirth") }}</th>
          <th scope="col">{{ $t("presenceConfirmed") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(partecipante, index) in partecipantiFiltrati" :key="partecipante.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ partecipante.nome }}</td>
          <td>{{ partecipante.cognome }}</td>
          <td>{{ partecipante.data_di_nascita }}</td>
          <td v-if="partecipante.presenzaConfermata"><i class="bi bi-check-square-fill"></i></td>
          <td v-else><i class="bi bi-ban"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
/* --- Contenitore input ricerca --- */
/* === CONTENITORE GENERALE === */
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

/* === LABEL PARTECIPANTI === */
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

/* === INPUT RICERCA === */
.search-wrapper {
  width: 90%;
  max-width: 400px;
  margin: 20px auto 40px;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #0C2B4E;
  box-shadow: 0 0 4px rgba(12, 43, 78, 0.3);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.2rem;
  color: #999;
  user-select: none;
  transition: color 0.2s ease;
}

.clear-btn:hover {
  color: #0C2B4E;
}

/* === CONTENITORE TABELLA === */
.partecipanti {
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
}

/* === TABELLA === */
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.table thead {
  background-color: #f8f9fb;
  border-bottom: 2px solid #e5e7eb;
}

.table thead th {
  font-weight: 600;
  color: #374151;
  padding: 12px 10px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-align: left;
}

.table tbody td,
.table tbody th {
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
}

/* Colonna numerica centrata */
.table th[scope="row"] {
  text-align: center;
  width: 40px;
}

/* Colonne Nome e Cognome allineate a sinistra */
.table td:nth-child(2),
.table th:nth-child(2),
.table td:nth-child(3),
.table th:nth-child(3) {
  text-align: left;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Colonna Data centrata */
.table td:nth-child(4),
.table th:nth-child(4) {
  text-align: center;
  width: 150px;
}

.table td:nth-child(5),
.table th:nth-child(5) {
  text-align: center;
  width: 150px;
  text-wrap: nowrap;
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

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .partecipanti {
    padding: 16px;
  }

  .table {
    font-size: 0.9rem;
  }

  .table thead th {
    font-size: 0.8rem;
  }

  .table tbody td,
  .table tbody th {
    padding: 8px 6px;
  }
}


</style>

<script>
import { db } from '../../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { invertiData } from '@/utils/dateUtils';

export default {
  name: "EventoOrganizzatore",
  props: ["eventoId"],
  data() {
    return {
      evento: null,
      partecipanti: [],
      screaming: ""
    }
  },
  methods: {
    invertiData,
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
  computed: {
    partecipantiFiltrati() {
      if (!this.screaming) return this.partecipanti
      let search = this.screaming.toLocaleLowerCase();
      search = search.trim()

      return this.partecipanti.filter((p) => {
        let fullName = (p.nome.toLocaleLowerCase() + " " + p.cognome.toLocaleLowerCase())
        let fullNameReverse = (p.cognome.toLocaleLowerCase() + " " + p.nome.toLocaleLowerCase())
        return (fullName.includes(search) || fullNameReverse.includes(search))
      }
      )
    }
  },
  mounted() {
    this.fetchDatiEvento();
  }
}
</script>