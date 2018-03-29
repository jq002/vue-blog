// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
import store from './store'
import api from './api'
import '@/assets/global.css'

Vue.config.productionTip = false

localStorage.setItem('debug','leancloud*')

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record=>record.meta.needLogin)){
    if(!store.state.user){
      app.$message.error("请先登录");
      next({path:'/login',})
    }else{
      next();
    }
  }else{
    next();
  }

})

Vue.mixin({
  beforeCreate(){
    if(!this.$api){
      this.$api=api;
    }
  }
})
//持久化登陆
const user =api.AV.User.current();
if(user){
  store.commit('setUser',user);
}
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(ElementUI);

/* eslint-disable no-new */
const app=new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render:(h)=>h(App)
})
