import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ArticleList from '@/pages/article/list'
import SignUp from '@/pages/SignUp'
import Login from '@/pages/Login'
import ArticleCreate from '@/pages/article/create'
import ArticleShow from '@/pages/article/show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },  {
      path: '/article',
      name: 'articleList',
      component: ArticleList
    },  {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    },  {
      path: '/login',
      name: 'Login',
      component: Login
    },{
       path:'/article/show',
       name:'ArticleShow',
       component:ArticleShow,
    }
  ]
})
