import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const text = faker.lorem.sentence();
const number = faker.number.int(1000).toString();

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
  await page.getByLabel('Datos Legales').getByRole('textbox').fill(number);
}

export const datosLegalesExpedientes =  async (page:any) =>{
  await page.getByRole('tab', { name: 'Datos Legales' }).click();  
  await page.getByLabel('2024').click();
  await page.getByRole('option', { name: '2024' }).click();
  await page.getByText('Seleccione Sitio').click();
  await page.getByLabel('Sitio de prueba').click();
  await page.getByLabel('Seleccione Articulos Relacionados').click();
  await page.getByLabel('195° Merodeo').click();
  await page.getByLabel('Seleccione Juzgado Interviniente').click(); 
  await page.getByLabel('TERCER JUZGADO EN LO CORRECCIONAL').click();  
  await page.locator('textarea[name="relato"]').click();
  await page.locator('textarea[name="relato"]').fill(text);
  await page.getByLabel('Datos Legales').getByRole('textbox').fill(number);
}

export const datosLegalesUFI =  async (page:any) =>{
  await page.getByRole('tab', { name: 'Datos Legales' }).click();  
  await page.getByLabel('2024').click();
  await page.getByRole('option', { name: '2024' }).click();
  await page.getByText('Seleccione Sitio').click();
  await page.getByLabel('Sitio de prueba').click();
  await page.getByLabel('Seleccione Modus Operandi').click();
  await page.getByLabel('hallazgo ').click();
  await page.getByLabel('Seleccione Delito').click(); 
  await page.getByLabel('Usurpación de autoridad').click();
  await page.getByLabel('Seleccione Ufi Nro').click();  
  await page.getByLabel('En Turno').click();
  await page.getByLabel('Seleccione Ayudante Fiscal').click();
  await page.getByLabel('Dr. Miguel Gay ').click();
  await page.getByLabel('Seleccione Fiscal Cargo').click();
  await page.getByLabel('Dr. Shoar Aballay').click();  
  await page.waitForTimeout(1000);
  await page.locator('textarea[name="relato"]').click();
  await page.locator('textarea[name="relato"]').fill(text);
  await page.getByLabel('Datos Legales').getByRole('textbox').fill(number);
  await page.getByLabel('Seleccione Ayudante Fiscal').click();
  await page.getByLabel('Dr. Miguel Gay ').click();
}