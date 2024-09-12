import { faker } from "@faker-js/faker";
const firstName = faker.person.lastName("male");
const lastName = faker.person.lastName("male");

export const cardPersonalInterviniente =  async (page:any) =>{
    await page.getByTestId('Personal IntervinientePlusButton').click();
    await page.getByPlaceholder('Ingrese apellido').click();
    await page.getByPlaceholder('Ingrese apellido').fill(lastName);
    await page.getByPlaceholder('Ingrese nombre').click();
    await page.getByPlaceholder('Ingrese nombre').fill(firstName);
    await page.getByLabel('Seleccione la Jerarquia').click();
    await page.getByLabel('Sargento', { exact: true }).click();
    await page.getByLabel('Seleccione la Dependencia').click();
    await page.getByText('Unidad Op. de Prevencion').click();
    await page.getByLabel('Agregar').click();
    await page.getByRole('button', { name: '' }).click(); 
}