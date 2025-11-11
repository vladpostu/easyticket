
<template>
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
        width: 300px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        top: 100px;
        align-items: center;
    }

    .input-group {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: flex-start;
        margin-top: 20px;
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
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

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
                const q = query(
                    collection(db, "organizzatori"),
                    where("email", "==", this.email),
                    where("password", "==", this.password)
                )

                const snapshot = await getDocs(q);

                if(!snapshot.empty) {
                    const user = snapshot.docs[0];
                    localStorage.setItem("organizzatoreId", user.id),
                    localStorage.setItem("organizzatoreEmail", this.email);

                    this.$router.push("/area-riservata/area-organizzatore");
            }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        if(localStorage.getItem("organizzatoreEmail")) {
            this.$router.push("/area-riservata/area-organizzatore")
        }
    }
}
</script>