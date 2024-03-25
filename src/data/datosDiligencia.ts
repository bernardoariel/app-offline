import type { DatosLegales } from "@/interfaces/datosLegales.interface";

export const diligencias:DatosLegales[] = [
    {
        id:'sumario-denuncia',
        titulo:'Denuncia Penal',
        header: `--- En la provincia de San Juan, @dependencia, @departamento @fechaactuacion, el Funcionario de Policía que suscribe, Jefe de esta sede legal y Secretario de Actuaciones que refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora precitada, comparece ante esta Instrucción la persona mencionada precedentemente a fin de poner en conocimiento la supuesta Comisión de un hecho de carácter delictivo, que da lugar a la intervención de esta Autoridad Policial, acto seguido y luego de ser impuesto del contenido del Art. 245° del Código Penal (falsa denuncia), a continuación, se le pregunta por sus nombres apellidos y demás circunstancias personales manifestó llamarse: @afectados Con relación al hecho que viene a denunciar DECLARO: Que se presenta ante esta autoridad policial a fin de manifestar que`,
        footer:`Lo que solicita es que se tomen las medidas legales de rigor. No siendo para más la presente acta la que leída y ratificada en todo su contenido se firma al pie por ante mí que lo CERTIFICA. --------`
    },
    {
        id:'sumario-oficio',
        titulo: 'Acta de Inicio',
        header: `--- En la provincia de San Juan, @dependencia,@departamento @fechaactuacion, el Funcionario de Policía que suscribe, Jefe Titular de esta Dependencia, con intervención del Secretario de Actuaciones que Refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada, se hace presente @intervinientes , informando que`,
        footer: `En virtud de ello el suscripto DISPONE: Iniciar las actuaciones sumariales correspondientes. Agregar a continuación Declaración testimonial del funcionario policial y acta labrada en el lugar, en calidad de una foja útil. Designar como Secretario de actuaciones al Oficial que firma al pie, como prueba de su conformidad y aceptación al cargo conferido. Llevar adelante toda medida legal de interés, en los presentes actuados. CERTIFICO.-`
    }
]