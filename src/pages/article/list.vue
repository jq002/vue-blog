<template>
  <div class="container">
    <header>
    <h2>{{title}}</h2>
    </header>
    <!-- <el-card class="box-card" v-for="article in articles" :key="article.id">
      <div slot="header" class="clearfix">
        <router-link :to="{ name:'ArticleShow',params:{id:article.id}}">
          {{article.get('title')}}
        </router-link>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="content" v-html="article.get('content')">
      </div>
    </el-card> -->
    <section>
      <article v-for="article in articles" :key="article.id">
        <h3>
          <router-link :to="{ name:'ArticleShow',params:{id:article.id}}">
            {{article.get('title')}}
          </router-link>
          <el-tag  style="float: right;" >作者：{{article.get('author').get('username')}}</el-tag>
           <!-- <el-button style="float: right;" icon="el-icon-star-off" circle></el-button> -->
        </h3>
        <div class="content" v-html="article.get('content')">
           
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "List",
  data() {
    return {
      title: "",
      articles: []
    };
  },
  created() {
    this.match();
  },
  watch: {
    ["$route.query"]() {
      console.log("render");
      this.articles = [];
      this.match();
    }
  },
  computed: mapState(["user"]),
  methods: {
    match() {
      let flag = this.$route.query.type || this.$route.query.cid;
      this.$Progress.start();
      switch (flag) {
        case "me":
          this.getMyArticles();
          break;
        case "all":
          this.getAllArticles();
          break;
        default:
          this.getCategoryArticles(flag);
      }
    },
    getMyArticles() {
      this.title = "我的文章";
      const q = this.query();
      // console.log(user);
      q.equalTo("author", this.user);
      this.setArticles(q);
    },
    getAllArticles() {
      this.title = "所有文章";
      const q = this.query();
      this.setArticles(q);
    },
    getCategoryArticles(cid) {
      let cateObj = this.getCategoryObj(cid);
      const q = this.query();
      q.equalTo("category", cateObj);
      this.setArticles(q);
    },
    getCategoryObj(id) {
      return this.$api.AV.Object.createWithoutData("Category", id);
    },
    setArticles(q) {
      q
        .find()
        .then(articles => {
          this.articles = articles;
          this.$Progress.finish();
        })
        .catch(this.fail);
    },
    fail(error) {
      this.$message.error(error);
      this.$Progress.fail();
    },
    query() {
      let q = new this.$api.AV.Query("Article");
      q.include("category");
      q.include("author");
      q.descending("createdAt"); //新創建的在前面
      return q;
    }
  }
};
</script>

<style scoped>
h3{
  margin:  0;
}
article{
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}
.content {
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
</style>
