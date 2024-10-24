<script setup>
import { computed, defineProps} from 'vue'
import LoadingIcon from "@/components/icons/LoadingIcon.vue";

const emit = defineEmits(['clickDetected'])

const props = defineProps({
  type:{
    type: String,
    default: 'primary'
  },
  size:{
    type: String,
    default: 'lg'
  },
  text: String,
  disabled: {
    type: Boolean,
    default: false
  },
  loading:{
    type: Boolean,
    default: false
  },
  iconLeft:{type:String},
  iconRight:{type:String},
})

function click(){
  emit('clickDetected')
}

</script>

<template>
  <button class="button-default" :class="[type,size,{loading:props.loading}]" @click="click" :disabled="props.disabled || props.loading">
    <v-icon v-if="iconLeft" :name="iconLeft" />
    {{props.text}}
    <v-icon v-if="iconRight" :name="iconRight" />
    <LoadingIcon v-if="props.loading" :width="20" :height="20"/>
  </button>
</template>

<style lang="scss">
.button-default{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  outline: 0;

  &.sm{
    height: 36px;
    padding: 8px 14px;

    @include set-font-size(t-sm,semi);
  }
  &.md{
    height: 40px;
    padding: 10px 16px;

    @include set-font-size(t-sm,semi);
  }
  &.lg{
    height: 44px;
    padding: 10px 18px;

    @include set-font-size(t-md,semi);
  }
  &.xl{
    height: 48px;
    padding: 12px 20px;

    @include set-font-size(t-sm,semi);
  }
  &.xxl{
    height: 60px;
    padding: 16px 28px;

    @include set-font-size(t-lg,semi);
  }


  &.primary{
    background-color: $brand-600;
    color: $white;
    border-radius: 8px;
    border: 2px solid transparent;

    &:hover:not(:disabled,.loading){
      background-color: $brand-700;
    }

    &:focus:not(:disabled,.loading){
      background-color: $brand-600;
      box-shadow: 0px 0px 0px 4px $shadow-primary;
    }

    &:disabled:not(.loading){
      background-color: $brand-200;
    }
  }

  &.secondary-red{
    background-color: $error-100;
    color: $error-700;
    border-radius: 8px;
    border: 2px solid transparent;

    &:hover:not(:disabled,.loading){
      background-color: $error-300;
    }

    &:focus:not(:disabled,.loading){
      background-color: $error-300;
      box-shadow: 0px 0px 0px 4px $shadow-primary;
    }

    &:disabled:not(.loading){
      color: $error-300;
      background-color: $error-50;
    }
  }
}

</style>