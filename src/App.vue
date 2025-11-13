<template>
  <div class="header">
    <div class="header-box">
      <router-link :to="{ name: 'HomeView' }" class="logo">EasyTicket</router-link>

      <div class="header-right">
        <div class="lang-selector">
          <div class="dropdown">
            <button class="btn-dropdown"><i class="bi bi-translate"></i> {{ $i18n.locale.toUpperCase() }}</button>
            <div class="dropdown-content">
              <div @click="$i18n.locale = 'it'">IT</div>
              <div @click="$i18n.locale = 'en'">EN</div>
            </div>
          </div>
        </div>

        <router-link :to="{ name: 'AreaRiservata' }" class="area-riservata">
          {{$t("reservedAreaButtonNavbar")}}
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>

<style scoped>

a {
  text-decoration: none !important;
}

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

/* HEADER RIGHT: lingua + area riservata */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* AREA RISERVATA */
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
  text-decoration: none;
}

/* DROPDOWN */
.lang-selector {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.btn-dropdown {
  background-color: #1B3B69;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-dropdown i {
  margin-right: 4px;
}

.btn-dropdown:hover {
  background-color: #234b84;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f8f9fa;
  min-width: 60px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  border-radius: 6px;
  overflow: hidden;
  right: 0;
  z-index: 200;
}

.dropdown-content div {
  padding: 6px 12px;
  cursor: pointer;
  font-weight: 500;
  color: #0C2B4E;
}

.dropdown-content div:hover {
  background-color: #e2e8f0;
}

.dropdown:hover .dropdown-content {
  display: block;
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
  .btn-dropdown {
    padding: 5px 10px;
    font-size: 0.85rem;
  }
}
</style>


<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    changeLang(lang) {
      this.$i18n.locale = lang;
    }
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
