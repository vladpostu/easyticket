<template>
  <div class="area-organizzatore">
    <header class="header">
      <div class="intestazione">
        <h2>Area Organizzatore</h2>
        <h5><span class="light">Ciao,</span> {{ currentUser.email }}</h5>
      </div>
      <button class="logout-button" @click="logout">Esci</button>
    </header>

    <main class="contenuto">
      <router-link
        class="btn btn-primary"
        to="/area-riservata/area-organizzatore/aggiungi-evento"
      >
        + Aggiungi un nuovo evento
      </router-link>

      <section class="eventi-org">
        <h6 class="fw-bold">I tuoi eventi</h6>
        <EventiView class="eventi-comp" :organizzatoreId="organizzatoreIdRecuperato" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.area-organizzatore {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 80px 20px;
  color: #0C2B4E;
  font-family: "Inter", system-ui, sans-serif;
}

/* --- Header --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.intestazione {
  text-align: left;
}

h2 {
  font-weight: 700;
  color: #0C2B4E;
  margin-bottom: 5px;
}

h5 {
  font-weight: 400;
  color: #1D546C;
  margin: 0;
}

.light {
  font-weight: 300;
}

/* --- Logout button --- */
.logout-button {
  border: 2px solid #dc3545;
  background-color: transparent;
  color: #dc3545;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: #dc3545;
  color: #fff;
}

/* --- Main Content --- */
.contenuto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

/* --- Button Primary --- */
.btn-primary {
  background-color: #0C2B4E;
  border: none;
  padding: 12px 28px;
  font-weight: 600;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  color: #fff;
  text-decoration: none;
}

.btn-primary:hover {
  background-color: #174170;
}

/* --- Eventi --- */
.eventi-org {
  width: 100%;
  background: #f8fafc;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.eventi-org .fw-bold {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #0C2B4E;
}

.eventi-comp {
  width: 100%;
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .logout-button {
    align-self: flex-start;
  }

  .contenuto {
    gap: 30px;
  }

  .eventi-org {
    padding: 20px;
  }
}
</style>


<script>

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import EventiView from '../eventi/EventiView.vue';
export default {
    name: "AreaOrganizzatore",
    beforeMount() {
    },
    mounted() {
        console.log("org id " + localStorage.getItem("organizzatoreId"))
    },
    data() {
        return {
            organizzatoreIdRecuperato: localStorage.getItem("organizzatoreId"),
            currentUser: auth.currentUser
        }
    },
    components: {EventiView},
    methods: {
        async logout() {
            try {
                await signOut(auth)
                this.$router.push({name: "AreaRiservata"})
            } catch(error) {
                console.log(error)
            }
        }
    }
}
</script>