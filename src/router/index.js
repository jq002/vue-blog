import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/pages/List'
import SignUp from '@/pages/SignUp'
import Login from '@/pages/Login'
import ArticleCreate from '@/pages/article/create'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },  {
      path: '/list',
      name: 'List',
      component: List
    },  {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },  {
      path: '/login',
      name: 'Login',
      component: Login
    },{
       path:'/article/create',
       name:'ArticleCreate',
       component:ArticleCreate,
       meta:{
         needLogin:true
       }
    }
  ]
})
