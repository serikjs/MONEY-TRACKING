import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import {useAuthStore} from "@/stores/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
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
