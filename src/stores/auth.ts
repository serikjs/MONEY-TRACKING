import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient";

export const useAuthStore = defineStore('auth', () => {
  const token = ref( null )
  const getToken = computed(() => token.value)
  function setToken(val = null) {
    if(val){
      token.value = val.access_token
    }else{
      token.value = val
    }
  }

     async function checkLogin() {
        const session = await supabase.auth.getSession()
        if(session.data.session){
            setToken(session.data.session)
        }else{
            setToken()
        }
    }

  return { token, getToken, setToken,checkLogin }
})
