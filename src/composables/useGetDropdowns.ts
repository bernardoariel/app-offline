import { ref } from "vue";
import { useFetch } from "./useFetch";
import {
    sitios,
    modusOperandi,
    causaCaratula,
    juzgadoInterviniente,
    articulosRelacionados,
    ayudanteFiscal,
    fiscalCargo,
    ufiNro,
    delitos,
    categorias,
    subcategorias,
    modelosCategorias,
    marcasCategorias,
} from "@/data/actuacionNew";
import { addNameProp } from "@/helpers/dropUtils";

const hardcodedData = {
    sitios,
    modusOperandi,
    causaCaratula,
    juzgadoInterviniente,
    articulosRelacionados,
    ayudanteFiscal,
    fiscalCargo,
    ufiNro,
    delitos,
    categorias,
    subcategorias,
    modelosCategorias,
    marcasCategorias,
};

const customMap: { [key: string]: keyof typeof hardcodedData } = {
    'tipo-sitio': 'sitios',
    'tipo-modus-operandi': 'modusOperandi',
    'Causa Caratula': 'causaCaratula',
    'Delito': 'delitos',
    'articulos': "articulosRelacionados",
    'juzgado': "juzgadoInterviniente",
    'tipoufi': "ufiNro",
    'ayudante': "ayudanteFiscal",
    'fiscal': "fiscalCargo",
    //efectos
    'categorias': "categorias",
    "sub-categorias": "subcategorias",
    'marcas': "marcasCategorias",
    'modelos': "modelosCategorias",
};

function getData(name: string, search?: string) {
    if (search) {
        const key = customMap[search];
        return hardcodedData[key];
    }
    const key = customMap[name];
    return hardcodedData[key];
}

const failure = ref<boolean>(false)
export async function useGetDropdowns(param: string, apiUrl: string, search?: string) {
    const dropdownData = ref<any>(null);
    const { data, fetchData } = useFetch<any>();

    const url = (() => {
        switch (param) {
            case "tipo-causa-caratula":
                return `${apiUrl}/parametros/${param}/?search={"TipoCaratula": [{"operator": "=", "value": "${search}"}]}`;
            case "personalfiscal":
                return `${apiUrl}/${param}?search={"Jerarquia": [{"operator": "=", "value": "${search}"}]}`;
            case "tipo-modus-operandi":
            case "categorias":
            case "modelos":
            case "sub-categorias":
                return `${apiUrl}/parametros/${param}`;
            case "tipo-sitio":
            case "articulos":
                return `${apiUrl}/${param}`;
            case "marcas":
                return `${apiUrl}/parametros/${param}/`;
            default:
                return `${apiUrl}/${param}/`;
        }
    })();
    if (failure.value) {
        dropdownData.value = getData(param, search)
    }else {
        try {
            await fetchData(url as string);
            if (data.value) {
                if (param === "tipoufi") {
                    dropdownData.value = addNameProp(data.value.data, "Numero");
                } else if (param === "personalfiscal") {
                    dropdownData.value = addNameProp(data.value.data, "Denominacion");
                } else {
                    dropdownData.value = data.value.data;
                }
            } else {
                failure.value = true
                dropdownData.value = getData(param, search);
            }
        } catch (error) {
            console.log("Error fetching data from API, using hardcoded data.", error);
            dropdownData.value = getData(param, search);
            failure.value = true
        }
    }

    return {
        dropdownData,
    };
}
