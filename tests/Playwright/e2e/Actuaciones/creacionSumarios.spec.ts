import { test, expect } from "@playwright/test";
import { cardAfectados } from "../../helpers/cardAfectados"
import { cardEfectosDenunciado } from "../../helpers/cardEfectos"
import { cardFecha } from "../../helpers/cardFecha"
import { cardVinculados } from "../../helpers/cardVinculado"
import { sumarioOficioLink , sumarioDenunciaLink } from "../../helpers/sidebar"
import { datosLegalesSumarioDenuncia } from "../../helpers/datosLegales"
import { pdfView , registrar } from "../../helpers/registrar"


test.describe("Creación de actuaciones tipo sumario", () => {
  test("Creación de Sumario Oficio", async ({ page }) => {
    await page.goto("/");
    await sumarioOficioLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesSumarioDenuncia(page)
  });
  test("Creación de Sumario Denuncia", async ({ page }) => {
    await page.goto("/");
    await sumarioDenunciaLink(page)
    await cardAfectados(page)
    await cardFecha(page)
    await cardEfectosDenunciado(page)    
    await cardVinculados(page)
    await datosLegalesSumarioDenuncia(page)
    // await pdfView(page)
    await registrar(page)
  });

});