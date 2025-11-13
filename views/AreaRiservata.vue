<template>
    <div class="wrapper">
        <h2 class="mt-5">{{ $t("reservedArea") }}</h2>
        <div class="opzioni">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ $t("organizer") }}</h5>
                    <p class="card-text">{{ $t("organizerText") }}</p>
                    <router-link :to="{name: 'AreaOrganizzatore'}" class="btn btn-primary">{{$t("loginButton")}}</router-link>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{{ $t("validator") }}</h5>
                    <p class="card-text">{{ $t("validatorText") }}</p>
                    <router-link :to="{name: 'AreaConvalidatore'}" class="btn btn-primary">Accedi</router-link> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  background-color: #0C2B4E;
  color: #F4F4F4;
  text-align: center;
  padding: 60px 20px;
  position: relative;
  bottom: 80px;
}

h2 {
  font-weight: 700;
  margin-bottom: 60px;
  font-size: 2.2rem;
  letter-spacing: 0.5px;
  color: #ffffff;
}

.opzioni {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 60px;
}

/* --- CARD --- */
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
  border-radius: 14px;
  box-shadow: 0 5px 18px rgba(0, 0, 0, 0.25);
  width: 340px;
  padding: 30px 20px;
  color: #f4f4f4;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #d3e2ef;
  margin-bottom: 25px;
}

/* --- BUTTON --- */
.btn {
  background-color: #1B74BB;
  border: none;
  padding: 10px 25px;
  color: white;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.btn:hover {
  background-color: #155f99;
  transform: translateY(-2px);
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .card {
    width: 100%;
    max-width: 320px;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }
}
</style>


<script>
export default {
    name: "AreaRiservata",
    mounted() {
    }
}
</script>