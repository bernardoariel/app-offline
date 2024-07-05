import { ref } from "vue"


let nroLegajo = ref<number|null>()
let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)
let itemsCausaCaratula = ref<any[]>([])
let nombreActuacion = ref<string>('Sumario por denuncia')

const useDatosLegales = () => {
    
    const fakeValues = {
        nroLegajo: 101,
        selectedYear: {name: 2024},
        selectedSitio:{name: 'Museo'},
        selectedModusOperandi:{name:' Delito Rural'},
        itemsCausaCaratula:[{name:'Siniestro Vial'}, {name: 'Robo simple en grado de tentativa'}],
        selectedJuzgadoInterviniente:{name:'Unidad Fiscal de Prueba'}
    }
    const addDataFake = () => {
        nroLegajo.value = fakeValues.nroLegajo;
        selectedYear.value = fakeValues.selectedYear;
        selectedSitio.value = fakeValues.selectedSitio;
        selectedModusOperandi.value = fakeValues.selectedModusOperandi;
        itemsCausaCaratula.value = fakeValues.itemsCausaCaratula;
        selectedJuzgadoInterviniente.value = fakeValues.selectedJuzgadoInterviniente;
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
        nombreActuacion
    }
};

export default useDatosLegales;
  

