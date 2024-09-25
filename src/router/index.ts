import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import InfoPage from '@/views/InfoPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import LogInPage from '@/views/LogInPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/log-in'
  },
  {
    path: '/info',
    component: InfoPage
  },
  {
    path: '/sign-up',
    component: SignUpPage
  },
  {
    path: '/log-in',
    component: LogInPage
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/main'
      },
      {
        path: 'main',
        component: () => import('@/views/tabs/MainPage.vue')
      },
      {
        path: 'statistic',
        component: () => import('@/views/tabs/StatisticPage.vue')
      },
      {
        path: 'add-habit',
        component: () => import('@/views/tabs/AddHabitPage.vue')
      },
      {
        path: 'blocks',
        component: () => import('@/views/tabs/BlocksPage.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/tabs/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
