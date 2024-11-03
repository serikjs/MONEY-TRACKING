<template>
  <div v-if="lastModal && lastModalComponent" class="modal-overlay" @click.self="closeModal">
    <div :class="['modal', modalClass]">
      <component :is="lastModalComponent"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import { useModalsStore } from "@/stores/modals";
import { ModalPosition, ModalSize } from "@/store_types/modals.types";


const modalStore = useModalsStore();

const lastModal = computed(() => modalStore.getOpenModal);

const lastModalComponent = computed(() => {
  return lastModal.value
    ? defineAsyncComponent(() => import(`./all_modals/${lastModal.value.name}.vue`))
    : null;
});

const closeModal = () => {
  modalStore.closeModal();
};

const modalClass = computed(() => {
  if (!lastModal.value) return '';
  return {
    'modal_small': lastModal.value.size === ModalSize.SMALL,
    'modal_medium': lastModal.value.size === ModalSize.MEDIUM,
    'modal_large': lastModal.value.size === ModalSize.LARGE,
    'modal_center': lastModal.value.position === ModalPosition.CENTER,
    'modal_right': lastModal.value.position === ModalPosition.RIGHT,
  };
});
</script>


<style scoped lang="scss">
.modal-overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(16, 24, 40,0.7);
}

.modal{
  position: absolute;
  padding: 20px;
  background-color: $white;
  max-height: calc(100% - 60px);

  &_right{
    right: 0;
    height: 100%;
    max-height: unset;
  }
}
</style>