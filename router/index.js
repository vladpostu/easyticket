import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/IndexView.vue'
import HomePage from '../views/HomePage.vue'
import SecondPage from '../views/SecondPage.vue'

const routes = [
    {
        path: '/',
        name: "IndexView",
        component: IndexView
    },
    {
        path: '/home',
        name: "HomeView",
        component: HomePage
    },
    {
        path: '/secondpage',
        name: "SecondPage",
        component: SecondPage
    },
    {
        path: '/evento/:id',
        name: "EventoView",
        component: () => import('../views/EventoView.vue'),
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router