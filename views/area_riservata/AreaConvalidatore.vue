<template>
    <h2 class="mt-4">Area Convalidatore</h2>
    <div class="form mt-5" v-if="!isLogged">
        <div class="input-group">
            <label for="alias_evenato">Alias Evento</label>
            <input v-model="evento" type="text" placeholder="" id="alias_evento" class="form-control"/>
        </div>
        <div class="input-group">
            <label for="password_evento">Password</label>
            <input v-model="password" type="text" placeholder="" id="password_evento" class="form-control"/>
        </div>
        <div class="form-text">Le credenziali devono essere fornite dall'organizzatore</div>
        <button class="btn btn-primary mt-4" @click="convalidatoreLogin">Login</button>
    </div>
    <div v-if="isLogged">
         <ApriFotocamera @emitQRCode="gestisciQR"/>
        <div v-if="idPartecipante" class="partecipante mt-5">
            <div class="bold">Dettagli Partecipante</div>
            <div class="big"> {{ datiPartecipante.nome }} {{ datiPartecipante.cognome }}</div>
            <div class="big"> {{ datiPartecipante.dataNascita }} </div>
        <div>
        </div>
        <div v-if="idPartecipante" class="conferma_partecipante mt-5">
            <div v-if="!datiPartecipante.presenzaConfermata">I dati sono corretti?</div>
            <div v-if="datiPartecipante.presenzaConfermata" class="alert alert-warning" role="alert">Presenza già confermata</div>
            <div v-else class="conferma-buttons">
                <button @click="confermaPartecipazione">Conferma</button>
            </div>
        </div>
    </div>
    </div>
</template>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        width: 250px;
        align-items: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .conferma-partecipante {
        margin-top: 50px;
    }

    .conferma-buttons {
        margin-top: 50px;
    }

    .conferma-buttons > button {
        margin: 10px;
    }

    .input-group label {
        margin-left: 5px;
    }

    .form-text {
        text-wrap: nowrap;
    }

    .partecipante {
        width: 500px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .bold {
        font-weight: 700;
    }

    .big {
        font-size: 1.5em;
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
            evento: "", //Evento inteso come aliasEvento su AddEvento
            password: "", 
            eventoId: "",
            idPartecipante: "",
            datiPartecipante: {
                nome: "",
                cognome: "",
                dataNascita: "",
                presenzaConfermata: null,
            }
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
                alert("credenziali errate");
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

