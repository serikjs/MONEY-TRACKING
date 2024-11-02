<template>
    <NoTable v-if="!tablesStore.getTables.income"/>
    <div class="no-banks" v-else-if="!banksStore.getBanks.length">
      Банков еще нет
    </div>
</template>

<script setup>
import { useBanksStore } from "@/stores/banks";
import { useTablesStore } from "@/stores/tables";
import NoTable from "@/components/banks/NoTable.vue";

const banksStore = useBanksStore()
const tablesStore = useTablesStore()

</script>

<style scoped lang="scss">
.banks-wrapper{
  height: 100%;
}
</style>