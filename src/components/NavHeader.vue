<template>
  <div class="container">
      <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect" :router="true">
  <el-menu-item index="/">我</el-menu-item>
  <el-submenu index="2">
    <template slot="title">菜单</template>
    <el-menu-item index="/list">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="4" >登录</el-menu-item>
    <el-menu-item index="/signup" >注册</el-menu-item>
</el-menu>
  </div>
</template>

<script>
export default {
     data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
<style lang="less" scoped>
 .el-menu-header{
     .el-menu-item:first-child{
         background-color: #20a0ff;
         color: #fff;
        //  font-size: 25px;
     }
 }
</style>

