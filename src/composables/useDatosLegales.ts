import { ref } from "vue"
import type { DatosLegalesForm } from "@/interfaces/datosLegalesForm.interface"
import type { DropDownInterface } from "@/interfaces/dropdown.interface"


let nroLegajo = ref<string | null>()
let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)
let selectedArticulosRelacionadosList = ref(null)
let selectedArticulo = ref<DropDownInterface>()
let itemsCausaCaratula = ref<any[]>([])
let itemsArticulosRelacionados = ref<any[]>([])
let nombreActuacion = ref<string>('Sumario por denuncia')

const useDatosLegales = () => {

    const initialValuesDatosLegales: DatosLegalesForm = {
        nroLegajo: '',
        selectYear: { name: '' },
        selectSitio: { name: '' },
        selectArticulo: { name: '' },
        selectModusOperandi: { name: '' },
        selectCausaCaratula: { name: '' },
        opcionesCausaCaratula: [''],
        opcionesArticulosRelacionados: [''],
        selectJuzgadoInterviniente: { name: '' },
    };

    const fakeValues = {
        nroLegajo: '101',
        selectedYear: { name: '2024' },
        selectedSitio: { name: 'Museo' },
        selectedModusOperandi: { name: ' Delito Rural' },
        itemsCausaCaratula: [{ name: 'Siniestro Vial' }, { name: 'Robo simple en grado de tentativa' }],
        itemsArticulosRelacionados: [{ name: '183\u00ba ' }, { name: 'Actuaciones por Denuncia' }],
        selectedJuzgadoInterviniente: { name: 'Unidad Fiscal de Prueba' },
        selectArticulo:{ name: '178\u00b0 Portacion de arma blanca o contundente. ' }
    }

    const addDataFake = () => {
        nroLegajo.value = fakeValues.nroLegajo;
        selectedYear.value = fakeValues.selectedYear;
        selectedSitio.value = fakeValues.selectedSitio;
        selectedModusOperandi.value = fakeValues.selectedModusOperandi;
        itemsCausaCaratula.value = fakeValues.itemsCausaCaratula;
        itemsArticulosRelacionados.value = fakeValues.itemsArticulosRelacionados;
        selectedJuzgadoInterviniente.value = fakeValues.selectedJuzgadoInterviniente;
        selectedArticulo.value = fakeValues.selectArticulo
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
        selectedArticulo.value = null;
        selectedArticulosRelacionadosList.value = null;
        itemsCausaCaratula.value = [];
        itemsArticulosRelacionados.value = [];
        nombreActuacion.value = 'Sumario por denuncia';
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
        itemsArticulosRelacionados.value = datosLegales.opcionesArticulosRelacionados ? datosLegales.opcionesArticulosRelacionados.map(name => ({ name })) : [];
        nombreActuacion.value = datosLegales.nombreActuacion || 'Sumario por denuncia';
        selectedArticulo.value = datosLegales.selectArticulo ? { name: datosLegales.selectArticulo } : null;
    };
    return {
        selectedYear,
        selectedSitio,
        selectedModusOperandi,
        selectedCausaCaratula,
        selectedJuzgadoInterviniente,
        selectedCausaCaratulaList,
        selectedArticulosRelacionadosList,
        selectedArticulo,
        nroLegajo,
        itemsCausaCaratula,
        itemsArticulosRelacionados,
        addDataFake,
        nombreActuacion,
        resetData,
        setData,
        initialValuesDatosLegales
    }
};

export default useDatosLegales;
