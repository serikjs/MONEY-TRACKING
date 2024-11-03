import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type Modal, ModalPosition, ModalSize } from '@/store_types/modals.types'

export const useModalsStore = defineStore('modals', () => {
  const openedModals = ref<Modal[]>([])

  const getOpenModal = computed((): Modal => {
    return openedModals.value[openedModals.value.length - 1]
  })

  const anyOpenModals = computed((): boolean => {
    return openedModals.value.length > 0
  })

  function modalIsOpen() {
    return openedModals.value.find((modal: Modal) => modal.name === getOpenModal.value.name)
  }

  function addModal(modal: Modal) {
    openedModals.value.push(modal)
  }

  function removeModal(modalName: string) {
    openedModals.value = openedModals.value.filter((item: Modal) => item.name !== modalName)
  }

  function removeLastModal() {
    openedModals.value.pop()
  }

  function openModal(modal: Modal) {
    if (!modal.size) {
      modal.size = ModalSize.MEDIUM
    }
    if (!modal.position) {
      modal.position = ModalPosition.CENTER
    }

    if (!modalIsOpen()) {
      addModal(modal)
    } else {
      removeModal(modal.name)
      addModal(modal)
    }
  }
  function closeModal(modalName?: string | undefined) {
    if (modalName) {
      removeModal(modalName)
    } else {
      removeLastModal()
    }
  }

  return {
    getOpenModal,
    anyOpenModals,
    openModal,
    closeModal
  }
})
