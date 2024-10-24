<template>
  <div class="main-sidebar">
    <div class="main-sidebar__app">
      <img class="main-sidebar__app-logo" src="" alt="" />
      <p class="main-sidebar__app-name">Bank</p>
    </div>
    <nav class="main-sidebar__menu main-nav">
      <ul class="main-nav__list">
        <li class="main-nav__item">
          <RouterLink class="main-nav__link" to="/" active-class="main-nav__link_active" exact-active-class="main-nav__link_exact-active" exact>
            <v-icon name="ri-home-4-line" :scale="1.2"/>
            Домой
          </RouterLink>
        </li>
        <li class="main-nav__item">
          <RouterLink class="main-nav__link" to="/banks" active-class="main-nav__link_active" exact-active-class="main-nav__link_exact-active" exact>
            <v-icon name="bi-clipboard-data" :scale="1.2"/>
            Вклады
          </RouterLink>
        </li>
        <li class="main-nav__item">
          <RouterLink class="main-nav__link" to="/taxes" active-class="main-nav__link_active" exact-active-class="main-nav__link_exact-active" exact>
            <v-icon name="bi-bank" :scale="1.2"/>
            Налоги
          </RouterLink>
        </li>
      </ul>
    </nav>
    <div class="main-sidebar__user" v-if="userStore.getUser">
      <img
        class="main-sidebar__user-img"
        v-if="userStore.getAvatar"
        :src="userStore.getAvatar"
        alt=""
      />
      <p v-if="userStore.getName" class="main-sidebar__user-name">{{ userStore.getName }}</p>
    </div>

    <ButtonDefault
      class="main-sidebar__logout"
      v-if="authStore.getToken"
      text="Выход"
      icon-right="md-exittoapp"
      size="md"
      type="secondary-red"
      @click-detected="authStore.logout"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import ButtonDefault from '@/components/common/ButtonDefault.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
</script>

<style scoped lang="scss">
.main-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 10px;
  padding: 20px 12px;
  background-color: $white;
  border-radius: 16px;

  &__menu {
    padding-top: 60px;
  }

  &__user {
    display: flex;
    align-items: center;
    margin-top: auto;
    border-top: 1px solid $gray-300;
    padding: 32px 0 12px 0;
  }

  &__user-img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }

  &__user-name {
    @include set-font-size(t-md, bold);
    color: $gray-800;
    margin-left: 8px;
  }

  &__logout{
    margin-top: 20px;
  }
}

.main-nav {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    list-style: none;
    padding: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    text-decoration: none;
    @include set-font-size(t-lg, medium);
    color: $gray-600;
    border-radius: 8px;

    &:hover,
    &_exact-active{
      color: $indigo-700;
      background-color: $indigo-100;
    }
  }
}
</style>