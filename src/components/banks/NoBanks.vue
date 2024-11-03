<template>
  <div class="no-banks">
    <h3 class="no-banks__title">У ваc еще нет вкладов</h3>
    <p class="no-banks__subtitle">Что бы продолжить создайте вклад</p>
    <ButtonDefault class="no-banks__btn" text="Создать вклад" @click-detected="openAddBank" />
  </div>
</template>

<script setup lang="ts">
import ButtonDefault from '@/components/common/ButtonDefault.vue'
import { useModalsStore } from '@/stores/modals'
import { ModalPosition } from '@/store_types/modals.types'

const modalStore = useModalsStore()

const openAddBank = () => {
  modalStore.openModal({
    name: 'TestModal',
    position: ModalPosition.RIGHT
  })
}
</script>

<style scoped lang="scss">
.no-banks {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    @include set-font-size(d-md, semi);
    color: $gray-900;
  }

  &__subtitle {
    margin-top: 20px;
    @include set-font-size(t-xl, regular);
    color: $gray-600;
  }

  &__btn {
    width: 100%;
    max-width: 480px;
    margin-top: 32px;
  }
}
</style>