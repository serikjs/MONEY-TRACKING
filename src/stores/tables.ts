import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient.js";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { useAuthStore } from "@/stores/auth";

export const useTablesStore = defineStore('tables', () => {
  const tables = ref( null )

  const authStore = useAuthStore()

  const getTables = computed(() => tables.value)


  function setTables(val = null) {
    tables.value = val
  }

  async function uploadTables() {
    const { data }:any = await supabase.from('users-tables').select()
    setTables(data)
  }

  async function uploadSheet(spreadsheetId:string) {
    const token = authStore.getSession?.provider_token

    if (!token) {
      console.error('Токен отсутствует. Убедитесь, что пользователь авторизован.')
      return
    }

    try {
      const doc = new GoogleSpreadsheet(spreadsheetId, {
        token
      })

      await doc.loadInfo()

      return doc
    } catch (error) {
      console.error('Ошибка при доступе к Google Sheets:', error)
    }
  }

  return { getTables, uploadTables,uploadSheet }
})
