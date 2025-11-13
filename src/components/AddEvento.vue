<template>
  <div class="area-add-evento">
    <header>
      <h2>{{ $t("addEvent") }}</h2>
      <p class="subtitle">{{ $t("addEventText") }}</p>
    </header>

    <div class="form-container">
      <div class="form-group">
        <label for="nome_evento">{{ $t("nameEvent") }}</label>
        <input
          v-model="nome_evento"
          type="text"
          id="nome_evento"
          placeholder="Summer Fest 2025"
        />
      </div>

      <div class="form-group">
        <label for="data_evento">{{ $t("dateEvent") }}</label>
        <input v-model="data" type="date" id="data_evento" />
      </div>

      <div class="form-group">
        <label for="password_convalidatori">{{ $t("validatorsPassword") }}</label>
        <input
          v-model="passwordConvalidatori"
          type="text"
          id="password_convalidatori"
          placeholder=""
        />
        <small class="form-text">Fornisci questa password ai tuoi convalidatori per l’accesso.</small>
      </div>

      <div class="form-group upload">
        <label for="inputGroupFile01">{{ $t("imgCover") }}</label>
        <input
          type="file"
          id="inputGroupFile01"
          @change="onFileChange"
          class="form-control"
        />
      </div>

      <div v-if="aliasEvento" class="alert-success">
        <p>{{ $t("successfullyInsertEvent") }}</p>
        <p><strong>{{$t("aliasEventGenerated")}}</strong> <span>{{ aliasEvento }}</span></p>
      </div>

      <button class="btn-primary btn-center" @click="inserisciEvento">{{ $t("insertEvent") }}</button>
    </div>
  </div>
</template>

<style scoped>
.area-add-evento {
  max-width: 420px;
  margin: 60px auto;
  padding: 0 20px 80px;
  font-family: "Inter", system-ui, sans-serif;
  color: #0C2B4E;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h2 {
  font-weight: 700;
  color: #0C2B4E;
  margin-bottom: 10px;
}

.subtitle {
  color: #1D546C;
  font-weight: 400;
  font-size: 0.95rem;
}

/* --- FORM --- */
.form-container {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 40px 30px;
  box-shadow: rgba(0, 0, 0, 0.12) 0 5px 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #0C2B4E;
}

.form-group input[type="text"],
.form-group input[type="date"] {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-group input[type="text"]:focus,
.form-group input[type="date"]:focus {
  outline: none;
  border-color: #0C2B4E;
  box-shadow: 0 0 4px rgba(12, 43, 78, 0.25);
}

/* --- FILE INPUT STYLING --- */
.form-group input[type="file"] {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.form-group input[type="file"]:hover {
  border-color: #0C2B4E;
  background-color: #f0f0f0;
}

/* --- ALERT --- */
.alert-success {
  background-color: #d1e7dd;
  color: #0f5132;
  border: 1px solid #badbcc;
  border-radius: 8px;
  padding: 15px 18px;
  font-size: 0.95rem;
  text-align: center;
}

.alert-success span {
  display: block;
  font-weight: 700;
  color: #0c2b4e;
  font-size: 1rem;
  margin-top: 4px;
}

/* --- BUTTON --- */
.btn-primary {
  background-color: #0C2B4E;
  border: none;
  color: #fff;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #174170;
}

/* --- CENTRATO --- */
.btn-center {
  display: block;
  margin: 30px auto 0 auto;
  width: 50%;
  text-align: center;
}

/* --- RESPONSIVE --- */
@media (max-width: 500px) {
  .form-container {
    padding: 25px 20px;
  }

  .btn-primary {
    width: 100%;
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>



<script>
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
    name: 'AddEvento',
    data() {
        return {
            nome_evento: '',
            data: '',
            emailOrganizzatore: "",
            idOrganizzatore: "",
            aliasEvento: "",
            passwordConvalidatori: "",
            imgCopertina: null, 
        }
    },
    methods: {
        async inserisciEvento() {
            this.emailOrganizzatore = localStorage.getItem("organizzatoreEmail");
            this.idOrganizzatore = localStorage.getItem("organizzatoreId");
   
            let imgCopertinaURL = "";

            if(this.imgCopertina) {
                const storageRef = ref(storage, `copertine/${this.imgCopertina.name}`)
                await uploadBytes(storageRef, this.imgCopertina)
                imgCopertinaURL = await getDownloadURL(storageRef)
            }

            const nuovoEvento = {
                nome_evento: this.nome_evento,
                data: this.data,
                emailOrganizzatore: this.emailOrganizzatore,
                idOrganizzatore: this.idOrganizzatore,
                aliasEvento: this.nome_evento.slice(0, 3) + this.data,
                passwordConvalidatori: this.passwordConvalidatori,
                imgCopertina: imgCopertinaURL,
            }


            try {
                await addDoc(collection(db, 'eventi'), nuovoEvento)
                this.aliasEvento = nuovoEvento.aliasEvento
                this.data = ''
                this.nome_evento = ''
                this.$emit('eventoInserito')
            } catch(error) {
                console.log(error)
            }
        },
        onFileChange(e) {
            this.imgCopertina = e.target.files[0];
        }
    }
}
</script>