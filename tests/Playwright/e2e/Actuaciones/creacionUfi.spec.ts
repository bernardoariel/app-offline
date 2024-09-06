import { test, expect } from "@playwright/test";
import { cardAfectados } from "../../helpers/cardAfectados"
import { cardEfectosDenunciado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados } from "../../helpers/cardVinculado"
import { cardPersonalInterviniente } from "../../helpers/cardPersonalInterviniente"
import { cavigLink , aniviLink , informaticoDenunciaLink , informaticoOficioLink , propiedadOficioLink , propiedadDenunciaLink , genericoOficioLink , genericoDenunciaLink , flagranciaLink } from "../../helpers/sidebar"
import { datosLegalesUFI } from "../../helpers/datosLegales"
import { initializeAuthorizedUser } from "../../helpers/initializeAuthorizedUser"
import { pdfView , registrar } from "../../helpers/registrar"
import { actuacionInTable , detailsOfActuacionInTable } from "../../helpers/actuacionRegistrada"


test.describe("Creación de actuaciones tipo UFI", () => {
  test("Creación de Ufi Flagrancia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await flagranciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });
  test("Creación de Ufi Genérica por Denuncia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await genericoDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
  });

  test("Creación de Ufi Genérica por Oficio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await genericoOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Ufi Contra la Propiedad por Denuncia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await propiedadDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
  });

  test("Creación de Ufi Contra la Propiedad por Oficio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await propiedadOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Ufi Informáticos y Estafas por Denuncia", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await informaticoDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "denuncia")
  });

  test("Creación de Ufi Informáticos y Estafas por Oficio", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await informaticoOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Ufi Cavig", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await cavigLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

  test("Creación de Ufi Anivi", async ({ page }) => {
    await initializeAuthorizedUser(page)
    await aniviLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await cardPersonalInterviniente(page)
    await datosLegalesUFI(page)
    // await pdfView(page)
    await registrar(page)
    await actuacionInTable(page)
    await detailsOfActuacionInTable(page , "oficio")
  });

});