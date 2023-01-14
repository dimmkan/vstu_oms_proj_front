import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import reactiveStorage from 'vue-reactive-storage';
import PrimeVue from 'primevue/config';

import Menubar from 'primevue/menubar';
import Button from 'primevue/button';


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

app.mount('#app');
