import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../components/Home.vue'
import Profile from '../views/ProfileView.vue'
import Register from '../components/register.vue'
import Login from '../components/Login.vue'
import BlankPage from '../components/BlankPage.vue'
import rooms from '../components/rooms.vue'
import roomdetail from '../components/roomdetail.vue'
import reservation from '../components/reservation.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: reservation
  },
  {
    path: '/room',
    name: 'rooms',
    component: rooms
  },
  {
    path: '/room/:roomdetail_id',
    name: 'room-detail',
    component: roomdetail,
    children: [
      {
        path: '', 
        component: BlankPage, 
      },
      {
        path: 'facilities', 
        component:  BlankPage,
      },
      {
        path: 'policy', 
        component:  BlankPage,
      },
      // ...
    ],
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register,
    children: [
      {
        path: '', 
        component: BlankPage, 
      },
      {
        path: 'id', 
        component:  BlankPage,
      },
      {
        path: 'photo', 
        component:  BlankPage,
      },
      // ...
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path:'/HomeComponent',
    name:'HomeComponent',
    component:HomeComponent,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
