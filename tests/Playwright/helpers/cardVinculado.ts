import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const firstName = faker.person.lastName("male");
const lastName = faker.person.lastName("male");
const adress = faker.location.streetAddress();
const text = faker.lorem.sentence();
const dni = faker.number.int(100000000);
const number = faker.number.int(1000);
const phoneNumber = faker.phone.number("54 9 555 ####");
const email = faker.internet.email();
const date = faker.date.past();
const birthDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const profession = faker.name.jobTitle();
const nickname = faker.internet.userName();

export const cardVinculados =  async (page:any) =>{
    await page.getByTestId('VinculadosPlusButton').click();
  await page.locator('#pv_id_24 div').click();
  await page.getByLabel('Acusado').click();
  await page.getByLabel('Seleccione tipo de doc.').click();
  await page.getByLabel('DNI').click();
  await page.getByPlaceholder('Ingrese N° de doc').click();
  await page.getByPlaceholder('Ingrese N° de doc').fill(dni);
  await page.locator('#pv_id_26 div').click();
  await page.getByLabel('Masculino').click();
  await page.getByPlaceholder('Ingrese apellido').click();
  await page.getByPlaceholder('Ingrese apellido').fill(lastName);
  await page.getByPlaceholder('Ingrese nombre').click();
  await page.getByPlaceholder('Ingrese nombre').fill('321321');
  await page.getByPlaceholder('Ingrese fecha').click();
  await page.getByLabel('Nacionalidad').getByText('Nacionalidad').click();
  await page.getByLabel('Argentina').click();
  await page.getByLabel('Estado Civil').click();
  await page.getByLabel('Casado/a').click();
  await page.getByPlaceholder('Ingrese Domicilio de').click();
  await page.getByPlaceholder('Ingrese Domicilio de').fill(adress);
  await page.getByPlaceholder('Ingrese teléfono').click();
  await page.getByPlaceholder('Ingrese teléfono').fill(phoneNumber);
  await page.getByPlaceholder('Ingrese Profesión').click();
  await page.getByPlaceholder('Ingrese Profesión').fill(profession);
  await page.locator('#pv_id_29 div').click();
  await page.getByText('Secundaria').click();
  await page.getByPlaceholder('Apodo').click();
  await page.getByPlaceholder('Apodo').fill(nickname);  
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
}