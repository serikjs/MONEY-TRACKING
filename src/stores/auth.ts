import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.js'
import router from '@/router'
import type { Session } from "@supabase/supabase-js";

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const session = ref<Session | null>(null)

  const getToken = computed(() => token.value)
  const getSession = computed(() => session.value)

  function setSession(val:  Session | null = null) {
    if (val) {
      session.value = val
      token.value = val.access_token
    } else {
      token.value = val
      session.value = val
    }
  }


  async function checkLogin() {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (data.session) {
        setSession(data.session)
      } else {
        setSession(null)
      }
      if (error) {
        console.error('Ошибка получения профиля:', error)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function loginGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/spreadsheets'
        }
      })

      if (error) {
        console.error('Ошибка входа:', error)
        return error
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function login(data: any) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })
      if (error) {
        console.error('Ошибка входа:', error)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function register(data: any) {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.name
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Ошибка выхода:', error)
      }
      await router.push('/')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return { getSession, getToken, checkLogin, login, loginGoogle, register, logout }
})
