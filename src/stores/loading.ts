import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {

  const loadingActions = ref(new Set<string>())

  function startLoading(actionName: string) {
     loadingActions.value.add(actionName);
  }

  function stopLoading(actionName: string) {
     loadingActions.value.delete(actionName);
  }

  function isLoading(actionName: string): boolean {
    return loadingActions.value.has(actionName);
  }

  function isAnyLoading(actionNames: string[]): boolean {
    return actionNames.some(actionName => isLoading(actionName));
  }

  return {startLoading,stopLoading,isLoading,isAnyLoading}
})
