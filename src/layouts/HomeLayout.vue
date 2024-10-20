<script setup>
import { ref, onMounted } from 'vue'
import { useTablesStore } from "@/stores/tables.ts";

const tablesStore = useTablesStore()
onMounted(() => {
  tablesStore.uploadTables()
})
</script>

<template>
  <div>
    <nav>
<!--      <button v-if="authStore.getToken" @click="logout">Logout</button>-->
      Menu
    </nav>
    <main>
      <RouterView />
    </main>
  </div>

</template>
