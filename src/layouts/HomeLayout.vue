<script setup>
import { ref, onMounted, computed } from "vue";
import { useTablesStore } from "@/stores/tables";
import MainSidebar from "@/components/MainSidebar.vue";

const tablesStore = useTablesStore()
onMounted(async () => {

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
  background-color: $gray-200;

  &__content{
    padding: 40px;
  }
}
</style>
