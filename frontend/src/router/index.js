import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from 'jwt-decode'

import Home from "../views/Home.vue";
import Login from  "../views/Login.vue";
import Register from "../views/Register.vue"

import Userboard from "../views/Userboard.vue"
import Transaction from "../views/Transaction.vue"
import Record from "../views/Record.vue"

import Allusers from "../views/Allusers.vue"
import Bankerboard from '../views/Bankerboard.vue'
import UserRecord from '../views/UserRecord.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/customers",
    name: "Userboard",
    component: Userboard,
    meta: {
      requiresAuth: true,
      isCustomer: true
    }
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
    meta: {
      requiresAuth: true,
      isCustomer: true
    }
  },
  {
    path: "/transrecord",
    name: "Record",
    component: Record,
    meta: {
      requiresAuth: true,
      isCustomer: true
    }
  },

  {
    path: "/bankers",
    name: "Bankerboard",
    component: Bankerboard,
    meta: {
      requiresAuth: true,
      isBanker: true
    }
  },
  {
    path: "/allusers",
    name: "Allusers",
    component: Allusers,
    meta: {
      requiresAuth: true,
      isBanker: true
    }
  },
  {
    path: "/userrecord",
    name: "Userrecord",
    component: UserRecord,
    meta: {
      requiresAuth: true,
      isBanker: true
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') === null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = jwt_decode(localStorage.getItem('token'))
          if(to.matched.some(record => record.meta.isBanker)) {
              if(user.designation === 'banker'){
                  next()
              }
              else{
                  next({ name: 'Bankerboard'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') === null){
          next()
      }
      else{
          next({ name: 'Userboard'})
      }
  }else {
      next()
  }
})

export default router
