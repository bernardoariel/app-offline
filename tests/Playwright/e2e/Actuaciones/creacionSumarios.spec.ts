import { test, expect } from "@playwright/test";
import { cardAfectados } from "../../helpers/cardAfectados"
import { cardEfectosDenunciado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados } from "../../helpers/cardVinculado"
import { cardPersonalInterviniente } from "../../helpers/cardPersonalInterviniente"
import { sumarioOficioLink , sumarioDenunciaLink } from "../../helpers/sidebar"
import { datosLegalesSumarioDenuncia } from "../../helpers/datosLegales"
import { initializeAuthorizedUser } from "../../helpers/initializeAuthorizedUser"
import { actuacionInTable , detailsOfActuacionInTable} from "../../helpers/actuacionRegistrada"
import { pdfView , registrar } from "../../helpers/registrar"


test.describe("Creación de actuaciones tipo sumario", () => {
  test("Creación de Sumario Oficio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await sumarioOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesSumarioDenuncia(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });
  test("Creación de Sumario Denuncia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await sumarioDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesSumarioDenuncia(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
    await pdfView(page)
  });

});