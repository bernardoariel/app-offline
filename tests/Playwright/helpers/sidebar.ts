
export const actuacionesLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' ACTUACIONES' }).click();
}
export const sumarioDenunciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Sumario Denuncia' }).click();
}
export const sumarioOficioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Sumario Oficio' }).click();
}
export const expedienteDenunciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Expediente Denuncia' }).click();
}
export const expedienteOficioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Expediente Oficio' }).click();
}
export const flagranciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Flagrancia' }).click();
}
export const genericoDenunciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Genérica por Denuncia' }).click()
}
export const genericoOficioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Genérica por Oficio' }).click();
}
export const propiedadDenunciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Contra la Propiedad por Denuncia' }).click();
}
export const propiedadOficioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Contra la Propiedad por Oficio' }).click(); 
}
export const informaticoDenunciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Informáticos y Estafas por Denuncia' }).click();
}
export const informaticoOficioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Informáticos y Estafas por Oficio' }).click();
}
export const aniviLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Anivi' }).click();
}
export const cavigLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.getByRole('link', { name: ' Cavig' }).click();
}
export const especialesParaderoLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Establecer Paradero' }).click();
}
export const especialesEmergenciasLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Emergencias Medicas' }).click();
}
export const especialesSiniestroLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Siniestro Vial' }).click();
}
export const especialesSuicidioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Ahoracmiento o Suicidio' }).click();
}
export const especialesIncendioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Incendio en Vivienda' }).click();
}
export const especialesIntoxicacionLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^Especiales$/ }).click();
    await page.getByRole('link', { name: ' Intoxicación' }).click();
}

export const preliminaresIncendioLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Incendio en Vivienda' }).click();
}

export const preliminaresProcedenciaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Establecer procedencia' }).click();
}

export const preliminaresFugaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Fuga de Menor' }).click();
}

export const preliminaresSiniestroLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Siniestro Vial' }).click();
}

export const preliminaresIncendioAutomotorLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Incendio Automotor' }).click();
}

export const preliminaresTentativaLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Tentativa de Suicidio' }).click();
}

export const preliminaresOtrosLink = async (page:any) => {
    await page.getByRole('button', { name: '' }).click();
    await page.locator('div').filter({ hasText: /^PRELIMINARES$/ }).click();
    await page.getByRole('link', { name: ' Otros' }).click();
}