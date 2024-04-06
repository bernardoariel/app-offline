import { ref } from "vue"


let nroLegajo = ref<number|null>()
let selectedYear = ref<DropDownInterface>()
let selectedSitio = ref<DropDownInterface>()
let selectedModusOperandi = ref<DropDownInterface>()
let selectedCausaCaratula = ref<DropDownInterface>()
let selectedJuzgadoInterviniente = ref<DropDownInterface>()
let selectedCausaCaratulaList = ref(null)

const useDatosLegales = () => {
    
   
    return {
        selectedYear,
        selectedSitio,
        selectedModusOperandi,
        selectedCausaCaratula,
        selectedJuzgadoInterviniente,
        selectedCausaCaratulaList,
        nroLegajo
    };
};

export default useDatosLegales;
  

