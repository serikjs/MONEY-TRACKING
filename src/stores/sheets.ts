import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.js'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { useAuthStore } from '@/stores/auth'
import { SheetsNames } from "@/store_types/sheets.types";

export const useSheetsStore = defineStore('sheets', () => {
  const sheets = ref(null)

  const authStore = useAuthStore()

  async function uploadSheet(spreadsheetId: string) {
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

  async function uploadIncomeSheet(spreadsheetId: string) {
    const sheet = await uploadSheet('1qkg77bg0AMgDfw2xj4NQ2fBRiAh2zdDu0TmGfonR8ww')
    if(sheet){
      const income = sheet.sheetsByTitle[SheetsNames.income];
      if(income){
        return income
      }else{
        const f = await sheet.addSheet({  title: SheetsNames.income, headerValues: ['name', 'email'] });
      }

    }

    return null
  }

  return { uploadSheet, uploadIncomeSheet }
})
