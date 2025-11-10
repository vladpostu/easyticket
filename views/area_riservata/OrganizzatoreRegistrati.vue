<template>
    <div class="form-login">
        <div>Email</div>
        <input v-model="email" type="text" placeholder="">

        <div>Password</div>
        <input v-model="password" type="text" placeholder="">
        
        <button @click="addOrganizzatore">Crea Account</button>
    </div>
</template>

<script>
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

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
                const docRef = await addDoc(collection(db, "organizzatori"), {
                    email: this.email,
                    password: this.password
                })

                localStorage.setItem("organizzatoreId", docRef.id);
                localStorage.setItem("organizzatoreEmail", this.email);

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