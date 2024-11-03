<template>
  <AllModal/>
  <ToastsDefault/>
  <RouterView />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabaseClient.js'
import ToastsDefault from "@/components/common/ToastsDefault.vue";
import AllModal from "@/components/modals/AllModal.vue";

const authStore = useAuthStore()

supabase.auth.onAuthStateChange( (event, session) => {
   authStore.checkLogin()
});
</script>
<style scoped></style>