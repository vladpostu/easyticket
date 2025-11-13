<template>
    <AddEvento @eventoInserito="goToEventiOrganizzatore"/>
</template>

<script>
import AddEvento from '@/components/AddEvento.vue';

export default {
    name: "AggiungiEvento",
    data() {
        return {
            
        }
    },
    components: {
        AddEvento,
    },
    methods: {
        goToEventiOrganizzatore() {
            this.$router.push({name: "AreaOrganizzatore"})
        }
    }
}
</script>