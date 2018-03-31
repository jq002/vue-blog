<template>
  <div id="app">
        <vue-progress-bar></vue-progress-bar>
        <nav-header></nav-header>
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader.vue'
export default {
  name: 'App',
  components:{NavHeader},
 mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      // this.$Progress.finish()
    })
  }
}
</script>

<style>
</style>
