<template>
  <div class="container">
      <h3>我的粉丝</h3>
      <div v-for="follower in followers" :key="follower.id">
        {{follower.get('username')}}
      </div>
  </div>
</template>

<script>
export default {
  name: "follower",
  data() {
    return {
      followers: []
    };
  },
  created() {
    this.followerList()
  },
  methods: {
    followerList() {
      var query = this.$api.AV.User.current().followerQuery();
      query.include("follower");
      query.find().then(followers => {
        //粉丝列表 followers
        this.followers = followers;
        this.$Progress.finish();
      });
    }
  }
};
</script>

<style>

</style>
