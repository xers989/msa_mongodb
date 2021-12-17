import Vue from 'vue'
import VueRouter from 'vue-router'

import UserInfo from '../components/UserInfo.vue'
import UserList from '../components/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserInfo',
    component: UserInfo,
    children: [{
      path: 'list',
      name: 'UserList',
      component: UserList
    }
  ]}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router