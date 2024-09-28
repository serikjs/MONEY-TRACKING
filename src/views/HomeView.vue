<script setup>
import { ref, onMounted } from 'vue'
import { useTablesStore } from "@/stores/tables";

const tablesStore = useTablesStore()
onMounted(() => {
  tablesStore.uploadTables()
})
</script>

<template>
  <main>
    {{banks}}
  </main>
</template>
