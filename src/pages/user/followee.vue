<template>
  <div class="container">
      <h3>我的关注</h3>
      <el-card class="box-card" v-for="(followee,index) in followees" :key="followee.id">
  <div slot="header" class="clearfix">
    <span>{{followee.get('username')}}</span>
    <el-button style="float: right; padding: 3px 0;margin:0 10px" type="text" @click="cancelFollow(followee,index)">取消关注</el-button>
     <el-button style="float: right; padding: 3px 0"  plain @click="open(followee)">发送私信</el-button>
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
    cancelFollow(followee, index) {
      this.$api.AV.User.current()
        .unfollow(followee)
        .then(
          () => {
            //取消关注成功
            this.followees.splice(index, 1);
            this.$message({ type: "success", message: "已取消关注" });
            // this.$router.go(-1)
          },
          err => {
            //取消关注失败
            console.dir(err);
          }
        );
    },
    open(followee) {
      this.$prompt(`to:${followee.get('username')}`, "发送私信", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.sendPrivate(followee, value);
        })
        .catch(() => {
          //取消输入
        });
    },
    sendPrivate(followee, value) {
      var status = new this.$api.AV.Status(null, value);
      this.$api.AV.Status.sendPrivateStatus(status, followee.id).then(
        (status) =>{
          //发送成功
          console.dir(status);
          this.$message({
            type: "success",
            message: "私信发送成功"
          });
        },
        function(err) {
          //发布失败
          console.dir(err);
        }
      );
    }
  }
};
</script>

<style scoped>
.el-card {
  margin-bottom: 15px;
}
</style>
