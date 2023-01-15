
<template>
  <div v-if="isAuth">
    <Menubar :model="items" class="justify-content-end">
      <template #item="{item}">
        <router-link :to="item.to" custom v-slot="{navigate, isActive}">
          <Button
            :style="isActive ? 'color: var(--orange-700); text-decoration: underline solid var(--orange-700) !important' : 'none'"
            :label="item.label" :icon="item.icon" @click="navigate" class="p-button-link" />
        </router-link>
      </template>
    </Menubar>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },

  data() {
    return {
      items: [
        {
          label: 'Выход',
          icon: 'pi pi-fw pi-power-off',
          to: '/logout',
        }
      ],
    }
  },

  methods: {
    logout(event) {
      console.log(event);
    }
  },

  computed: {
    isAuth() {
      return this.localStorage.accessToken !== '' && this.$router.currentRoute.value.name !== 'login';
    },
  },
}
</script>

<style scoped>
h3 {
  color: var(--teal-700)
}
</style>