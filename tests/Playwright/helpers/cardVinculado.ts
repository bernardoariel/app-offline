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
const nickname = faker.internet.userName();

export const cardVinculados =  async (page:any) =>{
  await page.getByTestId('VinculadosPlusButton').click();
  await page.getByLabel('Seleccione tipo de denunciante').click();
  await page.getByLabel('Acusado').click();
  await page.getByLabel('Seleccione tipo de doc.').click();
  await page.getByLabel('DNI').click();
  await page.getByPlaceholder('Ingrese N° de doc').click();
  await page.getByPlaceholder('Ingrese N° de doc').fill(dni);
  await page.getByLabel('Seleccione sexo').click();
  await page.getByLabel('Masculino').click();
  await page.getByPlaceholder('Ingrese apellido').click();
  await page.getByPlaceholder('Ingrese apellido').fill(lastName);
  await page.getByPlaceholder('Ingrese nombre').click();
  await page.getByPlaceholder('Ingrese nombre').fill('321321');
  await page.getByPlaceholder('Ingrese fecha').click();
  await page.getByPlaceholder('Ingrese fecha').fill(birthDate);
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
  await page.getByLabel('Instrucción').click();
  await page.getByText('Secundaria').click();
  await page.getByPlaceholder('Apodo').click();
  await page.getByPlaceholder('Apodo').fill(nickname);  
  await page.getByLabel('Agregar').click();
  await page.getByRole('button', { name: '' }).click();
  await expect(page.getByTestId('vinculadosname')).toBeVisible();
  await expect(page.getByTestId('vinculadosname').getByText(lastName)).toBeVisible();  
  
}