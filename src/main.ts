import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Button from "primevue/button"
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import Tag from 'primevue/tag';
import Menu from 'primevue/menu';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Listbox from 'primevue/listbox';
import Toolbar from 'primevue/toolbar';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';

import App from './App.vue'
import router from './router'

import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css';
const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)


app.component('Button', Button);
app.component('Card', Card);
app.component('DataView', DataView);
app.component('Tag', Tag);
app.component('Menu', Menu);
app.component('Dropdown', Dropdown);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('Listbox', Listbox);
app.component('Toolbar', Toolbar);
app.component('Calendar', Calendar);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);

/* const db = new Dexie('my_database');
db.version(1).stores({
    afectados: '++id, typeAfectado, typeDocumento, nroDocumento, typeSexo, apellido, name, fecha, nacionalidad, estadoCivil, domicilioResidencia, telefono, email, profesion, instruccion'
});
 */
app.mount('#app')
/* console.log('Nombre de la base de datos:', db.name);
console.log('Versión de la base de datos:', db.verno); */