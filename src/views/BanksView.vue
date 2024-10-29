<template>
  <Container class="banks-wrapper">
    <NoTable v-if="!tablesStore.getTables.income"/>
    <div class="no-banks" v-else-if="!banksStore.getBanks.length">
      Банков еще нет
    </div>
  </Container>
</template>

<script setup>
import { useBanksStore } from "@/stores/banks";
import { useTablesStore } from "@/stores/tables";
import NoTable from "@/components/banks/NoTable.vue";
import Container from "@/components/common/Container.vue";

const banksStore = useBanksStore()
const tablesStore = useTablesStore()

</script>

<style scoped lang="scss">
.banks-wrapper{
  height: 100%;
}
</style>