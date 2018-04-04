<template>
    <div class="container">
      <h3>朋友圈</h3>
      <ul>
          <li v-for="status in statuses" :key="status.id">{{status.data.message}}<el-tag type="warning">{{status.createdAt}}</el-tag></li>
      </ul>
      <h4>我的消息</h4>
        <ul>
          <li v-for="status in pStatuses" :key="status.id">
              {{status.data.message}}
               <el-button type="primary" plain>回复私信</el-button>
              <el-tag type="warning">{{status.createdAt}}</el-tag>
         </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: "friend",
  data() {
    return {
      statuses: [],
      pStatuses: []
    };
  },
  created() {
    this.getDefaultStatus();
    this.getPrivateStatus();
  },
  methods: {
    getDefaultStatus() {
      var query = this.$api.AV.Status.inboxQuery(this.$api.AV.User.current());
      query.find().then(
        statuses => {
          //查询成功，返回状态列表，每个对象都是 AV.Status
          console.log(statuses);
          this.statuses = statuses;
          this.$Progress.finish();
        },
        function(err) {
          //查询失败
          console.dir(err);
        }
      );
    },
    getPrivateStatus() {
      var query = this.$api.AV.Status.inboxQuery(
        this.$api.AV.User.current(),
        "private"
      );
      query.find().then(
        statuses => {
          //查询成功，返回状态列表，每个对象都是 AV.Status
          console.log(statuses);
          this.pStatuses = statuses;
          this.$Progress.finish();
        },
        function(err) {
          //查询失败
          console.dir(err);
        }
      );
    }
  }
};
</script>

<style>

</style>
