
<template>
  <div class="area-organizzatore">
    <header>
      <h2>{{ $t("organizerAccess") }}</h2>
      <p class="subtitle">{{ $t("organizerAccessText") }}</p>
    </header>

    <div class="form-container">
      <div class="form-group">
        <label for="email_organizzatore">{{$t("email")}}</label>
        <input
          v-model="email"
          type="email"
          id="email_organizzatore"
          placeholder=""
        />
      </div>

      <div class="form-group">
        <label for="password_organizzatore">{{ $t("password") }}</label>
        <input
          v-model="password"
          type="password"
          id="password_organizzatore"
          placeholder=""
        />
      </div>

      <button class="btn-primary" @click="login">{{$t("loginButton")}}</button>

      <div class="registrati-link">
        {{ $t("dontHaveAccount") }}
        <router-link to="/area-riservata/organizzatore-registrati">{{ $t("register") }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.area-organizzatore {
  max-width: 400px;
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
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.btn-primary:hover {
  background-color: #174170;
}

/* --- LINK --- */
.registrati-link {
  text-align: center;
  font-size: 0.9rem;
  color: #334155;
}

.registrati-link a {
  color: #0C2B4E;
  font-weight: 600;
  text-decoration: none;
}

.registrati-link a:hover {
  text-decoration: underline;
}

/* --- RESPONSIVE --- */
@media (max-width: 500px) {
  .form-container {
    padding: 25px 20px;
  }

  .btn-primary {
    padding: 10px;
    font-size: 0.9rem;
  }
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