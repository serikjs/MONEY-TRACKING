import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {supabase} from "@/lib/supabaseClient.js";
import type { Bank } from "@/store_types/banks.types";

export const useBanksStore = defineStore('banks', () => {
  const banks = ref<Bank[]>([])
  const getBanks = computed(() => banks.value)


  function setBanks(val:Bank[]) {
    banks.value = val
  }

  async function uploadBanks() {
    const { data }:any = await supabase.from('banks').select(`created_at,name,start_balance,balance`)
    setBanks(data)
  }

  return { getBanks, uploadBanks }
})
