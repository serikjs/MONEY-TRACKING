
<template>
 <div class="not-found-page">
   <span class="particle" v-for="i in 40" :key="`four`+i">4</span>
   <span class="particle" v-for="i in 40" :key="`zero`+i">0</span>
   <Container>
     <div class="not-found-page__wrapper">
       <div class="not-found-page__content">
         <p class="not-found-page__title">Страница не найдена</p>
         <p class="not-found-page__code">404</p>
         <ButtonDefault class="not-found-page__btn" text="Вернуться на главную" @click-detected="goHome"/>
       </div>
     </div>
   </Container>
 </div>
</template>

<script setup lang="ts">

import Container from "@/components/common/Container.vue";
import ButtonDefault from "@/components/common/ButtonDefault.vue";
import router from "@/router";

const goHome = ()=>{
  router.push('/')
}
</script>


<style scoped lang="scss">

$anims: float, floatReverse,float2, floatReverse2;
$easeSmooth: cubic-bezier(0.39,0.575,0.28,0.995);

.not-found-page {
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  background-color: $gray-200;
  color: $gray-600;
  @include set-font-size(t-lg, medium);
  overflow: hidden;

  &__wrapper{
    display: flex;
    justify-content: center;
  }

  &__content{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    background: white;
    padding: 40px;
    text-align: center;
    box-shadow: -10px 10px 67px -12px rgba(0,0,0,0.2);
    border-radius: 16px;
    opacity: 0;
    animation: apparition 0.8s 1.2s $easeSmooth forwards;
  }

  &__title{
    @include set-font-size(d-xs, medium);
  }
  &__code{
    margin-top: 8px;
    @include set-font-size(d-lg, bold);
  }
  &__btn{
    margin-top: 16px;
  }
}

.particle {
  position: absolute;
  display: block;
  pointer-events: none;

  @for $i from 1 through 80 {
    &:nth-child(#{$i}){
      $size: random(20) + 10;
      $blur: $i * 0.02;
      $speed: random(20)+20;
      $delay: random(10)*0.1;
      $anim: nth($anims, random(length($anims)));

      top: random(100) / (100 + $size/8) * 100%;
      left: random(100) / (100 + $size/10) * 100%;
      font-size: $size + px;
      filter: blur( (#{$blur}) + px);
      animation: $speed+s  $anim infinite;
    }
  }
}

@keyframes apparition {
  from {
    opacity: 0;
    transform: translateY(100px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(180px);
  }
}

@keyframes floatReverse {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-180px);
  }
}

@keyframes float2 {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(28px);
  }
}

@keyframes floatReverse2 {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-28px);
  }
}

@mixin animation ($delay, $duration, $animation) {
  animation-delay: $delay;
  animation-duration: $duration;
  animation-name: $animation;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}
</style>