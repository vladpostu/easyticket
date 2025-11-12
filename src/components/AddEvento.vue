<template>
    <h2 class="mt-5">Aggiungi evento</h2>
    <div class="form-evento form-group">
        <div class="form-group">
            <label for="nome_evento">Nome Evento</label>
            <input v-model="nome_evento" class="form-control" type="text" placeholder="" id="nome_evento"/>
        </div>
        <div class="form-group">
            <label for="data_evento">Data Evento</label>
            <input v-model="data" class="form-control" type="date" id="data_evento" placeholder="">
        </div>
        <div class="form-group">
            <label for="password_convalidatori">Password Convalidatori</label>
            <input v-model="passwordConvalidatori" class="form-control" placeholder="" type="text">
            <small class="form-text text-muted">La password verrà usata dai tuoi convalidatori</small>
        </div>
        <div class="form-group upload-file">
            <label for="inputGroupFile01">Seleziona un'immagine di copertina</label>
            <div class="input-group mb-3">
                <input type="file" class="form-control" id="inputGroupFile01" placeholder="" @change="onFileChange">
            </div>
        </div>

        <div v-if="aliasEvento" class="alert alert-success mt-3" role="alert">
            <div>Evento inserito corretamente, alias:</div>
            <div class="fs-4 fw-bold"> {{ aliasEvento }} </div>
        </div>

        <button @click="inserisciEvento" type="button" class="btn btn-primary">Inserisci</button>
    </div>
</template>

<style scoped>
    .form-evento {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 50px;
        width: 400px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: start;
        width: 300px;
    }

    .custom-file {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .form-group label {
        margin-left: 10px;
        margin-top: 10px;
    }

    .form-group input {
        width: 100%;
    }

    .btn {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;
        font-weight: 700;
    }

    .input-group {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: flex-start;
    }

    .upload-file {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .btn-upload-file {
        align-self: flex-start;
        transform: none;
        left: auto;
        margin: -5px 0 0 2px;
        font-size: 0.90em;
        border: none;
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