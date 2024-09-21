import { createRouter, createWebHistory } from 'vue-router'
import client from '../views/client.vue'
import exchange from '../views/exchange.vue'
import nat from '../views/nat.vue'
import server from '../views/server.vue'

const routes = [
  
  {
    path: '/',
    name: 'test1',
    component: () => import('../views/test1.vue'),

    redirect: {name: "client"},   //输入路由center会重定向到a页面
    children:
      [
        {
          path: "client",
          name: "client",
          component: client
        },
        {
          path: "exchange",
          name: "exchange",
          component: exchange
        },
        {
          path: "nat",
          name: "nat",
          component: nat
        },
        {
          path: "server",
          name: "server",
          component: server
        }
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
