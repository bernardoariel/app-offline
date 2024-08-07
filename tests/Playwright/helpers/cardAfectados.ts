import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

const firstName = faker.person.lastName("male");
const lastName = faker.person.lastName("male");
const adress = faker.location.streetAddress();
const text = faker.lorem.sentence();
const dni = faker.number.int(10000000).toString();
const number = faker.number.int(1000);
const phone = faker.phone.number();
const phoneNumber = phone.replace(/\D/g, '');
const email = faker.internet.email();
const date = new Date(); // Supongamos que tienes un objeto Date
const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga dos dígitos
const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura que el mes tenga dos dígitos
const year = date.getFullYear();
const birthDate = `${day}${month}${year}`;
const profession = faker.name.jobTitle();

export const cardAfectados =  async (page:any) =>{
  await page.getByTestId('AfectadosPlusButton').click();
  await page.getByLabel('Seleccione tipo de denunciante').click();
  await page.getByLabel('Denunciante', { exact: true }).click();
  await page.getByText('Seleccione tipo de doc.').click();
  await page.getByLabel('DNI').click();
  await page.getByPlaceholder('Ingrese N° de doc').click();
  console.log(dni);
  await page.getByPlaceholder('Ingrese N° de doc').fill(dni);
  await page.getByLabel('Seleccione sexo').click();
  await page.getByLabel('Masculino').click();
  await page.getByPlaceholder('Ingrese apellido').click();
  await page.getByPlaceholder('Ingrese apellido').fill(lastName);
  await page.getByPlaceholder('Ingrese nombre').click();
  await page.getByPlaceholder('Ingrese nombre').fill(firstName);
  console.log(birthDate);
  await page.getByPlaceholder('Ingrese fecha').click();
  await page.getByPlaceholder('Ingrese fecha').fill(birthDate);
  await page.getByLabel('Nacionalidad').click();
  await page.getByLabel('Argentina').click();
  await page.getByLabel('Estado Civil').click();
  await page.getByLabel('Casado/a').click();
  await page.getByPlaceholder('Ingrese Domicilio de').click();
  await page.getByPlaceholder('Ingrese Domicilio de').fill(adress);
  await page.getByPlaceholder('Ingrese teléfono').click();
  await page.getByPlaceholder('Ingrese teléfono').fill(phoneNumber);
  await page.getByPlaceholder('Ingrese email').click();
  await page.getByPlaceholder('Ingrese email').fill(email);
  await page.getByPlaceholder('Ingrese Profesión').click();
  await page.getByPlaceholder('Ingrese Profesión').fill(profession);
  await page.getByLabel('Instrucción').click();
  await page.getByText('Secundaria').click();
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByTestId('afectadosname').getByText(lastName)).toBeVisible();  
  await expect(page.getByTestId('afectadosname').getByText(firstName)).toBeVisible();
  await expect(page.getByTestId('afectadosname').getByText(dni)).toBeVisible();

}