import { test, expect } from "@playwright/test";
import { cardAfectados , cardAfectadosUfiEspeciales } from "../../helpers/cardAfectados"
import { cardEfectosSecuestrado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados , cardExtraviado } from "../../helpers/cardVinculado"
import { cardPersonalInterviniente } from "../../helpers/cardPersonalInterviniente"
import { especialesIntoxicacionLink , especialesIncendioLink , especialesSuicidioLink , especialesSiniestroLink , especialesEmergenciasLink , especialesParaderoLink } from "../../helpers/sidebar"
import { datosLegalesUFI } from "../../helpers/datosLegales"
import { initializeAuthorizedUser } from "../../helpers/initializeAuthorizedUser"
import { pdfView , registrar } from "../../helpers/registrar"
import { actuacionInTable , detailsOfActuacionInTable } from "../../helpers/actuacionRegistrada"


test.describe("Creación de actuaciones tipo UFI Delitos Especiales", () => {
  test("Creación de Ufi Establecer Paradero ", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesParaderoLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)    
    await cardExtraviado(page)
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
    await pdfView(page)
  });
  test("Creación de Ufi Emergencias Médicas", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesEmergenciasLink(page)
    await cardAfectadosUfiEspeciales(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)       
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });

  test("Creación de Ufi Siniestro Vial", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesSiniestroLink(page)
    await cardAfectadosUfiEspeciales(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });

  test("Creación de Ufi Ahorcamiento o Suicidio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesSuicidioLink(page)
    await cardAfectadosUfiEspeciales(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page) 
    await cardPersonalInterviniente(page)    
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });

  test("Creación de Ufi Incendio en Vivienda", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesIncendioLink(page)
    await cardAfectadosUfiEspeciales(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page) 
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });

  test("Creación de Ufi Intoxicación", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await especialesIntoxicacionLink(page)
    await cardAfectadosUfiEspeciales(page)
    await cardFecha(page)
    await cardEfectosSecuestrado(page)
    await cardPersonalInterviniente(page)    
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
    await pdfView(page)
  });  

});