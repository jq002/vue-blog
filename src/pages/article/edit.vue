<template>
  <div class="container">
      <h3 class="title is-3">{{article.get('title')}}</h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
        <el-form-item label="文章分类" prop="category">
          <el-select v-model="form.category" value-key="id" placeholder="请选择文章分类">
            <el-option v-for="cate in categorys" :key="cate.id" :label="cate.get('name')" :value="cate"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <div class="el-form-item is-required" :class="{'is-error':validate.error}">
          <label class="el-form-item__label">文章内容</label>
          <div class="el-form-item__content">
            <div id="editor"></div>
            <div v-if="validate.error" class="el-form-item__error">正文则能没有内容呢？</div>
          </div>
        </div>
          <el-form-item>
            <el-button type="primary" @click="submit" @keyup.enter="submit">发布文章</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
let editor = null; //文章内容，不写在data，响应式会增加开销，也会造成问题
export default {
  name: "create",
  data() {
    return {
      categorys: [],
      article: null,
      form: {
        category: null,
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "必须填写标题哦！", trigger: "blur" }
        ],
        category: [
          {
            type: "object",
            required: true,
            message: "必须填写分类哦！",
            trigger: "blur"
          }
        ]
      },
      validate: {
        error: false
      }
    };
  },
  computed: mapState(["user"]),
  created() {
    this.getCategory();
    const id = this.$route.params.id;
    this.getArticle(id);
  },
  mounted() {
    this.initEditor(); //在挂载完成后初始化（需要DOM节点）富文本编辑器
  },
//   watch:{
//       'this.categorys.length'(){
//           const index=this.categorys.findIndex(c=>cid==id);
//           this.form.category=this.categorys[index];

//       }

//   },
  methods: {
    getContent() {
      return editor.txt.html();
    },
    setContent(html){
        // editor.txt.html(html)
    },
    initEditor() {
      let E = window.wangEditor;
      editor = new E("#editor");
      editor.create();
      editor.onchange = () => {
        this.validateContent();
      };
    },
    wait(flag){
        console.log(flag)
        return new Promise((resolve,reject)=>{
            let timer=null;
            if(flag){
                resolve();
            }else{
                timer=setInterval(()=>{
                    if(!flag) return;
                    resolve()
                    clearInterval(timer);
                },500)
            }
        })
    },
    getArticle(id) {
      const q = new this.$api.AV.Query("Article");
      q.include("category");
      q.include("author");
      q
        .get(id)
        .then(article => {
          this.article = article;
          this.form.title=article.get('title');
          this.form.category=article.get('category');
          this.wait(editor).then(()=>{
          this.setContent(this.article.get('content'));
          this.$Progress.finish();

          })
        })
        .catch(console.log);
    },
    getCategory() {
      const cq = new this.$api.AV.Query("Category");
      cq
        .find()
        .then(categorys => {
          this.categorys = categorys;
        //   this.form.category = categorys[0];
        //   this.$Progress.finish();
        })
        .catch(console.error);
    },
    validateContent() {
      if (this.getContent() == "<p><br></p>") {
        this.validate.error = true;
        $(".wangEditor-container").css({ borderColor: "red" });
        return false;
      } else {
        this.validate.error = false;
        $(".wangEditor-container").css({ borderColor: "#ccc" });
        return true;
      }
    },
    setArticle() {
      const article = this.article;
      article.set("author", this.user);
      article.set("title", this.form.title);
      article.set("content", this.getContent());
      article.set("category", this.form.category);
      return article;
    },
    setACL(article) {
      let acl = new this.$api.AV.ACL();
      acl.setPublicReadAccess(true);
      acl.setWriteAccess(this.user, true);
      article.setACL(acl);
    },
    save(article) {
      article
        .save()
        .then(article => {
          console.log(article);
          const message = `文章《${article.get("title")}》发布成功`;
          this.$message({ message, type: "success" });
          this.$router.replace({
            name: "ArticleShow",
            params: { id: article.id }
          });
        })
        .catch(console.error);
    },
    submit() {
      this.$refs.form.validate(valid => {
        let me = this.validateContent();
        if (valid && me) {
          const article = this.createArticle();
          this.setACL(article);
          this.save(article);
        } else {
          console.log("error submit!!!");
          this.$message.error("您填写的信息有误，请按照提示修改");
          return false;
        }
      });
    }
  }
};
</script>

<style>

</style>
