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

export const cardAfectados =  async (page:any) =>{
  await page.getByTestId('AfectadosPlusButton').click();
  await page.locator('#pv_id_10 div').click();
  await page.getByLabel('Denunciante', { exact: true }).click();
  await page.getByText('Seleccione tipo de doc.').click();
  await page.getByLabel('DNI').click();
  await page.getByPlaceholder('Ingrese N° de doc').click();
  await page.getByPlaceholder('Ingrese N° de doc').fill(dni);
  await page.locator('#pv_id_12 svg').click();
  await page.getByLabel('Masculino').click();
  await page.getByPlaceholder('Ingrese apellido').click();
  await page.getByPlaceholder('Ingrese apellido').fill(lastName);
  await page.getByPlaceholder('Ingrese nombre').click();
  await page.getByPlaceholder('Ingrese nombre').fill(firstName);
  await page.getByPlaceholder('Ingrese fecha').click(birthDate);
  await page.locator('#pv_id_13 div').click();
  await page.getByLabel('Argentina').click();
  await page.locator('#pv_id_14 div').click();
  await page.getByLabel('Casado/a').click();
  await page.getByPlaceholder('Ingrese Domicilio de').click();
  await page.getByPlaceholder('Ingrese Domicilio de').fill(adress);
  await page.getByPlaceholder('Ingrese teléfono').click();
  await page.getByPlaceholder('Ingrese teléfono').fill(phoneNumber);
  await page.getByPlaceholder('Ingrese email').click();
  await page.getByPlaceholder('Ingrese email').fill(email);
  await page.getByPlaceholder('Ingrese Profesión').click();
  await page.getByPlaceholder('Ingrese Profesión').fill(profession);
  await page.locator('#pv_id_15 svg').click();
  await page.getByText('Secundaria').click();
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
}