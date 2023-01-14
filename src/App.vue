<template>
  <Header></Header>
  <MainLayout></MainLayout>
</template>

<script>
import Header from "./components/Header.vue";
import MainLayout from "./components/MainLayout.vue";

export default {
  name: 'App',

  components: {
    Header,
    MainLayout,
  },
}
</script>

<style scoped>

</style>
