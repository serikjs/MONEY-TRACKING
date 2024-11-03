<template>
    <div class="loading-data" v-if="loading">
        Загрузка
    </div>
    <template v-else>
      <NoTable v-if="!tablesStore.getTables.income"/>
      <NoBanks v-else-if="!banksStore.getBanks.length"/>
    </template>

</template>

<script setup>
import { useBanksStore } from "@/stores/banks";
import { useTablesStore } from "@/stores/tables";
import NoTable from "@/components/banks/NoTable.vue";
import { useLoadingStore } from "@/stores/loading";
import { computed } from "vue";
import { LoadingNames } from "@/store_types/loading.types";
import NoBanks from "@/components/banks/NoBanks.vue";

const banksStore = useBanksStore()
const tablesStore = useTablesStore()
const loadingStore = useLoadingStore()

const loading = computed(()=>{
  return loadingStore.isAnyLoading([LoadingNames.UPLOAD_TABLES])
})

</script>

<style scoped lang="scss">
.banks-wrapper{
  height: 100%;
}
</style>