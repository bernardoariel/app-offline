import { ref } from "vue";
import { mapToDropDownEfectos, mapToDropdownItems } from './dropUtils';
import { departamentosDropdown } from "@/data/municipios";
import { dependencias } from "@/data/dependencia";
import { useGetDropdowns } from "@/composables/useGetDropdowns";
import { categorias, subcategorias, tipoCategorias, marcasCategorias, modelosCategorias, ayudanteFiscal, delitos, sexo, documentos, afectados, nacionalidad, estadoCivil, instruccion, jerarquia } from '@/data/actuacionNew'

const getItems = async (dropdownName:string) => {
    const { dropdownData: data } =  await useGetDropdowns(dropdownName)
    return data.value
}

export const afectadosDropdown = ref(mapToDropdownItems(afectados));
export const documentosDropdown = ref(mapToDropdownItems(documentos));
export const sexoDropdown = ref(mapToDropdownItems(sexo));
export const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
export const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
export const instruccionDropdown = ref(mapToDropdownItems(instruccion));
export const municipiosDropdown = ref(mapToDropdownItems(departamentosDropdown));
export const jerarquiaDropdown = ref(mapToDropdownItems(jerarquia))
export const dependenciaDropdown = ref(mapToDropdownItems(dependencias))
export const categoriasDropdown = ref(mapToDropDownEfectos(categorias, "categorias"))
export const subcategoriasDropdown = ref(mapToDropDownEfectos(subcategorias, "sub-categorias"))
export const tipoCategoriasDropdown = ref(mapToDropDownEfectos(tipoCategorias, "tipo-categorias"))
export const marcasCategoriasDropdown = ref(mapToDropDownEfectos(marcasCategorias, "marcas"))
export const modelosCategoriasDropdown = ref(mapToDropDownEfectos(modelosCategorias, "modelo"))
export const sitiosDropdwown = ref(mapToDropDownEfectos(await getItems('tipo-sitio')))
export const modusOperandiDropdwown = ref(mapToDropDownEfectos(await getItems('tipo-modus-operandi')))
export const causaCaratulaDropdwown = ref(mapToDropDownEfectos(await getItems('tipo-causa-caratula')))
export const articulosDropdwown = ref(mapToDropDownEfectos(await getItems('articulos')))
export const juzgadoIntervinienteDropdwown = ref(mapToDropDownEfectos(await getItems('juzgado')))

export const delitosDropdown = ref(mapToDropDownEfectos(delitos))
export const ufiNroDropdown = ref(mapToDropDownEfectos(await getItems('tipo-ufi')))
export const ayudanteFiscalDropdown = ref(mapToDropDownEfectos(ayudanteFiscal))
export const fiscalCargoDropdown = ref(mapToDropDownEfectos(await getItems('personalfiscal')))