import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient";

export const useTablesStore = defineStore('tables', () => {
  const tables = ref( null )
  const getTables = computed(() => tables.value)
  function setTables(val = null) {
    tables.value = val
  }

  async function uploadTables() {
    const { data } = await supabase.from('users-tables').select()
    setTables(data)
  }

  return { getTables, uploadTables }
})
