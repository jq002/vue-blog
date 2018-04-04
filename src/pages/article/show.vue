<template>
  <div class="container">
    <template v-if="article"> 
      <h3>{{article.get('title')}}</h3>
      <template v-if="uid">
      <div class="oprate" v-if="uid==article.get('author').id">
        <el-button type="primary" icon="el-icon-edit" @click="toEdit"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="destroy"></el-button>
      </div>
      <div v-else class="oprate">
        <el-button  v-if="follow" type="info"  round >已关注</el-button>
        <el-button  v-else type="primary"  icon="el-icon-plus" round @click="toFollow">关注</el-button>
      </div>
      </template>
      <div class="content" v-html="article.get('content')"></div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "show",
  data() {
    return {
      article: null,
      follow: false
    };
  },
  computed: {
    ...mapGetters(["uid"])
  },
  created() {
    const id = this.$route.params.id;
    this.getArticle(id);
  },
  methods: {
    isFollow(id) {
      var query = this.$api.AV.User.current().followeeQuery();
      query.find().then(followees => {
        //关注的用户列表 followees
        this.follow = followees.some(followee => followee.id == id);
        this.$Progress.finish();

      });
    },
    toFollow() {
      const id = this.article.get("author").id;
      this.$api.AV.User.current()
        .follow(id)
        .then(
          () => {
            this.follow = true;
            this.$message({ type: "success", message: "已关注" });
          },
          err => {
            //关注失败
            console.dir(err);
          }
        );
    },
    toEdit() {
      this.$router.replace({
        name: "ArticleEdit",
        params: { id: this.article.id }
      });
    },
    getArticle(id) {
      const q = new this.$api.AV.Query("Article");
      q.include("category");
      q.include("author");
      q
        .get(id)
        .then(article => {
          this.article = article;
          if(this.uid&&this.uid!=article.get('author').id){
          this.isFollow(this.article.get("author").id);
          }else{
          this.$Progress.finish();
          }
        })
        .catch(console.log);
    },
    destroy() {
      this.article.destroy().then(() => {
        this.$message({ type: "success", message: "刪除成功" });
        this.$router.replace({ path: "/article?type=all" });
      });
    }
  }
};
</script>

<style>

</style>
