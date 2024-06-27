import { ref } from "vue";

interface DropDownInterface {
    name: string;
}

let nroLegajo = ref<number | null>(null);
let selectedYear = ref<DropDownInterface | null>(null);
let selectedSitio = ref<DropDownInterface | null>(null);
let selectedModusOperandi = ref<DropDownInterface | null>(null);
let selectedCausaCaratula = ref<DropDownInterface | null>(null);
let selectedJuzgadoInterviniente = ref<DropDownInterface | null>(null);
let selectedCausaCaratulaList = ref(null);
let itemsCausaCaratula = ref<any[]>([]);
let nombreActuacion = ref<string>('Sumario por denuncia');

const useDatosLegales = () => {

    const fakeValues = {
        nroLegajo: 101,
        selectedYear: { name: 2024 },
        selectedSitio: { name: 'Museo' },
        selectedModusOperandi: { name: 'Delito Rural' },
        itemsCausaCaratula: [{ name: 'Siniestro Vial' }, { name: 'Robo simple en grado de tentativa' }],
        selectedJuzgadoInterviniente: { name: 'Unidad Fiscal de Prueba' }
    };

    const setData = (realData?: any) => {
        const data = realData || fakeValues;
        nroLegajo.value = data.nroLegajo;
        selectedYear.value = data.selectedYear;
        selectedSitio.value = data.selectedSitio;
        selectedModusOperandi.value = data.selectedModusOperandi;
        itemsCausaCaratula.value = data.itemsCausaCaratula;
        selectedJuzgadoInterviniente.value = data.selectedJuzgadoInterviniente;
    };

    return {
        selectedYear,
        selectedSitio,
        selectedModusOperandi,
        selectedCausaCaratula,
        selectedJuzgadoInterviniente,
        selectedCausaCaratulaList,
        nroLegajo,
        itemsCausaCaratula,
        setData,
        nombreActuacion
    };
};

export default useDatosLegales;
