import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient.js";
import type { Tables, TablesType } from "@/store_types/tables.types";

export const useTablesStore = defineStore('tables', () => {
  const tables = ref<Tables>( {
    income: null,
    taxes: null,
  } )
  const getTables = computed(() => tables.value)


  function setTableIncome(val: string|null = null) {
    tables.value.income = val
  }
  function setTableTaxes(val: string|null = null) {
    tables.value.taxes = val
  }

  async function uploadTables() {
    const { data:income }:any = await supabase.from('users-tables').select().eq('is_income', true)
    const { data:taxes }:any = await supabase.from('users-tables').select().eq('is_income', false)

    if(income.length){
      setTableIncome(income[0].link)
    }

    if(taxes.length){
      setTableTaxes(taxes[0].link)
    }
  }

  async function insertTableIncome(sheetId: string) {
    try {
      const { data, error } = await supabase
        .from('users-tables')
        .insert({ link:sheetId,is_income:true })
        .select()

      if (error) {
        console.error('Ошибка добавление таблицы:', error)
        return error
      }else{
        const result = data as unknown as TablesType[];
        if (result.length > 0) {
          const insertedSheetId: string = result[0].link;
          setTableIncome(insertedSheetId);
        } else {
          console.warn('Нет данных после вставки');
        }
      }
    } catch (error) {
      console.error('Ошибка добавление таблицы:', error)
    }

  }


  return { getTables, uploadTables,insertTableIncome }
})
