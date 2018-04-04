import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ArticleList from '@/pages/article/list'
import SignUp from '@/pages/signUp'
import Login from '@/pages/login'
import ArticleCreate from '@/pages/article/create'
import ArticleShow from '@/pages/article/show'
import ArticleEdit from '@/pages/article/edit'
import Follower from '@/pages/user/follower'
import Followee from '@/pages/user/followee'
import Friend from '@/pages/user/friend'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    }, {
      path: '/article',
      name: 'ArticleList',
      component: ArticleList
    }, {
      path: '/signup',
      name: 'Signup',
      component: SignUp
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/article/show/:id',
      name: 'ArticleShow',
      component: ArticleShow,
    }, {
      path: '/article/create',
      name: 'ArticleCreate',
      component: ArticleCreate,
      meta: {
        needLogin: true
      }
    }, {
      path: '/article/edit/:id',
      name: 'ArticleEdit',
      component: ArticleEdit,
      meta: {
        needLogin: true
      }
    }, {
      path: '/user/follower',
      name: 'Follower',
      component: Follower,
      meta: {
        needLogin: true
      }
    }, {
      path: '/user/followee',
      name: 'Followee',
      component: Followee,
      meta: {
        needLogin: true
      }
    }, {
      path: '/user/friend',
      name: 'Friend',
      component: Friend,
      meta: {
        needLogin: true
      }
    }
  ]
})
