<template>
  <div class="container">
      <h2>注册</h2>
      <el-form :model="signForm" status-icon :rules="signRules" ref="signForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="username" >
    <el-input type="text" v-model="signForm.username" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="signForm.pass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="signForm.checkPass" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email" >
    <el-input  v-model="signForm.email" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('signForm')">提交</el-button>
    <!-- <el-button @click="resetForm('signForm')">重置</el-button> -->
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.signForm.checkPass !== "") {
          this.$refs.signForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      signForm: {
        pass: "",
        checkPass: "",
        username:"",
        email:""
      },
      signRules: {
        pass: [{ validator: validatePass, trigger: "blur" },{ required: true}],
        checkPass: [{ validator: validatePass2, trigger: "blur" },{ required: true}],
        username:[{ required: true, message: '用户名不能为空'}],
        email:[ { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user=new this.$api.AV.User();
          user.setUsername(this.signForm.username);
          user.setPassword(this.signForm.pass);
          user.setEmail(this.signForm.email);
          user.signUp().then((loginUser)=>{
              this.$store.commit('setUser',loginUser);
              this.$router.go(-1);
              this.$message.success("注册成功")
          }).catch(error=>{
              console.error(error);
              this.$message.error(error.message);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less" scoped>
.container{
    width: 400px;
    h2{
        text-align: center;
    }
}
</style>

