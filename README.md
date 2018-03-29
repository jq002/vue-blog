# vue-blog
[vue-blog](https://github.com/jq002/vue-blog.git)

> A Vue.js project

## Build Setup

``` bash
npm install
npm start

```
## 使用插件、库
```
    "leancloud-storage": "^3.6.3",
    "vue-progressbar": "^0.7.4",
    "vuex": "^3.0.1"
     cnpm vuex leancloud-storage vue-progressbar --save
```
[vue-progress](https://github.com/hilongjw/vue-progressbar#usage)
## BEM命名规范
```
B:block,E:elment,M:modifier变化
__ 快与快的子元素
_描述一个快，或快的一种状态
-作为连字符使用，多单词的链接
不应该大于两个层级（大于的话，考虑在拆分子组件）
```
## bug
state.user初始化为{}导致之后出现问题
- navheader组件，v-if='user'退出时报错，需使用v-if='user===null'
- 判断对象 user={}
```
Object.keys(user).length === 0 && user.constructor === Object//ok
user=={}// X
!user//X
user==null//X
```

- 创建文章类别选项与富文本编辑器导致问题 
```
富文本编辑器：z-index=10001
```