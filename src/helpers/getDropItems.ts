import { afectados, documentos, sexo, nacionalidad, estadoCivil, instruccion } from "@/data/actuacionNew";
import { ref } from "vue";
import { mapToDropdownItems } from "./dropUtils";
import { departamentosDropdown } from "@/data/municipios";

export const afectadosDropdown = ref(mapToDropdownItems(afectados));
export const documentosDropdown = ref(mapToDropdownItems(documentos));
export const sexoDropdown = ref(mapToDropdownItems(sexo));
export const nacionalidadDropdown = ref(mapToDropdownItems(nacionalidad));
export const estadoCivilDropdown = ref(mapToDropdownItems(estadoCivil));
export const instruccionDropdown = ref(mapToDropdownItems(instruccion));
export const municipiosDropdown = ref(mapToDropdownItems(departamentosDropdown));