<template>
  <div class="container">
    <slot/>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container{
  width: 100%;
  max-width: 1248px;
  margin: 0 auto;
  padding: 0 16px;
}
</style>