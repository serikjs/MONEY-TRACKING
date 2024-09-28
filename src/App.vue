<template>
  <nav>
    <button v-if="authStore.getToken" @click="logout">Logout</button>
  </nav>
  <Toasts />
  <RouterView />
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router/index'
import { supabase } from '@/lib/supabaseClient.js'
import { onMounted, onUpdated } from 'vue'
import Toasts from '@/components/common/Toasts.vue'

const authStore = useAuthStore()

async function logout() {
  const { error } = await supabase.auth.signOut()
  authStore.setToken()
  await router.push('/login')
}

onUpdated(() => {
  authStore.checkLogin()
})
onMounted(() => {
  authStore.checkLogin()

})
</script>
<style scoped></style>