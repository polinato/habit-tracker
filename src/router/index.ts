import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import InfoPage from '@/views/InfoPage.vue';
import SignUpPage from '@/views/SignUpPage.vue';
import LogInPage from '@/views/LogInPage.vue';
import StatisticPage from '@/views/tabs/statistic/StatisticPage.vue';

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
        path: '/tabs',
        redirect: '/tabs/main'
      },
      {
        path: 'main',
        component: () => import('@/views/tabs/main/MainPage.vue')
      },
      {
        path: 'statistic',
        redirect: '/tabs/statistic/days',
        component: StatisticPage,
        children:[
          {
            path: 'days',
            component: () => import('@/views/tabs/statistic/frequency/DaysPage.vue')
          },
          {
            path: 'weeks',
            component: () => import('@/views/tabs/statistic/frequency/WeeksPage.vue')
          },
          {
            path: 'months',
            component: () => import('@/views/tabs/statistic/frequency/MonthsPage.vue')
          },
        ]
      },
      {
        path: 'add-habit',
        component: () => import('@/views/tabs/add-habit/AddHabitPage.vue')
      },
      {
        path: 'blocks',
        component: () => import('@/views/tabs/blocks/BlocksPage.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/tabs/profile/ProfilePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
