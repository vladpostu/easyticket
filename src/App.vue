
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

<style>
   .header {
        background: #0C2B4E;
        position: relative;
        height: 10vh;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    .header-box {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        width: 90%;
    }

    .logo {
        color: white;
        font-weight: 700;
        font-size: 1.5em;
    }

    .area-riservata {
      color: white;
      text-decoration: none;
      font-weight: 500;
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
