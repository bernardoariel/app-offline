import { ref } from "vue"
import type { DatosLegalesForm } from "@/interfaces/datosLegalesForm.interface"
import type { DropDownInterface } from "@/interfaces/dropdown.interface"
import { generateRandomNumber } from '../helpers/generateRandomNumber';


let nroLegajo = ref<string | null>()
let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedDelito = ref<DropDownInterface>()
let selectedUfiNro = ref<DropDownInterface>()
let selectedAyudanteFiscal = ref<DropDownInterface>()
let selectedFiscalCargo = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)
let selectedArticulosRelacionadosList = ref(null)
let selectedArticulosRelacionados = ref<DropDownInterface>()
let itemsCausaCaratula = ref<any[]>([])
let itemsArticulosRelacionados = ref<any[]>([])
let nombreActuacion = ref<string>('Sumario por denuncia')

const useDatosLegales = () => {

    const initialValuesDatosLegales: DatosLegalesForm = {
        nroLegajo: '',
        selectYear: { name: '' },
        selectSitio: { name: '' },
        selectUfiNro: { name: '' },
        selectArticuloRelacionado: { name: '' },
        selectModusOperandi: { name: '' },
        selectCausaCaratula: { name: '' },
        selectAyudanteFiscal: { name: '' },
        selectFiscalCargo: { name: '' },
        selectDelito: { name: '' },
        opcionesCausaCaratula: [''],
        opcionesArticulosRelacionados: [''],
        selectJuzgadoInterviniente: { name: '' },
    };

    const fakeValues = {
        nroLegajo: generateRandomNumber().toString(),
        selectedYear: { name: '2024' },
        selectedSitio: { name: 'Museo' },
        selectedModusOperandi: { name: 'Delito Rural' },
        selectedAyudanteFiscal: { name: 'Dr Ghilardi Oscar Andres' },
        selectedFiscalCargo: { name: 'Dr. Shoar Aballay' },
        selectedUfiNro: { name: '1' },
        selectedDelito: { name: 'ACT.POR FALLECIMIENTO' },
        itemsCausaCaratula: [{ name: 'Siniestro Vial' }, { name: 'Robo simple en grado de tentativa' }],
        itemsArticulosRelacionados: [{ name: '183\u00ba ' }, { name: 'Actuaciones por Denuncia' }],
        selectedJuzgadoInterviniente: { name: 'TERCER JUZGADO EN LO CORRECCIONAL' },
        selectedArticulosRelacionados: { name: '178\u00b0 Portacion de arma blanca o contundente. ' }
    }

    const addDataFake = () => {
        nroLegajo.value = fakeValues.nroLegajo;
        selectedYear.value = fakeValues.selectedYear;
        selectedSitio.value = fakeValues.selectedSitio;
        selectedDelito.value = fakeValues.selectedDelito;
        selectedUfiNro.value = fakeValues.selectedUfiNro;
        selectedAyudanteFiscal.value = fakeValues.selectedAyudanteFiscal;
        selectedFiscalCargo.value = fakeValues.selectedFiscalCargo;
        selectedModusOperandi.value = fakeValues.selectedModusOperandi;
        itemsCausaCaratula.value = fakeValues.itemsCausaCaratula;
        itemsArticulosRelacionados.value = fakeValues.itemsArticulosRelacionados;
        selectedJuzgadoInterviniente.value = fakeValues.selectedJuzgadoInterviniente;
        selectedArticulosRelacionados.value = fakeValues.selectedArticulosRelacionados
    };

    const resetData = () => {
        const currentYear = new Date().getFullYear();
        nroLegajo.value = null;
        selectedYear.value = { name: currentYear.toString() };
        selectedSitio.value = null
        selectedDelito.value = null
        selectedModusOperandi.value = null
        selectedCausaCaratula.value = null
        selectedJuzgadoInterviniente.value = null
        selectedCausaCaratulaList.value = null;
        selectedAyudanteFiscal.value = null
        selectedFiscalCargo.value = null;
        selectedUfiNro.value = null;
        selectedArticulosRelacionados.value = null;
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
        selectedDelito.value = datosLegales.selectDelito ? { name: datosLegales.selectDelito } : null;
        selectedUfiNro.value = datosLegales.selectUfiNro ? { name: datosLegales.selectUfiNro } : null;
        selectedAyudanteFiscal.value = datosLegales.selectAyudanteFiscal ? { name: datosLegales.selectAyudanteFiscal } : null;
        selectedFiscalCargo.value = datosLegales.selectFiscalCargo ? { name: datosLegales.selectFiscalCargo } : null;
        selectedModusOperandi.value = datosLegales.selectModusOperandi ? { name: datosLegales.selectModusOperandi } : null;
        selectedCausaCaratula.value = datosLegales.selectCausaCaratula ? { name: datosLegales.selectCausaCaratula } : null;
        selectedJuzgadoInterviniente.value = datosLegales.selectJuzgadoInterviniente ? { name: datosLegales.selectJuzgadoInterviniente } : null;
        itemsCausaCaratula.value = datosLegales.opcionesCausaCaratula ? datosLegales.opcionesCausaCaratula.map(name => ({ name })) : [];
        itemsArticulosRelacionados.value = datosLegales.opcionesArticulosRelacionados ? datosLegales.opcionesArticulosRelacionados.map(name => ({ name })) : [];
        nombreActuacion.value = datosLegales.nombreActuacion || 'Sumario por denuncia';
        selectedArticulosRelacionados.value = datosLegales.selectedArticulosRelacionados ? { name: datosLegales.selectedArticulosRelacionados } : null;
    };
    return {
        selectedYear,
        selectedSitio,
        selectedModusOperandi,
        selectedCausaCaratula,
        selectedJuzgadoInterviniente,
        selectedCausaCaratulaList,
        selectedArticulosRelacionadosList,
        selectedArticulosRelacionados,
        selectedDelito,
        selectedUfiNro,
        selectedAyudanteFiscal,
        selectedFiscalCargo,
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
