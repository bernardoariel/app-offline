import { ref } from "vue"
import { useFetch } from "./useFetch"
import { sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos } from '@/data/actuacionNew'

const hardcodedData = { sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos }

const apiUrl = import.meta.env.VITE_API_SW

const customMap: { [key: string]: keyof typeof hardcodedData } = {
    'tipo-sitio': 'sitios',
    'tipo-modus-operandi': 'modusOperandi',
    'tipo-causa-caratula': 'causaCaratula',
    'articulos': 'articulosRelacionados',
    'juzgado': 'juzgadoInterviniente',
    'tipo-ufi': 'ufiNro',
    'personalfiscal': 'ayudanteFiscal',
    'fiscal-cargo': 'fiscalCargo',
    'delitos': 'delitos',
};

function getData(name: string) {
    const key = customMap[name];
    return hardcodedData[key];
}

export async function useGetDropdowns (param: string) {
    const dropdownData = ref<any>(null);
    const { data, fetchData } = useFetch<any>();
    const url = `${apiUrl}/${param}`
    try{
        await fetchData(url as string)
        dropdownData.value = data.value || getData(param)
    }catch(error){
        console.log("Error fetching data from API, using hardcoded data.", error);
        dropdownData.value = hardcodedData;
    } 
    
    return{
        dropdownData
    }
}
