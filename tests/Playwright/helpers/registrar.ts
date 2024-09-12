import { test, expect } from "@playwright/test";

export const pdfView =  async (page:any) =>{
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: '' }).click();
    const page1 = await page1Promise;
    // Extraer el contenido del blob en la nueva pestaña
    const pdfContent = await page1.evaluate(() => {
    return fetch(document.location.href)
        .then(response => response.blob())
        .then(blob => blob.text());
});

// Puedes imprimir parte del contenido del PDF para ver si se cargó correctamente
// console.log("Contenido del blob PDF:", pdfContent);

// Realizar alguna validación (por ejemplo, verificar que no está vacío)
expect(pdfContent.length).toBeGreaterThan(0);

}

export const registrar = async (page:any) =>{
    await page.getByLabel('Registrar').click();
}