import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient.js";
import type { Tables } from "@/store_types/tables.types";

export const useTablesStore = defineStore('tables', () => {
  const tables = ref<Tables>( {
    income: null,
    taxes: null,
  } )
  const getTables = computed(() => tables.value)


  function setTables(val = null) {
    // tables.value = val
  }

  async function uploadTables() {
    const { data }:any = await supabase.from('users-tables').select()
    setTables(data)
  }

  return { getTables, uploadTables }
})
