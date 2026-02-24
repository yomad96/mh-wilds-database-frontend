import { createRouter, createWebHistory } from 'vue-router'
import ListDecorationsView from "@/ui/views/ListDecorationsView.vue";
import HomeWiew from "@/ui/views/HomeWiew.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeWiew,
        },
        {
            path: '/decorations',
            name: 'decorations',
            component: ListDecorationsView,
        },
        // {
        //     path: '/create',
        //     name: 'createAppareance',
        //     component: CreateAppareanceView,
        // },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: LoginView,
        // },
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: RegisterView,
        // },
    ],
})

export default router
