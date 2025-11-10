<template>
    <div class="form" v-if="!isLogged">
        {{ isLogged }}

        <input v-model="evento" type="text" placeholder="Evento">
        <input v-model="password" type="text" placeholder="password">
        <button @click="convalidatoreLogin">login</button>
    </div>
    <ApriFotocamera @emitQRCode="gestisciQR"/>
    <div v-if="isLogged">
        <div v-if="idPartecipante">
            <div>Dettagli Partecipante</div>
        <div>
            <div>{{ idPartecipante }}</div>
            <div> {{ datiPartecipante.nome }} </div>
            <div> {{ datiPartecipante.cognome }} </div>
            <div> {{ datiPartecipante.dataNascita }} </div>
        </div>
        <div v-if="idPartecipante" class="conferma_partecipante">
            <div>I dati sono corretti?</div>
            <div v-if="datiPartecipante.presenzaConfermata">Presenza già confermata</div>
            <div v-else class="conferma-buttons">
                <button @click="confermaPartecipazione">Conferma</button>
            </div>
        </div>
    </div>
    </div>
</template>

<style>
    .form {
        display: flex;
        flex-direction: column;
        width: 300px;
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
        if(localStorage.getItem("convalidatoreLogged")) {
            this.isLogged = true;
        }
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

