import { test, expect } from '@playwright/test';

const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0 en JavaScript
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};

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


export const detailsOfActuacionInTable = async (page: any , typeActuacion:string) => {
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
  
    const { afectados , vinculados , fechaUbicacion , efectos ,  personalInterviniente } = indexDBData[0]
    const afectadosParsed = JSON.parse(afectados);
    const vinculadosParsed = JSON.parse(vinculados);
    const fechaUbicacionParsed = JSON.parse(fechaUbicacion);
    const efectosParsed = JSON.parse(efectos);
    const personalIntervinienteParsed = JSON.parse(personalInterviniente);

    const tableRow = await page.locator('[data-pc-section="rowexpansion"] .p-datatable-wrapper tbody tr').first();

    const nameAfectado = await tableRow.locator('td').nth(0).innerText()
    console.log("Texto obtenido (Nombre del afectado):", nameAfectado);

    expect(nameAfectado).not.toBeNull();
    expect(nameAfectado.trim()).toBe(afectadosParsed[0].nombre);
    
    const lastnameAfectado = await tableRow.locator('td').nth(1).innerText();
    expect(lastnameAfectado).toBe(afectadosParsed[0].apellido);
    
    const dniAfectado = await tableRow.locator('td').nth(2).innerText();
    expect(dniAfectado).toBe(afectadosParsed[0].nroDocumento);
    
    const phoneAfectado = await tableRow.locator('td').nth(3).innerText();
    expect(phoneAfectado).toBe(afectadosParsed[0].telefono);
    
    const tipoAfectado = await tableRow.locator('td').nth(4).innerText();
    expect(tipoAfectado).toBe(afectadosParsed[0].typeAfectado);
  
    // Lo mismo para los vinculados y otros elementos en tu tabla...
    await page.locator('div').filter({ hasText: /^Vinculados$/ }).locator('div').nth(2).click();
    const nameVinculado = await tableRow.locator('td').nth(0).textContent();
    expect(nameVinculado).toBe(vinculadosParsed[0].nombre);
  
    const lastnameVinculado = await tableRow.locator('td').nth(1).innerText();
    expect(lastnameVinculado).toBe(vinculadosParsed[0].apellido);
  
    const dniVinculado = await tableRow.locator('td').nth(2).innerText();
    expect(dniVinculado).toBe(vinculadosParsed[0].nroDocumento);
  
    const phoneVinculado = await tableRow.locator('td').nth(3).innerText();
    expect(phoneVinculado).toBe(vinculadosParsed[0].telefono);

    const apodoVinculado = await tableRow.locator('td').nth(4).innerText();
    expect(apodoVinculado).toBe(vinculadosParsed[0].apodo);
  
    const tipoVinculado = await tableRow.locator('td').nth(5).innerText();
    expect(tipoVinculado).toBe(vinculadosParsed[0].typeAfectado);

    await page.locator('div').filter({ hasText: /^Fecha y Ubicación$/ }).locator('div').nth(2).click();

    const formattedDateFrom = formatDate(fechaUbicacionParsed[0].desdeFechaHora);
    const dateFrom = await tableRow.locator('td').nth(0).textContent();
    expect(dateFrom).toBe(formattedDateFrom);

    const formattedDateTo = formatDate(fechaUbicacionParsed[0].hastaFechaHora);
    const dateTo = await tableRow.locator('td').nth(1).innerText();
    expect(dateTo).toBe(formattedDateTo);

    const adress = await tableRow.locator('td').nth(2).innerText();
    expect(adress).toBe(fechaUbicacionParsed[0].calle);

    const adressNumber = await tableRow.locator('td').nth(3).innerText();
    expect(adressNumber).toBe(fechaUbicacionParsed[0].numero);

    const departament = await tableRow.locator('td').nth(4).innerText();
    expect(departament).toBe(fechaUbicacionParsed[0].departamento);

    await page.locator('div').filter({ hasText: /^Efectos$/ }).locator('div').nth(2).click();
    const categoria =await tableRow.locator('td').nth(0).textContent();
    expect(categoria).toBe(efectosParsed[0].categoria.name);

    const marca =await tableRow.locator('td').nth(1).textContent();
    expect(marca).toBe(efectosParsed[0].marca.name);

    const modelo =await tableRow.locator('td').nth(2).textContent();
    expect(modelo).toBe(efectosParsed[0].modelo.name);

    const subcategoria =await tableRow.locator('td').nth(3).textContent();
    expect(subcategoria).toBe(efectosParsed[0].subcategoria.name);

    const tipo =await tableRow.locator('td').nth(4).textContent();
    expect(tipo).toBe(efectosParsed[0].tipo.name);
    if(typeActuacion == "oficio"){
       await page.locator('div').filter({ hasText: /^Intervinientes$/ }).locator('div').nth(2).click(); 
       const lastname = await tableRow.locator('td').nth(0).innerText();
       expect(lastname).toBe(personalIntervinienteParsed[0].apellido);

       const name = await tableRow.locator('td').nth(1).innerText();
       expect(name).toBe(personalIntervinienteParsed[0].nombre);

       const jerarquia = await tableRow.locator('td').nth(2).innerText();
       expect(jerarquia).toBe(personalIntervinienteParsed[0].jerarquia);

       const dependencia = await tableRow.locator('td').nth(3).innerText();
       expect(dependencia).toBe(personalIntervinienteParsed[0].dependencia);

    }

    


    // Continúa comparando los demás elementos de la tabla con los datos de IndexedDB...
  };
  

