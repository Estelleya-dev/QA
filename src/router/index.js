// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/Auth.vue'
import UserProfile from '../components/UserProfile.vue'
import Dashboard from '../components/Dashboard.vue'
import UserSettings from '../components/UserSettings.vue'

const routes = [
    { path: '/', redirect: '/auth' },
    { path: '/auth', component: Auth },
    { path: '/profile', component: UserProfile },
    { path: '/dashboard', component: Dashboard },
    { path: '/settings', component: UserSettings }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 守卫逻辑
router.beforeEach((to, from, next) => {
    const profile = localStorage.getItem('user_profile')

    if (to.path === '/dashboard' && !profile) {
        return next('/profile')
    }

    next()
})

export default router
