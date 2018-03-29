<template>
  <div class="container">
      <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect" :router="true">
  <el-menu-item index="/"><i class="fa fa-home" aria-hidden="true"></i>琵琶</el-menu-item>
  <el-submenu index="2">
    <template slot="title">探索</template>
    <el-menu-item index="/list">热门文章</el-menu-item>
    <el-menu-item index="2-2">图片</el-menu-item>
    <el-menu-item index="2-3">杂项</el-menu-item>
  </el-submenu>
  <template v-if="!user">
    <el-menu-item index="/signup" class="el-menu__signup"><i class="fa fa-user-circle" aria-hidden="true"></i>注册</el-menu-item>
    <el-menu-item index="/login" class="el-menu__login"><i class="fa fa-paper-plane" aria-hidden="true"></i>登录</el-menu-item>
  </template>
  <template v-else>
    <el-menu-item index="6" class="el-menu__loginout" @click="handleExit"> 退出</el-menu-item>
    <el-submenu index="5" class="el-menu__options">
      <span slot="title">{{user.getUsername()}}</span>
      <el-menu-item index="5-1">个人中心</el-menu-item>
      <el-menu-item index="/article/create">发布文章</el-menu-item>
      <el-menu-item index="5-3">消息</el-menu-item>
    </el-submenu>
  </template>
</el-menu>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
     data() {
      return {
        activeIndex: '/',
      };
    },
    computed:mapState(['user']),
    created(){
      this.activeIndex=this.$route.path;//刷新不高亮问题
      this.$router.afterEach((to,from)=>{
        this.activeIndex=to.path;//编程式切换路由不高亮问题
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      ...mapActions(['exit']),
      handleExit(){
        this.exit();
        this.$api.AV.User.logOut();//退出持久化
        this.$router.push({path:'/'});

        this.$message.success('成功退出');

      }
    }
};
</script>
<style lang="less" scoped>
 .el-menu{
     .el-menu-item{
        i{
          padding-right: 5px;
        }
     }
     &__signup,&__login,&__options,&__loginout{
       float: right;
     }
 }
</style>

