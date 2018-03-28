<template>
  <div class="container">
      <h2>登录</h2>
      <el-form :model="user" status-icon :rules="signRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username" >
    <el-input type="text" v-model="user.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="user.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        pass: "",
        username: "",
      },
      signRules: {
        pass: [{ required: true, message: "请输入密码" }],
        username: [{ required: true, message: "请输入用户名" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.AV.User.logIn(this.user.username,this.user.pass)
            .then((loginUser) => {
              this.$store.dispatch("login", loginUser);//组件中分发action
              this.$router.push({path:'/'});
              this.$message.success("登录成功");
            })
            .catch(error => {
              console.error(error);
              this.$message.error(error.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 400px;
  margin: auto;

  h2 {
    position: relative;
    left: 100px;
  }
}
</style>

