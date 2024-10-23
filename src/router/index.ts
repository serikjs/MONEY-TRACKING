import {createRouter, createWebHistory} from 'vue-router'

import {useAuthStore} from "@/stores/auth";
import HomeLayout from '@/layouts/HomeLayout.vue';
import LoginLayout from "@/layouts/LoginLayout.vue";
import BanksView from "@/views/BanksView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeLayout,
            children: [
                {
                    path: 'banks',
                    name: 'banks',
                    component: BanksView
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: LoginLayout
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    await authStore.checkLogin();

    if (!authStore.getToken && to.name !== 'login') {
        return next('/login');
    }
    next();
});

// Временное решение прячет инфу о пользователе в url
router.afterEach((to, from, next) => {
        const url = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, url);
})
export default router
