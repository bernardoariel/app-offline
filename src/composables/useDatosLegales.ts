import type { DatosLegalesForm } from "@/interfaces/datosLegalesForm.interface"
import { ref } from "vue"
import type { DropDownInterface } from "@/interfaces/dropdown.interface";


let nroLegajo = ref<string | null>()
let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)
let itemsCausaCaratula = ref<any[]>([])
let nombreActuacion = ref<string>('Sumario por denuncia')

const useDatosLegales = () => {

    const initialValuesDatosLegales: DatosLegalesForm = {
        nroLegajo: '',
        selectYear: { name: '' },
        selectSitio: { name: '' },
        selectModusOperandi: { name: '' },
        selectCausaCaratula: { name: '' },
        opcionesCausaCaratula: [''],
        selectJuzgadoInterviniente: { name: '' },
    };

    const fakeValues = {
        nroLegajo: '101',
        selectedYear: { name: '2024' },
        selectedSitio: { name: 'Museo' },
        selectedModusOperandi: { name: ' Delito Rural' },
        itemsCausaCaratula: [{ name: 'Siniestro Vial' }, { name: 'Robo simple en grado de tentativa' }],
        selectedJuzgadoInterviniente: { name: 'Unidad Fiscal de Prueba' }
    }

    const addDataFake = () => {
        nroLegajo.value = fakeValues.nroLegajo;
        selectedYear.value = fakeValues.selectedYear;
        selectedSitio.value = fakeValues.selectedSitio;
        selectedModusOperandi.value = fakeValues.selectedModusOperandi;
        itemsCausaCaratula.value = fakeValues.itemsCausaCaratula;
        selectedJuzgadoInterviniente.value = fakeValues.selectedJuzgadoInterviniente;
    };

    const resetData = () => {
        const currentYear = new Date().getFullYear();
        nroLegajo.value = null;
        selectedYear.value = { name: currentYear.toString() };
        selectedSitio.value = null
        selectedModusOperandi.value = null
        selectedCausaCaratula.value = null
        selectedJuzgadoInterviniente.value = null
        selectedCausaCaratulaList.value = null;
        itemsCausaCaratula.value = [];
        nombreActuacion.value = '';
    };

    const setData = (data: { datosLegales: string }) => {
        const datosLegales = JSON.parse(data.datosLegales);
        nroLegajo.value = datosLegales.nroLegajo || null;
        selectedYear.value = datosLegales.selectYear ? { name: datosLegales.selectYear } : null;
        selectedSitio.value = datosLegales.selectSitio ? { name: datosLegales.selectSitio } : null;
        selectedModusOperandi.value = datosLegales.selectModusOperandi ? { name: datosLegales.selectModusOperandi } : null;
        selectedCausaCaratula.value = datosLegales.selectCausaCaratula ? { name: datosLegales.selectCausaCaratula } : null;
        selectedJuzgadoInterviniente.value = datosLegales.selectJuzgadoInterviniente ? { name: datosLegales.selectJuzgadoInterviniente } : null;
        itemsCausaCaratula.value = datosLegales.opcionesCausaCaratula ? datosLegales.opcionesCausaCaratula.map(name => ({ name })) : [];
        nombreActuacion.value = datosLegales.nombreActuacion || 'Sumario por denuncia';
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
        addDataFake,
        nombreActuacion,
        resetData,
        setData,
        initialValuesDatosLegales
    }
};

export default useDatosLegales;


