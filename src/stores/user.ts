import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from "@/stores/auth";

export const useUserStore = defineStore('user', () => {

  const authStore = useAuthStore()

  const getUser= computed(() =>{
    if(authStore.getSession){
      return authStore.getSession.user.user_metadata
    }
    return null
  })

  const getAvatar= computed(() =>{
    if(getUser.value){
      return getUser.value.avatar_url
    }
    return null
  })

  return { getUser,getAvatar}
})
