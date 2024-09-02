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


export const detailsActuacionInTable = async (page:any) =>{
    
}

