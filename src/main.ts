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
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Panel from 'primevue/panel';
import Sidebar from 'primevue/sidebar';
import Divider from 'primevue/divider';
import Ripple from 'primevue/ripple';
import App from './App.vue'
import router from './router'
import Avatar from 'primevue/avatar';
import StyleClass from 'primevue/styleclass';
import ToastService from 'primevue/toastservice';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Toast from 'primevue/toast';


import 'primeflex/primeflex.css';
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css';
const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue)
app.use(router)
app.use(ToastService);

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
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Panel', Panel);
app.component('Sidebar', Sidebar);
app.component('Divider', Divider);
app.component('Avatar', Avatar);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Toast', Toast);

app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
/* const db = new Dexie('my_database');
db.version(1).stores({
    afectados: '++id, typeAfectado, typeDocumento, nroDocumento, typeSexo, apellido, name, fecha, nacionalidad, estadoCivil, domicilioResidencia, telefono, email, profesion, instruccion'
});
 */
app.mount('#app')


