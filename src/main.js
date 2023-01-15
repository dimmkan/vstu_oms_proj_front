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
import Dialog from 'primevue/dialog';
import FileUpload from 'primevue/fileupload';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Calendar from 'primevue/calendar';


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
app.component('Dialog', Dialog);
app.component('FileUpload', FileUpload);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('Calendar', Calendar);



app.mount('#app');
