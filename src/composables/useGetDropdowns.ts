import { ref } from "vue";
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
    tipoCategorias,
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
    tipoCategorias
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
    'tipo-categorias': 'tipoCategorias'
};

function getData(name: string, search?: string) {
    if (search) {
        const key = customMap[search];
        return hardcodedData[key];
    }
    const key = customMap[name];
    return hardcodedData[key];
}

async function getDynamicCacheName(prefix: string): Promise<string | null> {
    const cacheNames = await caches.keys(); // Obtiene todos los nombres de cache
    const dynamicCacheName = cacheNames.find((name) => name.startsWith(prefix));

    if (!dynamicCacheName) {
        console.error(`No cache found with prefix "${prefix}"`);
        return null;
    }

    return dynamicCacheName;
}

async function getFromCache(url: string, cachePrefix: string) {
    const cacheName = await getDynamicCacheName(cachePrefix);
    if (!cacheName) {
        throw new Error(`No cache found with prefix: ${cachePrefix}`);
    }
    const cache = await caches.open(cacheName)
    const response = await cache.match(url)
    if (!response) {
        throw new Error('No data in cache for this URL');
    }
    const data = await response.json()
    return data
}

export async function useGetDropdowns(param: string, cacheInfo: string | null, search?: string) {
    const dropdownData = ref<any>(null);
    const apiUrl = ref<string | null>(null)

    if (cacheInfo) {
        const data = JSON.parse(cacheInfo);
        apiUrl.value = data.api;
    } else {
        dropdownData.value = getData(param, search);
        return { dropdownData };
    }

    const url = (() => {
        switch (param) {
            case "tipo-causa-caratula":
                return `${apiUrl.value}/parametros/${param}/?search={"TipoCaratula": [{"operator": "=", "value": "${search}"}]}`;
            case "personalfiscal":
                return `${apiUrl.value}/${param}?search={"Jerarquia": [{"operator": "=", "value": "${search}"}]}`;
            case "tipo-modus-operandi":
            case "categorias":
            case "modelos":
            case "sub-categorias":
                return `${apiUrl.value}/parametros/${param}`;
            case "tipo-sitio":
            case "articulos":
                return `${apiUrl.value}/${param}`;
            case "marcas":
                return `${apiUrl.value}/parametros/${param}/`;
            case "tipo-categorias":
                return `${apiUrl.value}/parametros/tipo-depositos`
            default:
                return `${apiUrl.value}/${param}/`;
        }
    })();
    try {
        const cachedData = await getFromCache(url as string, 'dynamic');
        if (cachedData) {
            if (param === "tipoufi") {
                dropdownData.value = addNameProp(cachedData.data, "Numero");
            } else if (param === "personalfiscal") {
                dropdownData.value = addNameProp(cachedData.data, "Denominacion");
            } else {
                dropdownData.value = cachedData.data;
            }
        } else {
            dropdownData.value = getData(param, search);
        }
    } catch (error) {
        console.log("Error fetching data from API, using hardcoded data.", error);
        dropdownData.value = getData(param, search);
    }

    return {
        dropdownData,
    };
}