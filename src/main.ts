import "./assets/main.css";
import "./config/yup";
import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Card from "primevue/card";
import DataView from "primevue/dataview";
import Tag from "primevue/tag";
import Menu from "primevue/menu";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Listbox from "primevue/listbox";
import Toolbar from "primevue/toolbar";
import Calendar from "primevue/calendar";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Panel from "primevue/panel";
import Sidebar from "primevue/sidebar";
import Divider from "primevue/divider";
import Ripple from "primevue/ripple";
import App from "./App.vue";
import router from "./router";
import Avatar from "primevue/avatar";
import StyleClass from "primevue/styleclass";
import ToastService from "primevue/toastservice";
import InputSwitch from "primevue/inputswitch";
import ProgressSpinner from "primevue/progressspinner";
import RadioButton from "primevue/radiobutton";
import ToggleButton from "primevue/togglebutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import ColumnGroup from "primevue/columngroup"; // optional
import Row from "primevue/row"; // optional
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";
import Skeleton from "primevue/skeleton";
import Tooltip from "primevue/tooltip";
import Carousel from "primevue/carousel";

import "primeflex/primeflex.css";
import ConfirmationService from "primevue/confirmationservice";

import "primeicons/primeicons.css";
import useTheme from "./composables/useTheme";
import { useStorageData } from "./composables/useStorageData";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);

app.use(router);

app.component("Button", Button);
app.component("Card", Card);
app.component("DataView", DataView);
app.component("Tag", Tag);
app.component("Menu", Menu);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Listbox", Listbox);
app.component("Toolbar", Toolbar);
app.component("Dialog", Dialog);

app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("Panel", Panel);
app.component("Sidebar", Sidebar);
app.component("Divider", Divider);
app.component("Avatar", Avatar);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Toast", Toast);
app.component("InputSwitch", InputSwitch);
app.component("ProgressSpinner", ProgressSpinner);
app.component("RadioButton", RadioButton);
app.component("ToggleButton", ToggleButton);
app.component("Calendar", Calendar);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Skeleton", Skeleton);
app.component("Carousel", Carousel);
app.directive("ripple", Ripple);
app.directive("styleclass", StyleClass);
app.directive("tooltip", Tooltip);

app.use(ConfirmationService);
/* const db = new Dexie('my_database');
db.version(1).stores({
    afectados: '++id, typeAfectado, typeDocumento, nroDocumento, typeSexo, apellido, name, fecha, nacionalidad, estadoCivil, domicilioResidencia, telefono, email, profesion, instruccion'
});
//  */
const { currentTheme } = useTheme();
const { obtenerDatos } = useStorageData();
obtenerDatos();
app.mount("#app");
