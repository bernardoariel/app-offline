import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const adress = faker.location.streetAddress();


export const cardFecha =  async (page:any) =>{
    await page.getByTestId('Fecha, Hora y UbicacionPlusButton').click();
  await page.getByPlaceholder('ingrese una calle').click();
  await page.getByPlaceholder('ingrese una calle').fill(adress);
  await page.getByPlaceholder('ingrese un número').click();
  await page.getByPlaceholder('ingrese un número').fill('32132132');
  await page.getByLabel('Seleccione departamento').click();
  await page.getByLabel('Albardón').click();
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
}