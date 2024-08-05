import { test, expect } from "@playwright/test";
import { cardAfectados } from "./../../helpers/cardAfectados"
import { cardEfectosDenunciado } from "./../../helpers/cardEfectos"
import { cardFecha } from "./../../helpers/cardFecha"
import { cardVinculados } from "./../../helpers/cardVinculado"
import { sumarioOficioLink } from "./../../helpers/sidebar"


test("Creación de Sumario Oficio", async ({ page }) => {
  await page.goto("/");
  await sumarioOficioLink(page)
  await cardAfectados(page)
  await cardEfectosDenunciado(page)
  await cardFecha(page)
  await cardVinculados(page)
 
});