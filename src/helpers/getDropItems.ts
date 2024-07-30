import { afectados, documentos, sexo, nacionalidad, estadoCivil, instruccion, jerarquia, categorias, tipoCategorias, marcasCategorias, modelosCategorias } from "@/data/actuacionNew";
import { ref } from "vue";
import { mapToDropDownEfectos, mapToDropdownItems } from './dropUtils';
import { departamentosDropdown } from "@/data/municipios";
import { dependencias } from "@/data/dependencia";
import { subcategorias, sitios, modusOperandi, causaCaratula, articulos, juzgadoInterviniente,delitos,ufiNro, ayudanteFiscal, fiscalCargo} from '../data/actuacionNew';


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

export const sitiosDropdwown = ref(mapToDropDownEfectos(sitios))
export const modusOperandiDropdwown = ref(mapToDropDownEfectos(modusOperandi))
export const causaCaratulaDropdwown = ref(mapToDropDownEfectos(causaCaratula))
export const articulosDropdwown = ref(mapToDropDownEfectos(articulos))
export const juzgadoIntervinienteDropdwown = ref(mapToDropDownEfectos(juzgadoInterviniente))

export const delitosDropdown = ref(mapToDropDownEfectos(delitos))
export const ufiNroDropdown = ref(mapToDropDownEfectos(ufiNro))
export const ayudanteFiscalDropdown = ref(mapToDropDownEfectos(ayudanteFiscal))
export const fiscalCargoDropdown = ref(mapToDropDownEfectos(fiscalCargo))