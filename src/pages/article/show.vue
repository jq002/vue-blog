<template>
  <div class="container">
    <template v-if="article"> 
      <h3>{{article.get('title')}}</h3>
      <div class="oprate" v-if="uid==article.get('author').id">
        <el-button type="primary" icon="el-icon-edit" @click="toEdit"></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="destroy"></el-button>
      </div>
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
      article: null
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
    toEdit(){
          this.$router.replace({name:'ArticleEdit',params:{id:this.article.id}})
    },
    getArticle(id) {
      const q = new this.$api.AV.Query("Article");
      q.include('category');
      q.include('author');
      q
        .get(id)
        .then(article => {
          this.article = article;
          this.$Progress.finish();
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
