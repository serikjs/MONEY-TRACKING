<script setup>
import { computed, defineProps, ref, watch } from "vue";

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  placeholder: String,
  type:String,
  modelValue: {
    type: String,
    default: ""
  },
  disabled:{
    type: Boolean,
    default: false
  }
});

const value = ref(props.modelValue);

const isAnimate = computed(()=>{
  return value.value.length > 0
})

watch(value, (newValue) => {
  emit("update:modelValue", newValue);
});

// Watch для синхронизации с modelValue, если он изменится извне
watch(() => props.modelValue, (newValue) => {
  value.value = newValue;
});
</script>

<template>
  <label class="input-default" >
    <span class="input-default__placeholder" :class="{animate:isAnimate}">{{props.placeholder}}</span>
    <input class="input-default__input" :class="{animate:isAnimate}"  :type="props.type" v-model="value" :disabled="props.disabled">
  </label>

</template>

<style lang="scss">
.input-default{
  width: 100%;
  position: relative;

  &__placeholder{
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    @include set-font-size(t-md,regular);
    color: $gray-500;

    transform-origin: top left;
    transition: all 0.2s ease-in;
  }

  &__input{
    width: 100%;
    height: 44px;
    padding: 10px 14px;
    border: 1px solid $gray-300;
    border-radius: 8px;

    @include set-font-size(t-md,regular)
  }

  &__placeholder.animate{
    top: 2px;
    transform: translateY(0);
    @include set-font-size(t-xs,regular);
  }

  &__input.animate{
    padding: 16px  14px 6px ;
  }
}
</style>