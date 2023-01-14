<template>
  User cabinet
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    if (to.redirectedFrom && to.redirectedFrom.name === 'logout') {
      this.localStorage.accessToken = '';
      this.localStorage.refreshToken = '';
    }
    next()
  },
};
</script>

<style scoped>

</style>