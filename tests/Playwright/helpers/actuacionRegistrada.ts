import { test, expect } from '@playwright/test';

export const actuacionInTable = async (page:any) =>{
//  // Navega a la página que usa IndexedDB
//  await page.goto('https://tu-sitio.com');

 // Usa evaluate para ejecutar código en el contexto de la página
 const data = await page.evaluate(async () => {
   return new Promise((resolve, reject) => {
     // Abre la base de datos
     const request = indexedDB.open('Siis');

     request.onerror = (event) => {
       reject('Error al abrir la base de datos');
     };

     request.onsuccess = (event) => {
       const db = request.result;
       const transaction = db.transaction(['actuaciones'], 'readonly');
       const objectStore = transaction.objectStore('actuaciones');

       // Obtén todos los datos de la store
       const getAllRequest = objectStore.getAll();

       getAllRequest.onsuccess = () => {
         resolve(getAllRequest.result); // Devuelve los datos
       };

       getAllRequest.onerror = () => {
         reject('Error al obtener los datos');
       };
     };
   });
 });

 console.log(data); // Aquí tendrás acceso a los datos obtenidos de IndexedDB
 const { fechaCreacion, nroLegajoCompleto, nombreActuacion, juzgadoInterviniente } = data[0]
 console.log(fechaCreacion); // Muestra la fecha de creación
 console.log(nroLegajoCompleto); // Muestra el número de legajo completo
 console.log(nombreActuacion); // Muestra el nombre de la actuación
 console.log(juzgadoInterviniente); // Muestra el juzgado interviniente
 // Opcional: Realiza pruebas de validación sobre los datos
 expect(data).toBeTruthy(); // Ejemplo de verificación simple
// Convertir la fecha de creación a un formato más legible, si es necesario
 const formattedFechaCreacion = new Date(fechaCreacion).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // Obtener el texto de las celdas y comparar con las constantes
  const juzgadoIntervinienteText = await page.getByRole('cell', { name: juzgadoInterviniente }).innerText();
  expect(juzgadoIntervinienteText).toBe(juzgadoInterviniente);
  
  const actuacion = await page.getByRole('cell', { name: nombreActuacion }).innerText(); // Si hay un valor constante, úsalo
  expect(actuacion).toBe(nombreActuacion); // Reemplaza con la constante correspondiente si existe
  
  const nroLegajoText = await page.getByRole('cell', { name: nroLegajoCompleto }).innerText();
  expect(nroLegajoText).toBe(nroLegajoCompleto);
  
  const fechaCreacionText = await page.getByRole('cell', { name: formattedFechaCreacion }).innerText();
  expect(fechaCreacionText).toBe(formattedFechaCreacion);
};


export const detailsOfActuacionInTable = async (page: any) => {
    await page.getByLabel('Row Collapsed').click();
  
    // Obtener datos de IndexedDB
    const indexDBData = await page.evaluate(async () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('Siis');
  
        request.onerror = (event) => {
          reject('Error al abrir la base de datos');
        };
  
        request.onsuccess = (event) => {
          const db = request.result;
          const transaction = db.transaction(['actuaciones'], 'readonly');
          const objectStore = transaction.objectStore('actuaciones');
  
          // Obtener todos los datos
          const getAllRequest = objectStore.getAll();
  
          getAllRequest.onsuccess = () => {
            resolve(getAllRequest.result);
          };
  
          getAllRequest.onerror = () => {
            reject('Error al obtener los datos');
          };
        };
      });
    });
  
    const { afectados , vinculados , fechaUbicacion , juzgadoInterviniente } = indexDBData[0]
    // Ahora comparamos los datos de IndexedDB con los valores de la tabla
    // const afectados = indexDBData.afectados; // Reemplaza con la estructura de tu base de datos
    // const vinculados = indexDBData.vinculados; // Reemplaza con la estructura de tu base de datos
    // const fecha = indexDBData.fechaUbicacion; // Reemplaza con la estructura de tu base de datos
  
    // Comparar con los elementos visibles en la tabla
    const nameAfectado = await page.locator('#pv_id_95_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(1)').innerText();
    expect(nameAfectado).toBe(afectados[0].nombre);
  
    const lastnameAfectado = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(2)').innerText();
    expect(lastnameAfectado).toBe(afectados[0].apellido);
  
    const dniAfectado = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(3)').innerText();
    expect(dniAfectado).toBe(afectados[0].nroDocumento);
  
    const phoneAfectado = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(4)').innerText();
    expect(phoneAfectado).toBe(afectados[0].telefono);
  
    const tipoAfectado = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(5)').innerText();
    expect(tipoAfectado).toBe(afectados[0].typeAfectado);
  
    // Lo mismo para los vinculados y otros elementos en tu tabla...
    await page.locator('div').filter({ hasText: /^Vinculados$/ }).locator('div').nth(2).click();
    const nameVinculado = await await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(1)').innerText();
    expect(nameVinculado).toBe(vinculados[0].nombre);
  
    const lastnameVinculado = await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(2)').innerText();
    expect(lastnameVinculado).toBe(vinculados[0].apellido);
  
    const dniVinculado = await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(2)').innerText();
    expect(dniVinculado).toBe(vinculados[0].nroDocumento);
  
    const phoneVinculado = await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(4)').innerText();
    expect(phoneVinculado).toBe(vinculados[0].telefono);

    const apodoVinculado = await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(5)').innerText();
    expect(apodoVinculado).toBe(vinculados[0].apodo);
  
    const tipoVinculado = await page.locator('#pv_id_2_1_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr:nth-child(1) > td:nth-child(6)').innerText();
    expect(tipoVinculado).toBe(vinculados[0].typeAfectado);

    await page.locator('div').filter({ hasText: /^Fecha y Ubicación$/ }).locator('div').nth(2).click();
    const dateFrom = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(1)').innerText();
    expect(dateFrom).toBe(fechaUbicacion[0].desdeFechaHora);

    const dateTo = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(2)').innerText();
    expect(dateFrom).toBe(fechaUbicacion[0].hastaFechaHora);

    const adress = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(3)').innerText();
    expect(adress).toBe(fechaUbicacion[0].calle);

    const adressNumber = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(4)').innerText();
    expect(adressNumber).toBe(fechaUbicacion[0].numero);

    const departament = await page.locator('#pv_id_2_0_expansion > td > div > div:nth-child(2) > div.p-datatable.p-component.p-datatable-responsive-scroll > div.p-datatable-wrapper > table > tbody > tr > td:nth-child(5)').innerText();
    expect(departament).toBe(fechaUbicacion[0].departamento);

    await page.locator('div').filter({ hasText: /^Efectos$/ }).locator('div').nth(2).click();


    await page.locator('div').filter({ hasText: /^Intervinientes$/ }).locator('div').nth(2).click();


    // Continúa comparando los demás elementos de la tabla con los datos de IndexedDB...
  };
  

