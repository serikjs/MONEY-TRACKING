<template>
  <ToastsDefault/>
  <RouterView />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router/index'
import { supabase } from '@/lib/supabaseClient.js'
import { onMounted, onUpdated } from 'vue'
import Toasts from '@/components/common/ToastsDefault.vue'
import ToastsDefault from "@/components/common/ToastsDefault.vue";

const authStore = useAuthStore()

onUpdated(() => {
  authStore.checkLogin()
})
onMounted(() => {
  authStore.checkLogin()

})
</script>
<style scoped></style>