import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Toast, ToastsState } from "@/store_types/toasts.types";

export const useToastsStore = defineStore<'toasts', ToastsState>('toasts', () => {
  class TheToast implements Toast {
    private static idCounter = 0;
    id: string;

    constructor(
      public message: string,
      public type: string = "info",
      public timeout: number = 5000
    ) {
      this.id = `toast-${TheToast.idCounter++}`;
      this.message = message;
      this.type = type;
      this.timeout = timeout;
    }
  }
  const toasts = ref( [] )

  const getToasts = computed(() => toasts.value)

  function add(toast:TheToast) {
    toasts.value.push(toast)
  }

  function remove(toastId:string) {
    toasts.value = toasts.value.filter((toast) => toast.id !== toastId);
  }


  async function addToast({ message, type, timeout }) {
    const toast = new TheToast(message, type, timeout);
    add(toast)
    setTimeout(() => {
      remove(toast.id)
    }, toast.timeout);
  }

  async function removeToast(toastId:string) {
    remove(toastId)
  }

  return { getToasts,addToast,removeToast }
})