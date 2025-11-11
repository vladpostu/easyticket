
<template>
    <h2 class="mt-5">Login</h2>
    <div class="form-login">
        <div class="input-group">
            <label class="form-label">Email</label>
            <input v-model="email" type="text" placeholder="" id="email_organizzatore" class="form-control">
        </div>

        <div class="input-group">
            <label class="form-label">Password</label>
            <input v-model="password" type="text" placeholder="" id="email_organizzatore" class="form-control">
        </div>
        
        <button class="btn btn-primary" @click="login">Login</button>

        <div class="registrati-link mt-2">Non hai un account? <router-link to="/area-riservata/organizzatore-registrati">Registrati</router-link></div>
    </div>
</template>

<style scoped>
    .form-login {
        display: flex;
        flex-direction: column;
        width: 250px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        align-items: center;
        margin-top: 50px;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        margin-bottom: 20px;
    }

    .input-group label {
        margin-left: 10px;
    }

    .input-group input {
        width: 100%;
    }

    .form-login button {
        margin-top: 30px;
        width: 100px;
    }
</style>

<script>
import { getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: "OrganizzatoreLogin",
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async login() {
            try {
                const cred = await signInWithEmailAndPassword(
                    auth, this.email, this.password
                )
                
                const userDoc = await getDoc(doc(db, "organizzatori", cred.user.uid));
                console.log(userDoc)

                localStorage.setItem("organizzatoreId", cred.user.uid)
                this.$router.push({name: "AreaOrganizzatore"})
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
    }
}
</script>