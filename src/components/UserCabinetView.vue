<template>
  <TabView>
    <TabPanel>
      <template #header>
        <i class="pi pi-user"></i>
        <span>Мой профиль</span>
      </template>
      <b>
        <p>Данные профиля</p>
      </b>
      <div class="mt-5">
        <Avatar :image="imageAddress" size="xlarge" shape="circle">
        </Avatar>
        <div class="field flex flex-column mt-3">
          <b><label class="flex justify-content-start" for="email">E-mail пользователя</label></b>
          <InputText class="flex justify-content-start mt-1" style="width: 15%" id="email" type="email"
            v-model="user.email" disabled />
        </div>
        <div class="field flex flex-column mt-3">
          <b><label class="flex justify-content-start" for="fullname">ФИО пользователя</label></b>
          <InputText class="flex justify-content-start mt-1" style="width: 15%" id="fullname"
            v-model="user.user_profile.full_name" />
        </div>
        <div class="field flex flex-column mt-3">
          <b><label class="flex justify-content-start" for="birthday">Дата рождения</label></b>
          <InputText class="flex justify-content-start mt-1" style="width: 15%" id="birthday"
            v-model="user.user_profile.birthday" />
        </div>
        <div class="field flex flex-column mt-3">
          <b><label class="flex justify-content-start" for="sex">Пол</label></b>
          <Dropdown class="flex justify-content-start mt-1" style="width: 15%" v-model="user.user_profile.sex"
            :options="sexList" optionLabel="name" optionValue="value" placeholder="Выберите пол" id="sex" />
        </div>
        <div class="field flex flex-column mt-3">
          <b><label class="flex justify-content-start" for="building">Общежитие</label></b>
          <Dropdown class="flex justify-content-start mt-1" style="width: 15%" v-model="this.user.user_profile.user_building.id"
            :options="buildingList" optionLabel="name" optionValue="value" placeholder="Выберите ваше общежитие" id="building" />
        </div>
      </div>
    </TabPanel>
    <TabPanel>
      <template #header>
        <i class="pi pi-calendar"></i>
        <span>Мои заявки</span>
      </template>
      <TabView>
        <TabPanel>
          <template #header>
            <span>Активные</span>
          </template>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Закрытые</span>
          </template>
        </TabPanel>
        <TabPanel>
          <template #header>
            <span>Все</span>
          </template>
        </TabPanel>
      </TabView>
    </TabPanel>
  </TabView>
</template>

<script>
import { isJwtExpired } from 'jwt-check-expiration';
import axios from 'axios';
import * as R from 'ramda';

const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default {

  data() {
    return {
      imageAddress: 'http://192.168.221.142:8055/assets/7dc88415-8cae-4a20-91db-f75f4912afe6',
      user: {
        email: '',
        user_profile: {
          full_name: '',
          sex: '',
          birthday: '',
          user_building: {},
        },
      },
      sexList: [
        { name: 'Мужской', value: 'Male' },
        { name: 'Женский', value: 'Female' },
      ],

      buildingList: [
        { name: 'Общежитие №1, ул. 20-летия Октября, 120', value: 1 },
        { name: 'Общежитие №2, пр-кт Московский, 52', value: 2 },
        { name: 'Общежитие №3, пр-кт Московский, 176', value: 3 },
      ],
    };
  },

  created() {
    if (isJwtExpired(this.localStorage.accessToken)) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${this.localStorage.refreshToken}`;
      instance.post('/auth/refresh')
        .then((response) => {
          this.localStorage.accessToken = response.data.access_token;
          this.localStorage.refreshToken = response.data.refresh_token;

          instance.defaults.headers.common['Authorization'] = `Bearer ${this.localStorage.accessToken}`;
          instance.get('/user/avatar').then((response) => {
            const avatarID = response.data.avatar_id;
            this.imageAddress = avatarID ? `http://192.168.221.142:8055/assets/${avatarID}` : 'http://192.168.221.142:8055/assets/7dc88415-8cae-4a20-91db-f75f4912afe6';
          }).catch(console.log)

          instance.get('/user').then((response) => {
            this.user = {
              ...response.data,
              user_profile: R.head(response.data.user_profile),
            }
            this.user.user_profile.user_building = this.user.user_profile.user_building || {};
          }).catch(console.log)
        })
        .catch(() => {
          this.localStorage.accessToken = '';
          this.localStorage.refreshToken = '';
          this.$router.push('/');
        })
    } else {
      instance.defaults.headers.common['Authorization'] = `Bearer ${this.localStorage.accessToken}`;
      instance.get('/user/avatar').then((response) => {
        const avatarID = response.data.avatar_id;
        this.imageAddress = avatarID ? `http://192.168.221.142:8055/assets/${avatarID}` : 'http://192.168.221.142:8055/assets/7dc88415-8cae-4a20-91db-f75f4912afe6';
      }).catch((error) => console.log(error))

      instance.get('/user').then((response) => {
        this.user = {
          ...response.data,
          user_profile: R.head(response.data.user_profile),
        }
        this.user.user_profile.user_building = this.user.user_profile.user_building || {};
      }).catch(console.log)
    }
  },

  computed: {
    isTokenExpired() {
      return isJwtExpired(this.localStorage.accessToken);
    },
  },

  methods: {},

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