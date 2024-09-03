import { test, expect } from "@playwright/test";
import { cardAfectados } from "../../helpers/cardAfectados"
import { cardEfectosDenunciado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados } from "../../helpers/cardVinculado"
import { cardPersonalInterviniente } from "../../helpers/cardPersonalInterviniente"
import { expedienteOficioLink , expedienteDenunciaLink } from "../../helpers/sidebar"
import { datosLegalesExpedientes } from "../../helpers/datosLegales"
import { actuacionInTable , detailsOfActuacionInTable } from "../../helpers/actuacionRegistrada"
import { initializeAuthorizedUser } from "../../helpers/initializeAuthorizedUser"
import { pdfView , registrar } from "../../helpers/registrar"


test.describe("Creación de actuaciones tipo Expedientes", () => {
  test("Creación de Expediente Denuncia", async ({ page }) => {   
    await initializeAuthorizedUser(page)
    await expedienteDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesExpedientes(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page)
  });
  test("Creación de Expediente Oficio", async ({ page }) => {   
    await initializeAuthorizedUser(page)
    await expedienteOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesExpedientes(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
  });

});