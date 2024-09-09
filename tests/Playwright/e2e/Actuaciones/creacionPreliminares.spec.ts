import { test, expect } from "@playwright/test";
import { cardAfectados , cardAfectadosUfiEspeciales , cardAfectadosSiniestroVial} from "../../helpers/cardAfectados"
import { cardEfectosSecuestrado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados , cardExtraviado } from "../../helpers/cardVinculado"
import { cardPersonalInterviniente } from "../../helpers/cardPersonalInterviniente"
import { preliminaresOtrosLink , preliminaresTentativaLink , preliminaresIncendioAutomotorLink , preliminaresSiniestroLink , preliminaresFugaLink , preliminaresProcedenciaLink , preliminaresIncendioLink , preliminaresCaidaLink} from "../../helpers/sidebar"
import { datosLegalesPreliminares } from "../../helpers/datosLegales"
import { initializeAuthorizedUser } from "../../helpers/initializeAuthorizedUser"
import { pdfView , registrar } from "../../helpers/registrar"
import { actuacionInTable , detailsOfActuacionInTable } from "../../helpers/actuacionRegistrada"


test.describe("Creación de actuaciones tipo Preliminares", () => {
  test("Creación de Preliminar Incendio en Vivienda", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresIncendioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)    
    await cardVinculados(page)
    await datosLegalesPreliminares(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
  });
  test("Creación de Preliminar Establecer Procedencia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresProcedenciaLink(page)
    await cardAfectados(page)
    await cardVinculados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)       
    await cardPersonalInterviniente(page)
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Preliminar Fuga de Menor", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresFugaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Preliminar Siniestro Vial", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresSiniestroLink(page)
    await cardAfectadosSiniestroVial(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page) 
    await cardPersonalInterviniente(page)    
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Preliminar Caida Casual", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresCaidaLink(page)
    await cardAfectadosSiniestroVial(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page) 
    await cardPersonalInterviniente(page)
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Preliminar Incendio Automotor", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresIncendioAutomotorLink(page)
    await cardAfectadosSiniestroVial(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)
    await cardPersonalInterviniente(page)    
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });  

  test("Creación de Preliminar Tentativa de Suicidio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresTentativaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)
    await cardPersonalInterviniente(page)    
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  }); 

  test("Creación de Preliminar Otros", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await preliminaresOtrosLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)
    await cardPersonalInterviniente(page)    
    await datosLegalesPreliminares(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  }); 

});