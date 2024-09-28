import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const getToken = computed(() => token.value)

  function setToken(val = null) {
    if (val) {
      token.value = val.access_token
    } else {
      token.value = val
    }
  }

  async function checkLogin() {
    const session = await supabase.auth.getSession()
    if (session.data.session) {
      setToken(session.data.session)
    } else {
      setToken()
    }
  }

  async function login(data:any) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    })

    return error
  }

  async function register(data:any) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.name
        }
      }
    })

    return error
  }

  return { token, getToken, setToken, checkLogin,login,register }
})
