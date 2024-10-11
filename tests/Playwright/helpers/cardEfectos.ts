import { test, expect } from "@playwright/test";


export const cardEfectosDenunciado =  async (page:any) =>{
  await page.getByTestId('EfectosPlusButton').click();
  await page.getByLabel('Seleccione tipo de efecto').click();
  await page.getByLabel('Denunciado').click();
  await page.getByLabel('Seleccione Categoría').click();
  await page.getByLabel('Vehiculos').click();
  await page.getByLabel('Seleccione Sub-Categoría').click();
  await page.getByLabel('auto').click();
  await page.getByLabel('Seleccione Tipo', { exact: true }).click();
  await page.getByLabel('Sedan').click();
  await page.getByLabel('Seleccione Marca').click();
  await page.getByLabel('BMW').click();
  await page.getByLabel('Seleccione Modelo').click();
  await page.getByLabel('147').click();
  await page.locator('div').filter({ hasText: /^Año$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Año$/ }).getByRole('textbox').fill('2024');
  // await page.locator('div').filter({ hasText: /^Nroº Chasis$/ }).getByRole('textbox').click();
  // await page.locator('div').filter({ hasText: /^Nroº Chasis$/ }).getByRole('textbox').fill('3216532136531');
  // await page.locator('div').filter({ hasText: /^Nroº Motor$/ }).getByRole('textbox').click();
  // await page.locator('div').filter({ hasText: /^Nroº Motor$/ }).getByRole('textbox').fill('3216513213651');
  // await page.locator('div').filter({ hasText: /^Dominio$/ }).getByRole('textbox').click();
  // await page.locator('div').filter({ hasText: /^Dominio$/ }).getByRole('textbox').fill('sdf354');
  // await page.locator('div').filter({ hasText: /^Nroº Serie$/ }).getByRole('textbox').click();
  // await page.locator('div').filter({ hasText: /^Nroº Serie$/ }).getByRole('textbox').fill('2135132165131');
  // await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').click();
  // await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').fill('98798796546431');
  // await page.locator('div').filter({ hasText: /^Nroº Abonado$/ }).getByRole('textbox').click();
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
}

export const cardEfectosSecuestrado =  async (page:any) =>{
    await page.getByTestId('EfectosPlusButton').click();
    await page.getByLabel('Seleccione tipo de efecto').click();
    await page.getByLabel('Secuestrado').click();
    await page.getByLabel('Seleccione Categoría').click();
    await page.getByLabel('Electrónica').click();
    await page.getByLabel('Seleccione Sub-Categoría').click();
    await page.getByLabel('Celulares y Teléfono').click();
    await page.getByLabel('Seleccione Tipo', { exact: true }).click();
    await page.getByLabel('Todo terreno').click();
    await page.getByLabel('Seleccione Marca').click();
    await page.getByLabel('Huawei').click();
    await page.getByLabel('Seleccione Modelo').click();
    await page.getByLabel('K71').click();
    await page.locator('div').filter({ hasText: /^Año$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Año$/ }).getByRole('textbox').fill('2023');
    await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').fill('13213541321635121');
    await page.getByLabel('Agregar').click();
    await page.getByRole('button', { name: '' }).click();
}


export const cardEfectosRecuperado =  async (page:any) =>{
    await page.getByTestId('EfectosPlusButton').click();
    await page.getByLabel('Seleccione tipo de efecto').click();
    await page.getByLabel('Recuperado').click();
    await page.getByLabel('Seleccione Categoría').click();
    await page.getByLabel('Electrónica').click();
    await page.getByLabel('Seleccione Sub-Categoría').click();
    await page.getByLabel('Electrodomesticos').click();
    await page.getByLabel('Seleccione Tipo', { exact: true }).click();
    await page.getByLabel('Microonda').click();
    await page.getByLabel('Seleccione Marca').click();
    await page.getByLabel('Rockrider').click();
    await page.getByLabel('Seleccione Modelo').click();
    await page.getByLabel('Blazer').click();
    await page.locator('div').filter({ hasText: /^Dominio$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Dominio$/ }).getByRole('textbox').fill('335132131');
    await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^Nroº IMEI$/ }).getByRole('textbox').fill('654654654');
    await page.getByLabel('Agregar').click();
    await page.getByRole('button', { name: '' }).click();
}