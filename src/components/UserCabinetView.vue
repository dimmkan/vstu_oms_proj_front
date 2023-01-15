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
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="mt-5">
          <Avatar :image="imageAddress" size="xlarge" shape="circle" @click="displayModal = true">
          </Avatar>
          <div class="field flex flex-column mt-3">
            <b><label class="flex justify-content-start" for="email">E-mail пользователя</label></b>
            <InputText class="flex justify-content-start mt-1" :class="{ 'p-invalid': v$.user.email.$invalid }"
              style="width: 15%" id="email" type="email" v-model="user.email" disabled />
          </div>
          <div class="field flex flex-column mt-3">
            <b><label class="flex justify-content-start" for="fullname">ФИО пользователя</label></b>
            <InputText class="flex justify-content-start mt-1"
              :class="{ 'p-invalid': v$.user.user_profile.full_name.$invalid }" style="width: 15%" id="fullname"
              v-model="user.user_profile.full_name" />
          </div>
          <div class="field flex flex-column mt-3">
            <b><label class="flex justify-content-start" for="birthday">Дата рождения</label></b>
            <InputText class="flex justify-content-start mt-1"
              :class="{ 'p-invalid': v$.user.user_profile.birthday.$invalid }" style="width: 15%" id="birthday"
              v-model="user.user_profile.birthday" />
          </div>
          <div class="field flex flex-column mt-3">
            <b><label class="flex justify-content-start" for="sex">Пол</label></b>
            <Dropdown class="flex justify-content-start mt-1"
              :class="{ 'p-invalid': v$.user.user_profile.sex.$invalid }" style="width: 15%"
              v-model="user.user_profile.sex" :options="sexList" optionLabel="name" optionValue="value"
              placeholder="Выберите пол" id="sex" />
          </div>
          <div class="field flex flex-column mt-3">
            <b><label class="flex justify-content-start" for="building">Общежитие</label></b>
            <Dropdown class="flex justify-content-start mt-1"
              :class="{ 'p-invalid': v$.user.user_profile.user_building.id.$invalid }" style="width: 15%"
              v-model="user.user_profile.user_building.id" :options="buildingList" optionLabel="name"
              optionValue="value" placeholder="Выберите ваше общежитие" id="building" />
          </div>
          <Button label="Сохранить изменения" class="p-button-raised p-button-success p-button-text mt-5" type="submit"
            :disabled="disabledButton" />
        </div>
      </form>
      <Dialog header="Загрузка аватара" v-model:visible="displayModal"
        :breakpoints="{ '260px': '25vw', '140px': '30vw' }" :style="{ width: '30vw' }" :modal="true">
        <FileUpload name="avatar" :customUpload="true" @uploader="myUploader" :multiple="false" accept="image/*"
          :maxFileSize="1000000" chooseLabel="Выбрать" uploadLabel="Загрузить" cancelLabel="Отменить">
          <template #content>
            <ul v-if="uploadedFiles && uploadedFiles[0]">
              <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
            </ul>
          </template>
          <template #empty>
            <p>Перетащите файл в эту область для загрузки</p>
          </template>
        </FileUpload>
      </Dialog>
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
          <DataTable :value="activeOrders" :paginator="true" class="p-datatable-orders" :rows="10" dataKey="id"
            :rowHover="true" v-model:filters="filters" filterDisplay="menu"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Показаны записи с {first} по {last} из {totalRecords} записей"
            :globalFilterFields="['id', 'theme', 'description']" responsiveLayout="scroll">
            <template #header>
              <div class="flex justify-content-between align-items-center">
                <h5 class="m-0">Активные заявки</h5>
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filters['global'].value" placeholder="Поиск" />
                </span>
              </div>
            </template>
            <template #empty>
              Заявки не найдены.
            </template>
            <template #loading>
              Заявки загружаются, пожалуйста подождите.
            </template>
            <Column field="id" header="Номер заявки" sortable dataType="numeric" style="min-width: 8rem">
              <template #body="{ data }">
                {{ data.id }}
              </template>
              <template #filter="{ filterModel }">
                <InputNumber v-model="filterModel.value" />
              </template>
            </Column>
            <Column field="status" header="Статус" sortable style="min-width: 10rem">
              <template #body="{ data }">
                <Tag :rounded="true" :severity="data.status === 'inprogress' ? 'warning' : 'info'">{{
                statuses[data.status] }}</Tag>
              </template>
            </Column>
            <Column field="theme" header="Тема" sortable style="min-width: 14rem">
              <template #body="{ data }">
                {{ data.theme }}
              </template>
              <template #filter="{ filterModel }">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                  placeholder="Поиск по теме" />
              </template>
            </Column>
            <Column field="description" header="Описание заявки" sortable style="min-width: 14rem">
              <template #body="{ data }">
                {{ data.description }}
              </template>
              <template #filter="{ filterModel }">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                  placeholder="Поиск по описанию" />
              </template>
            </Column>
            <Column field="date_created" header="Дата создания" sortable dataType="date" style="min-width: 8rem">
              <template #body="{ data }">
                {{ formatDate(data.date_created) }}
              </template>
            </Column>
            <Column field="date_updated" header="Дата последнего изменения" sortable dataType="date" style="min-width: 8rem">
              <template #body="{ data }">
                {{ formatDate(data.date_updated) }}
              </template>
            </Column>
          </DataTable>
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
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default {
  setup: () => ({ v$: useVuelidate() }),

  watch: {
    displayModal(newValue) {
      if (!newValue) {
        this.getUserInfo(this.localStorage.accessToken)
      }
    }
  },

  data() {
    return {
      statuses: {
        accepted: 'Принята',
        inprogress: 'В работе',
        finished: 'Выполнена'
      },
      orders: [],
      uploadedFiles: [],
      displayModal: false,
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

      filters: {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        'theme': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'description': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'date_created': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        'date_updated': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
      },
    };
  },

  validations() {
    return {
      user: {
        email: { required, email },
        user_profile: {
          full_name: { required },
          sex: { required },
          birthday: { required },
          user_building: {
            id: { required },
          },
        },
      },
    }
  },

  mounted() {
    if (isJwtExpired(this.localStorage.accessToken)) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${this.localStorage.refreshToken}`;
      instance.post('/auth/refresh')
        .then((response) => {
          this.localStorage.accessToken = response.data.access_token;
          this.localStorage.refreshToken = response.data.refresh_token;
          this.getUserInfo(this.localStorage.accessToken)
          this.getUserOrders(this.localStorage.accessToken)
        })
        .catch(() => {
          this.localStorage.accessToken = '';
          this.localStorage.refreshToken = '';
          this.$router.push('/');
        })
    } else {
      this.getUserInfo(this.localStorage.accessToken)
      this.getUserOrders(this.localStorage.accessToken)
    }
  },

  computed: {
    isTokenExpired() {
      return isJwtExpired(this.localStorage.accessToken);
    },

    disabledButton() {
      return this.v$.$invalid;
    },

    activeOrders() {
      return this.orders.filter(item => item.status !== 'finished');
    },
  },

  methods: {
    getUserInfo(accessToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      instance.get('/user/avatar').then((response) => {
        const avatarID = response.data.avatar_id;
        this.imageAddress = avatarID ? `http://192.168.221.142:8055/assets/${avatarID}` : 'http://192.168.221.142:8055/assets/7dc88415-8cae-4a20-91db-f75f4912afe6';
      }).catch((error) => console.log(error))

      instance.get('/user').then((response) => {
        this.user = {
          ...response.data,
          user_profile: R.head(response.data.user_profile),
        }
        this.user.user_profile.user_building = this.user.user_profile.user_building || { id: null };
      }).catch(console.log)
    },

    handleSubmit(isFormValid) {
      if (!isFormValid) {
        return;
      }

      if (isJwtExpired(this.localStorage.accessToken)) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${this.localStorage.refreshToken}`;
        instance.post('/auth/refresh')
          .then((response) => {
            this.localStorage.accessToken = response.data.access_token;
            this.localStorage.refreshToken = response.data.refresh_token;
            this.saveUserInfo(this.localStorage.accessToken);
          })
          .catch(() => {
            this.localStorage.accessToken = '';
            this.localStorage.refreshToken = '';
            this.$router.push('/');
          })
      } else {
        this.saveUserInfo(this.localStorage.accessToken)
      }
    },

    saveUserInfo(accessToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      instance.put('/user', {
        full_name: this.user.user_profile.full_name,
        sex: this.user.user_profile.sex,
        birthday: this.user.user_profile.birthday,
        user_building: this.user.user_profile.user_building.id,
      }).then(() => {
        this.getUserInfo(accessToken);
      }).catch((error) => console.log(error))
    },

    myUploader(event) {
      const formData = new FormData();
      formData.append("avatar", event.files[0]);
      instance.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(() => this.displayModal = false).catch(console.log);
    },

    getUserOrders(accessToken) {
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      instance.get('/order').then((response) => {
        this.orders = response.data.data;
      }).catch((error) => console.log(error))
    },

    formatDate(value) {
      const time = new Date(value);
      return time.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },
  },

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