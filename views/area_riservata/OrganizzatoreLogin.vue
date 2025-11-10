
<template>
    <div class="form-login">
        <div>Email</div>
        <input v-model="email" type="text" placeholder="">

        <div>Password</div>
        <input v-model="password" type="text" placeholder="">
        
        <button @click="login">Login</button>

        <div class="registrati-link">Non hai un account? <router-link to="/area-riservata/organizzatore-registrati">Registrati</router-link></div>
    </div>
</template>

<style>
    .form-login {
        display: flex;
        flex-direction: column;
        width: 300px;
        align-items: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .form-login button {
        margin-top: 10px;
    }

    .registrati-link {
        margin-top: 10px;
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