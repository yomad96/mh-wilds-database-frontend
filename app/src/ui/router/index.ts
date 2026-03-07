import { createRouter, createWebHistory } from 'vue-router'
import DecorationsView from "@/ui/views/DecorationsView.vue";
import HomeWiew from "@/ui/views/HomeWiew.vue";
import CharmsView from "@/ui/views/CharmsView.vue";

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
            component: DecorationsView,
        },
        {
            path: '/charms',
            name: 'charms',
            component: CharmsView,
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
