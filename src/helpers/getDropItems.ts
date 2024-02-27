import { afectados, documentos, sexo, nacionalidad, estadoCivil, instruccion, jerarquia, categorias, tipoCategorias, marcasCategorias, modelosCategorias } from "@/data/actuacionNew";
import { ref } from "vue";
import { mapToDropDownEfectos, mapToDropdownItems } from "./dropUtils";
import { departamentosDropdown } from "@/data/municipios";
import { dependencias } from "@/data/dependencia";
import { subcategorias } from '../data/actuacionNew';


export const afectadosDropdown = ref(mapToDropdownItems(afectados));
export const documentosDropdown = ref(mapToDropdownItems(documentos));
export const sexoDropdown = ref(mapToDropdownItems(sexo));
export const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
export const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
export const instruccionDropdown = ref(mapToDropdownItems(instruccion));
export const municipiosDropdown = ref(mapToDropdownItems(departamentosDropdown));
export const jerarquiaDropdown = ref(mapToDropdownItems(jerarquia))
export const dependenciaDropdown = ref(mapToDropdownItems(dependencias))
export const categoriasDropdown = ref(mapToDropDownEfectos(categorias))
export const subcategoriasDropdown = ref(mapToDropDownEfectos(subcategorias))
export const tipoCategoriasDropdown = ref(mapToDropDownEfectos(tipoCategorias))
export const marcasCategoriasDropdown = ref(mapToDropDownEfectos(marcasCategorias))
export const modelosCategoriasDropdown = ref(mapToDropDownEfectos(modelosCategorias))
