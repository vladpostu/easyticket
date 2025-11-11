<template>
    <div class="wrapper">
        <h2 class="mt-5">Area riservata</h2>
        <div class="opzioni">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Organizzatore</h5>
                    <p class="card-text">Crea, gestisci e verifica i tuoi eventi</p>
                    <router-link :to="{name: 'AreaOrganizzatore'}" class="btn btn-primary">Accedi</router-link>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Convalidatore</h5>
                    <p class="card-text">Verifica e convalida la presenza dei partecipanti</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ar {
    display: flex;
    flex-direction: column;
}


.wrapper {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

}


.opzioni {
    display: flex;
    flex-direction: row;
    width: 100vw;
    align-items: center;
    justify-content: center;
    gap: 100px;
    margin-top: 60px;
    flex-wrap: wrap;
}

.card {
    width: 400px;
}
</style>

<script>
export default {
    name: "AreaRiservata",
    mounted() {
    }
}
</script>