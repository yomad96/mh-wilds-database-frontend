import { createRouter, createWebHistory } from 'vue-router'
import DecorationsView from "@/ui/views/DecorationsView.vue";
import HomeWiew from "@/ui/views/HomeWiew.vue";
import CharmsView from "@/ui/views/CharmsView.vue";
import SkillsView from "@/ui/views/SkillsView.vue";
import BuilderView from "@/ui/views/BuilderView.vue";
import RegisterView from "@/ui/views/RegisterView.vue";

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
        {
            path: '/skills',
            name: 'skills',
            component: SkillsView,
        },
        {
            path: '/builder',
            name: 'builder',
            component: BuilderView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
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
