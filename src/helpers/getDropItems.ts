import { ref } from "vue";
import { mapToDropDownEfectos, mapToDropdownItems } from './dropUtils';
import { departamentosDropdown } from "@/data/municipios";
import { dependencias } from "@/data/dependencia";
import { useGetDropdowns } from "@/composables/useGetDropdowns";

const { dataActuacionNew: data } = await useGetDropdowns()

export const afectadosDropdown = ref(mapToDropdownItems(data.value.afectados));
export const documentosDropdown = ref(mapToDropdownItems(data.value.documentos));
export const sexoDropdown = ref(mapToDropdownItems(data.value.sexo));
export const nacionalidadDropdown = ref(mapToDropdownItems(data.value.nacionalidad));
export const estadoCivilDropdown = ref(mapToDropdownItems(data.value.estadoCivil));
export const instruccionDropdown = ref(mapToDropdownItems(data.value.instruccion));
export const municipiosDropdown = ref(mapToDropdownItems(departamentosDropdown));
export const jerarquiaDropdown = ref(mapToDropdownItems(data.value.jerarquia))
export const dependenciaDropdown = ref(mapToDropdownItems(dependencias))
export const categoriasDropdown = ref(mapToDropDownEfectos(data.value.categorias, "categorias"))
export const subcategoriasDropdown = ref(mapToDropDownEfectos(data.value.subcategorias, "sub-categorias"))
export const tipoCategoriasDropdown = ref(mapToDropDownEfectos(data.value.tipoCategorias, "tipo-categorias"))
export const marcasCategoriasDropdown = ref(mapToDropDownEfectos(data.value.marcasCategorias, "marcas"))
export const modelosCategoriasDropdown = ref(mapToDropDownEfectos(data.value.modelosCategorias, "modelo"))

export const sitiosDropdwown = ref(mapToDropDownEfectos(data.value.sitios))
export const modusOperandiDropdwown = ref(mapToDropDownEfectos(data.value.modusOperandi))
export const causaCaratulaDropdwown = ref(mapToDropDownEfectos(data.value.causaCaratula))
export const articulosDropdwown = ref(mapToDropDownEfectos(data.value.articulosRelacionados))
export const juzgadoIntervinienteDropdwown = ref(mapToDropDownEfectos(data.value.juzgadoInterviniente))

export const delitosDropdown = ref(mapToDropDownEfectos(data.value.delitos))
export const ufiNroDropdown = ref(mapToDropDownEfectos(data.value.ufiNro))
export const ayudanteFiscalDropdown = ref(mapToDropDownEfectos(data.value.ayudanteFiscal))
export const fiscalCargoDropdown = ref(mapToDropDownEfectos(data.value.fiscalCargo))