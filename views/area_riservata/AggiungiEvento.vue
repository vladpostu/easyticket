<template>
    <AddEvent @eventoInserito="goToEventiOrganizzatore"/>
</template>

<script>
import AddEvent from '@/components/AddEvent.vue';

export default {
    name: "AggiungiEvento",
    data() {
        return {
            
        }
    },
    components: {
        AddEvent,
    },
    methods: {
        goToEventiOrganizzatore() {
            this.$router.push({name: "AreaOrganizzatore"})
        }
    }
}
</script>