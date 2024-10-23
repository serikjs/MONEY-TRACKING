<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useTablesStore } from "@/stores/tables";


const authStore = useAuthStore()
const userStore = useUserStore()
const tablesStore = useTablesStore()
onMounted(async () => {
  const sheet = await tablesStore.uploadSheet('1qkg77bg0AMgDfw2xj4NQ2fBRiAh2zdDu0TmGfonR8ww')

  const f = await sheet.addSheet({  title: 'Доходы' ,headerValues: ['name', 'email'] });
  console.log("f",f);
})

</script>

<template>
  <div>
    <nav>
      <button v-if="authStore.getToken" @click="authStore.logout">Logout</button>
      Menu
    </nav>
    <main>
      <img v-if="userStore.getAvatar" :src="userStore.getAvatar" alt="">
      <RouterView />
    </main>
  </div>

</template>
