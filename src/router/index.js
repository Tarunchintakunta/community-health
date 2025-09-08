import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/programs',
    name: 'Programs',
    component: () => import('../views/ProgramsPage.vue')
  },
  {
    path: '/programs/:id',
    name: 'ProgramDetails',
    component: () => import('../views/ProgramDetails.vue')
  },
  {
    path: '/find-activities',
    name: 'FindActivities',
    component: () => import('../views/FindActivities.vue')
  },
  {
    path: '/account',
    name: 'UserAccount',
    component: () => import('../views/UserAccount.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/coach-dashboard',
    name: 'CoachDashboard',
    component: () => import('../views/CoachDashboard.vue')
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanel.vue')
  },
  {
    path: '/security-test',
    name: 'SecurityTest',
    component: () => import('../components/SecurityTest.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router