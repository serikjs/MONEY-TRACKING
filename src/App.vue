<template>
  <ToastsDefault/>
  <RouterView />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabaseClient.js'
import ToastsDefault from "@/components/common/ToastsDefault.vue";

const authStore = useAuthStore()

supabase.auth.onAuthStateChange( (event, session) => {
   authStore.checkLogin()
});
</script>
<style scoped></style>