<script setup>
import { ref, onMounted } from 'vue'
import {supabase} from "@/lib/supabaseClient.js";

const banks = ref([])

async function getCountries() {
  const { data } = await supabase.from('banks').select()
  banks.value = data
}
//
// async function setBankName(val) {
//   const { data, error } = await supabase
//       .from('banks')
//       .update({ name: val })
//       .eq('id', 1)
//       .select()
//   banks.value = data
// }
onMounted(() => {
  getCountries()
})
</script>

<template>
  <main>
    {{banks}}
  </main>
</template>
