import { ref } from "vue"
import { useFetch } from "./useFetch"
import { sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos } from '@/data/actuacionNew'

const hardcodedData = { sitios, modusOperandi, causaCaratula, juzgadoInterviniente, articulosRelacionados, ayudanteFiscal, fiscalCargo, ufiNro, delitos }

const apiUrl = import.meta.env.VITE_API_SW

const customMap: { [key: string]: keyof typeof hardcodedData } = {
    'tipo-sitio': 'sitios',
    'tipo-modus-operandi': 'modusOperandi',

    'Causa Caratula': 'causaCaratula',
    'Delito': 'delitos',
    
    'articulos': 'articulosRelacionados',
    'juzgado': 'juzgadoInterviniente',
    'tipo-ufi': 'ufiNro',
    
    'ayudante': 'ayudanteFiscal',
    'fiscal': 'fiscalCargo',
};

function getData(name: string, search?:string) {
    if(search){
        const key = customMap[search];
        return hardcodedData[key];
    }
    const key = customMap[name];
    return hardcodedData[key];

}

export async function useGetDropdowns (param: string, search?: string) {
    const dropdownData = ref<any>(null);
    const { data, fetchData } = useFetch<any>();

    const url = (() => {
        switch (param) {
            case 'tipo-causa-caratula':
                return `${apiUrl}/parametros/${param}/?search={"TipoCaratula": [{"operator": "=", "value": "${search}"}]}`
            case 'personalfiscal':
                return `${apiUrl}/${param}/?search={"Jerarquia": [{"operator": "=", "value": "${search}"}]}`
            case 'tipo-modus-operandi':
                return `${apiUrl}/parametros/${param}`
            default:
                return `${apiUrl}/${param}`;
        }
    })()


    try{
        await fetchData(url as string)
        dropdownData.value = data.value || getData(param, search)
    }catch(error){
        console.log("Error fetching data from API, using hardcoded data.", error);
        dropdownData.value = hardcodedData;
    } 
    
    return{
        dropdownData
    }
}
