<template>
  <div class="area-organizzatore">
    <header>
      <h2>{{ $t("register") }}</h2>
      <p class="subtitle">{{ $t("organizerRegisterText") }}</p>
    </header>

    <div class="form-container">
      <div class="form-group">
        <label for="email_organizzatore">{{ $t("email") }}</label>
        <input v-model="email" type="email" ref="emailInput" id="email_organizzatore" placeholder="" />
      </div>


      <div class="form-group">
        <label for="password_organizzatore">{{ $t("password") }}</label>
        <input v-model="password" type="password" id="password_organizzatore" placeholder="" />
        <div class="form-text" style="font-size: 0.75em;">{{ $t("strongPasswordText") }}</div>
      </div>

      <div class="form-group">
        <label for="password_organizzatore">{{ $t("repeatPassword") }}</label>
        <input v-model="passwordRepeat" type="password" id="password_organizzatore_repeat" placeholder=""
          @blur="validatePassword" 
          @input="validatePassword"/>
      </div>

      <div class="form-feedback">
        <transition name="fade">
          <div v-if="!validPassword && passwordRepeat.length > 0" class="error-message">
            {{ $t("passwordDoesntMatch") }}
          </div>
        </transition>
      </div>


      <button :disabled="!validPassword" class="btn-primary" @click="addOrganizzatore">{{ $t("createAccount") }}</button>

      <div class="registrati-link">
        {{ $t("alreadyHaveAccount") }}
        <router-link to="/area-riservata/organizzatore-login">{{ $t("loginButton") }}</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

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
  display: block;
  margin: 0 auto; /* centrato orizzontalmente */
}


.btn-primary:hover {
  background-color: #174170;
}

.btn-primary:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  opacity: 0.7;
  transform: none;
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
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';


export default {
  name: "OrganizzatoreRegistrati",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      validPassword: false,
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

        signInWithEmailAndPassword(auth, this.email, this.password)

        // localStorage.setItem("organizzatoreId", docRef.id);
        // localStorage.setItem("organizzatoreEmail", this.email);

        this.$router.push("/area-riservata/area-organizzatore")
      } catch (error) {
        console.error(error);
      }

      this.email = "";
      this.password = "";
    },
    validatePassword() {
      const toInclude = ["!", "$", "@", "#"]
      const hasSomeIncluded = toInclude.some(e => this.password.includes(e))
      this.validPassword = (this.password == this.passwordRepeat && hasSomeIncluded && !(this.password.length < 8));
    }
  }
}


</script>