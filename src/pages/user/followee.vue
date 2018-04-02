<template>
  <div class="container">
      <h3>我的关注</h3>
      <el-card class="box-card" v-for="(followee,index) in followees" :key="followee.id">
  <div slot="header" class="clearfix">
    <span>{{followee.get('username')}}</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="cancelFollow(followee,index)">取消关注</el-button>
  </div>
  <div >
    <el-tag type="success">{{followee.get('email')}}</el-tag>
    
  </div>
</el-card>

  </div>
</template>

<script>
export default {
  name: "followee",
  data() {
    return {
      articles: [],
      followees: []
    };
  },
  created() {
    this.followeeList();
  },
  methods: {
    followeeList() {
      var query = this.$api.AV.User.current().followeeQuery();
      query.include("followee");
      query.find().then(followees => {
        this.followees = followees;
        this.$Progress.finish();
        //关注的用户列表 followees
      });
    },
    cancelFollow(followee,index) {
      this.$api.AV.User.current()
        .unfollow(followee)
        .then(
          ()=> {
            //取消关注成功
            this.followees.splice(index,1)
            this.$message({ type: "success", message: "已取消关注" });
            // this.$router.go(-1)
          },
          (err)=> {
            //取消关注失败
            console.dir(err);
          }
        );
    }
  }
};
</script>

<style scoped>
.el-card{
  margin-bottom: 15px;
}

</style>
