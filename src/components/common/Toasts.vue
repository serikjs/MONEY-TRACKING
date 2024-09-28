<template>
  <div class="toasts-wrapper">
    <transition-group class="toasts-list" name="toast-list" tag="div" appear>
      <div class="toast" :class="toast.type" v-for="toast in toasts" :key="toast.id">
        <span class="toast__icon">
          <TickCircleIcon v-if="toast.type === 'success'" />
          <InfoIcon  v-if="toast.type === 'info'" />
          <AttentionIcon v-if="toast.type === 'error'" />
        </span>
        <span class="toast__text">{{ toast.message }}</span>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToastsStore } from '@/stores/toasts'
import { computed } from 'vue'
import AttentionIcon from '@/components/icons/AttentionIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import TickCircleIcon from '@/components/icons/TickCircleIcon.vue'

const toastsStore = useToastsStore()

const toasts = computed(() => {
  return toastsStore.getToasts
})
</script>

<style scoped lang="scss">
.toasts-wrapper {
  position: fixed;
  width: 100%;
  max-width: 480px;
  padding: 0 16px;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  transition: all 0.5s;

  @media (max-width: 750px) {
    top: 36px;
  }
}

.toasts-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 18px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-family: var(--font-bold);
  color: #fff;

  &.info {
    background-color: #2280b5;
  }

  &.success {
    background-color: #6db700;
  }

  &.error {
    background-color: #ff1e54;
  }

  &__icon {
    line-height: 0;
    font-size: 0;
  }
}

.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.5s;
}

.toast-list-enter,
.toast-list-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.toast-list-leave-active {
  position: absolute;
}

.toast-list-move {
  transition: transform 0.5s;
}
</style>