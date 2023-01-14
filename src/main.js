import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reactiveStorage from 'vue-reactive-storage';
import PrimeVue from 'primevue/config';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';


import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(reactiveStorage, {
  'accessToken': '',
  'refreshToken': '',
});

app.component('Menubar', Menubar);
app.component('Button', Button);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Avatar', Avatar);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);


app.mount('#app');
