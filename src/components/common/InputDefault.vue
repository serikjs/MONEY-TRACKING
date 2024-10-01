<script setup>
import { computed, defineProps, ref, watch } from "vue";

const emit = defineEmits(['changeValue'])

const props = defineProps({
  placeholder: String,
  type:String,
  isError:{
    type: Boolean,
    default: false
  },
  errMessage:{
    type: String,
    default: ""
  },
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
  emit("changeValue", newValue);
});

// Watch для синхронизации с modelValue, если он изменится извне
watch(() => props.modelValue, (newValue) => {
  value.value = newValue;
});
</script>

<template>

  <div class="input-wrapper">
    <label class="input-default" >
      <span class="input-default__placeholder" :class="{animate:isAnimate}">{{props.placeholder}}</span>
      <input class="input-default__input" :class="{animate:isAnimate, error:isError}"  :type="props.type" v-model="value" :disabled="props.disabled">
    </label>
    <p class="input-error" v-if="errMessage.length">{{errMessage}}</p>
  </div>
</template>

<style lang="scss">
.input-default{
  display: inline-block;
  width: 100%;
  height: 100%;
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
    color: $gray-900;
    @include set-font-size(t-md,regular);
    border-radius: 8px;

    &.animate{
      padding: 16px  14px 6px ;
    }

    &.error{
      border: 1px solid $error-300;
    }
  }

  &__placeholder.animate{
    top: 2px;
    transform: translateY(0);
    @include set-font-size(t-xs,regular);
  }
}
.input-error{
  margin-top: 6px;
  color: $error-500;
  @include set-font-size(t-sm,regular);
}
</style>