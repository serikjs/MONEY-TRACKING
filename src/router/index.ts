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

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    authStore.checkLogin().then(()=>{
        if (!authStore.getToken && to.name !== 'login') {
            router.push("/login")
        } else {
            next()
        }
    }).catch(()=>{})

})
export default router
