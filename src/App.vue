
<template>
  <div class="header">
        <div class="header-box">
            <router-link style="text-decoration: none;" :to="{ name: 'HomeView' }" class="logo">EasyTicket</router-link>
            <router-link to="/area-riservata" class="area-riservata">
                <div>AREA RISERVATA</div>
            </router-link>
        </div>
    </div>
  <router-view />
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 70px;
  background-color: #0C2B4E;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  max-width: 1200px;
}

/* LOGO */
.logo {
  color: #ffffff;
  font-weight: 700;
  font-size: 1.6rem;
  letter-spacing: 0.5px;
  text-decoration: none;
}

/* LINK AREA RISERVATA */
.area-riservata {
  color: #ffffff;
  background-color: #1B3B69;
  padding: 8px 18px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.2s ease;
}

.area-riservata:hover {
  background-color: #234b84;
  color: #ffffff;
  text-decoration: none;
}

a {
  text-decoration: none;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header {
    height: 60px;
  }

  .logo {
    font-size: 1.4rem;
  }

  .area-riservata {
    font-size: 0.85rem;
    padding: 6px 14px;
  }
}
</style>



<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
