import { ref } from "vue"
import { useFetch } from "./useFetch"
import { categorias, subcategorias, tipoCategorias, marcasCategorias, modelosCategorias, sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos, sexo, documentos, afectados, nacionalidad, estadoCivil, instruccion, jerarquia, tipoEfecto } from '@/data/actuacionNew'

const hardcodedData = { categorias, subcategorias, tipoCategorias, marcasCategorias, modelosCategorias, sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos, sexo, documentos, afectados, nacionalidad, estadoCivil, instruccion, jerarquia, tipoEfecto }

const apiUrl = import.meta.env.VITE_API_SW

export async function useGetDropdowns () {
    const dataActuacionNew = ref<any>(null);
    const { data, fetchData } = useFetch<any>();
    
    try{
        await fetchData(apiUrl as string)
        dataActuacionNew.value = data.value || hardcodedData
    }catch(error){
        console.log("Error fetching data from API, using hardcoded data.", error);
        dataActuacionNew.value = hardcodedData;
    } 
    
    return{
        dataActuacionNew
    }
}
