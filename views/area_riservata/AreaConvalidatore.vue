<template>
  <div class="area-convalidatore">
    <header>
      <h2>{{ $t("validatorArea") }}</h2>
      <p class="subtitle" v-if="!isLogged">{{ $t("validatorAreaText") }}</p>
    </header>

    <!-- LOGIN FORM -->
    <div v-if="!isLogged" class="form-container">
      <div class="form-group">
        <label for="alias_evento">{{ $t("aliasEvent") }}</label>
        <input
          v-model="evento"
          type="text"
          id="alias_evento"
          placeholder=""
        />
      </div>

      <div class="form-group">
        <label for="password_evento">{{ $t("password") }}</label>
        <input
          v-model="password"
          type="password"
          id="password_evento"
          placeholder=""
        />
      </div>

      <div v-if="loginFailed" class="form-feedback">
        <transition name="fade">
          <div v-if="loginFailed" class="error-message">
            {{ $t("validatorLoginFailed") }}
          </div>
        </transition>
      </div>

      <small class="form-text">{{ $t("credentialsFromOrganizer") }}</small>

      <button class="btn-primary" @click="convalidatoreLogin">{{ $t("loginButton") }}</button>
    </div>

    <!-- SEZIONE CONVALIDA -->
    <div v-else class="scanner-section">
      <ApriFotocamera @emitQRCode="gestisciQR" />

      <div v-if="idPartecipante" class="partecipante">
        <h4>{{ $t("infoParticipant") }}</h4>
        <div class="info">
          <div><strong>{{ $t("name") }}:</strong> {{ datiPartecipante.nome }}</div>
          <div><strong>{{$t("surname")}}:</strong> {{ datiPartecipante.cognome }}</div>
          <div><strong>{{$t("dateOfBirth")}}:</strong> {{ datiPartecipante.dataNascita }}</div>
        </div>

        <div class="conferma">
          <div v-if="datiPartecipante.presenzaConfermata" class="alert alert-warning">
            {{ $t("alreadyConfirmed") }}
          </div>

          <div v-else>
            <p>{{ $t("dataIsCorrectMessage") }}</p>
            <button class="btn-confirm" @click="confermaPartecipazione">{{ $t("confirmPresence") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.area-convalidatore {
  max-width: 400px;
  margin: 50px auto;
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

.form-group input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #0C2B4E;
  box-shadow: 0 0 4px rgba(12, 43, 78, 0.25);
}

.form-text {
  font-size: 0.85rem;
  color: #6c757d;
  text-align: center;
}

.btn-primary {
  background-color: #0C2B4E;
  border: none;
  color: #fff;
  padding: 10px 22px;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.btn-primary:hover {
  background-color: #174170;
}

/* --- SEZIONE SCANNER --- */
.scanner-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

/* --- PARTECIPANTE --- */
.partecipante {
  background-color: #1D546C;
  color: #F4F4F4;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 8px 20px;
}

.partecipante h4 {
  margin-bottom: 20px;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.info div {
  margin-bottom: 8px;
  font-size: 1rem;
}

.conferma {
  text-align: center;
  margin-top: 25px;
}

.btn-confirm {
  background-color: #28a745;
  border: none;
  padding: 10px 22px;
  color: white;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.btn-confirm:hover {
  background-color: #218838;
}

/* --- ALERT --- */
.alert {
  padding: 10px;
  border-radius: 6px;
  font-weight: 500;
}

.alert-warning {
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

/* --- PASSWORD FEEDBACK --- */
.form-feedback {
  min-height: 24px;
  display: flex;
  align-items: center;
}

.error-message {
  background-color: #ffe8e8;
  color: #b91c1c;
  border: 1px solid #fca5a5;
  border-radius: 6px;
  font-size: 0.85rem;
  padding: 6px 10px;
  width: 100%;
  text-align: center;
  animation: shake 0.25s ease-in-out;
}

/* Fade-in effect for smooth appearance */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Subtle shake animation for visibility */
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
}

/* --- RESPONSIVE --- */
@media (max-width: 500px) {
  .form-container {
    padding: 25px 20px;
  }

  .partecipante {
    padding: 20px;
  }

  .btn-confirm,
  .btn-primary {
    padding: 10px;
    font-size: 0.9rem;
  }
}
</style>


<script>
import { db } from '../../firebase/firebase';
import { collection, query, where, getDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import ApriFotocamera from '@/components/ApriFotocamera.vue';

export default {
    name: "AreaConvalidatore",
    data() {
        return {
            isLogged:  null,
            evento: "", //Evento inteso come aliasEvento su AddEvent
            password: "", 
            eventoId: "",
            idPartecipante: "",
            datiPartecipante: {
                nome: "",
                cognome: "",
                dataNascita: "",
                presenzaConfermata: null,
            },
            loginFailed: false,
        }
    },

    components: {
        ApriFotocamera,
    },
 
    beforeMount() {
        this.isLogged = false;
    },
    methods: {
        async convalidatoreLogin() {
            const q = query(
                collection(db, "eventi"),
                where("aliasEvento", "==", this.evento),
                where("passwordConvalidatori", "==", this.password)
            );

            const snapshot = await getDocs(q);

            if(!snapshot.empty) {
                this.eventoId = snapshot.docs[0].id;
                localStorage.setItem("convalidatoreEvento", this.evento);
                localStorage.setItem("convalidatorePassword", this.password);
                localStorage.setItem("convalidatoreLogged", "true");
                this.isLogged = true;
            } else {
                this.loginFailed = true;
            }
        },
        gestisciQR(qrData) {
            this.idPartecipante = qrData;
            this.recuperaDatiPartecipante();
        },
        async recuperaDatiPartecipante() {
            try {
                const partecipanteRef = doc(db, "eventi", this.eventoId, "partecipanti", this.idPartecipante)

                const snapshot = await getDoc(partecipanteRef);

                if(snapshot.exists()) {
                    const data = snapshot.data();
                    this.datiPartecipante = {
                        nome: data.nome,
                        cognome: data.cognome,
                        dataNascita: data.data_di_nascita,
                        presenzaConfermata: data.presenzaConfermata
                    }
                }
            } catch(error) {
                console.log(error)
            }
        },
        async confermaPartecipazione() {
            const partecipanteRef = doc(db, "eventi", this.eventoId, "partecipanti", this.idPartecipante)
            
            try {
                await updateDoc(partecipanteRef, {
                    presenzaConfermata: true,
                });
                this.datiPartecipante.presenzaConfermata = true
            } catch(error) {
                console.log(error)
            }
            
        }
    },
    // beforeUnmount() {
    //     localStorage.removeItem("convalidatoreLogged");
    //     this.isLogged = false;
    // }
}
</script>

