<template>
    <h2 class="mt-5">Registrati</h2>
    <div class="form-login">
        <div class="input-group">
            <label class="form-label">Email</label>
            <input class="form-control" v-model="email" type="text" placeholder="">
        </div>
        <div class="input-group">
            <label class="form-label">Password</label>
            <input class="form-control" v-model="password" type="text" placeholder="">
        </div>        
        <button class="btn btn-primary mt-4" @click="addOrganizzatore">Crea Account</button>
        <small class="mt-2">I tuoi dati sono al sicuro grazie alla crittografia Google</small>
    </div>
</template>

<style>
    .form-login{
        width: 250px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 50px;
    }

    .input-group {
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
    }

    .input-group input {
        width: 100% !important;
    }

    button {
        width: 150px !important;
    }

</style>

<script>
import {doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default {
    name: "OrganizzatoreRegistrati",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        async addOrganizzatore() {
            try {
                const cred = await createUserWithEmailAndPassword(
                    auth, this.email, this.password
                )

                await setDoc(doc(db, "organizzatori", cred.user.uid), {
                    email: this.email,
                    createdAt: new Date(),
                });


                // localStorage.setItem("organizzatoreId", docRef.id);
                // localStorage.setItem("organizzatoreEmail", this.email);

                this.$router.push("/area-riservata/area-organizzatore")
            } catch(error) {
                console.error(error);
            }

            this.email = "";
            this.password = "";
        }
    }
}
</script>