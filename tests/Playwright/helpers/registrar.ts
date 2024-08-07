import { test, expect } from "@playwright/test";

export const pdfView =  async (page:any) =>{
    await page.locator('div').filter({ hasText: /^Ver Pdf$/ }).click();
}

export const registrar = async (page:any) =>{
    await page.getByLabel('Registrar').click();
}