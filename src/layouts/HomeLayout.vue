<script setup>
import { ref, onMounted, computed } from "vue";
import MainSidebar from "@/components/MainSidebar.vue";
import { useBanksStore } from "@/stores/banks";
import { useTablesStore } from "@/stores/tables";

const banksStore = useBanksStore()
const tablesStore = useTablesStore()

onMounted(async () => {
  await tablesStore.uploadTables();
  await banksStore.uploadBanks();
})

</script>

<template>
  <div class="home-page">
    <MainSidebar/>
    <main class="home-page__content">
      <RouterView />
    </main>
  </div>

</template>

<style scoped lang="scss">
.home-page{
  height: 100%;
  display: grid;
  grid-template-columns: 235px 1fr;
  background-color: $white;

  &__content{
    margin-top: 12px;
    border-radius: 32px 0 0 0;
    background-color: $gray-200;
    padding: 32px;
  }
}
</style>
