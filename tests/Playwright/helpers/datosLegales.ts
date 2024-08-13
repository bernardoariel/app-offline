import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const text = faker.lorem.sentence();

export const datosLegalesSumarioDenuncia =  async (page:any) =>{
  await page.getByRole('tab', { name: 'Datos Legales' }).click();  
  await page.getByLabel('2024').click();
  await page.getByRole('option', { name: '2024' }).click();
  await page.getByText('Seleccione Sitio').click();
  await page.getByLabel('Sitio de prueba').click();
  await page.getByLabel('Seleccione Modus Operandi').click();
  await page.getByLabel('hallazgo').click();
  await page.getByLabel('Seleccione Causa Caratula').click();
  await page.getByLabel('TENT. HURTO').click();
  await page.getByLabel('Seleccione Juzgado').click();
  await page.getByLabel('TERCER JUZGADO EN LO').click();
  await page.locator('textarea[name="relato"]').click();
  await page.locator('textarea[name="relato"]').fill(text);
  await page.getByLabel('Datos Legales').getByRole('textbox').fill('321321');
}