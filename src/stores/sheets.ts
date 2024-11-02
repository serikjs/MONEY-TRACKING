import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient.js'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { useAuthStore } from '@/stores/auth'
import { SheetsNames } from "@/store_types/sheets.types";
import { useTablesStore } from "@/stores/tables";

export const useSheetsStore = defineStore('sheets', () => {
  const sheets = ref([])

  const authStore = useAuthStore()
  const tablesStore = useTablesStore()

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

  async function uploadIncomeSheet() {
    if(!tablesStore.getTables.income){
      console.error('Таблица доходов отсутствует')
      return
    }
    const sheet = await uploadSheet(tablesStore.getTables.income)
    if(sheet){
      return sheet
      // const income = sheet.sheetsByTitle[SheetsNames.income];
      // if(income){
      //   return income
      // }else{
      //   const f = await sheet.addSheet({  title: SheetsNames.income, headerValues: ['name', 'email'] });
      // }

    }

    return null
  }

  return { uploadSheet, uploadIncomeSheet }
})
