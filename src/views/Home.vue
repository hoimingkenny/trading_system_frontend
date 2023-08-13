<template>
  <div>
    <v-header />
    <v-sidebar />
    <h1>Home page</h1>
    <router-view></router-view>
  </div>
</template>

<script>
  // @ is an alias to /src
  import vHeader from '../components/Header'
  import vSidebar from '../components/Sidebar'

  export default {
    name: 'Home',
    data() {
      return {
        collapse: false,
      }
    },
    components: {
      vHeader,
      vSidebar
    },
    created() {
      this.$bus.on("collapse-content", msg => {
        this.collapse = msg;
      })
    },
    beforeDestroy() {
      this.$bus.off("collapse-content", msg => {
        this.collapse = msg;
      });
    }
  }
</script>
