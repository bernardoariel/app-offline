import type { DatosLegales } from "@/interfaces/datosLegales.interface";

export const diligencias:DatosLegales[] = [
    {
        id:'sumario-denuncia',
        titulo:'Denuncia penal',
        header: `--- En la provincia de San Juan, @dependencia, @departamento @fechaactuacion, el Funcionario de Policía que suscribe, Jefe de esta sede legal y Secretario de Actuaciones que refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora precitada, comparece ante esta Instrucción la persona mencionada precedentemente a fin de poner en conocimiento la supuesta Comisión de un hecho de carácter delictivo, que da lugar a la intervención de esta Autoridad Policial, acto seguido y luego de ser impuesto del contenido del Art. 245° del Código Penal (falsa denuncia), a continuación, se le pregunta por sus nombres apellidos y demás circunstancias personales manifestó llamarse: @afectados Con relación al hecho que viene a denunciar DECLARO: Que se presenta ante esta autoridad policial a fin de manifestar que`,
        footer:`Lo que solicita es que se tomen las medidas legales de rigor. No siendo para más la presente acta la que leída y ratificada en todo su contenido se firma al pie por ante mí que lo CERTIFICA. --------`
    },
    {
        id:'sumario-oficio',
        titulo: 'Acta de inicio',
        header: `--- En la provincia de San Juan, @dependencia,@departamento @fechaactuacion, el Funcionario de Policía que suscribe, Jefe Titular de esta Dependencia, con intervención del Secretario de Actuaciones que Refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada, se hace presente @intervinientes Informando que`,
        footer: `En virtud de ello el suscripto DISPONE: Iniciar las actuaciones sumariales correspondientes. Agregar a continuación Declaración testimonial del funcionario policial y acta labrada en el lugar, en calidad de una foja útil. Designar como Secretario de actuaciones al Oficial que firma al pie, como prueba de su conformidad y aceptación al cargo conferido. Llevar adelante toda medida legal de interés, en los presentes actuados. CERTIFICO.-`
    },
    {
        id:'expediente-denuncia',
        titulo: 'Denuncia contravencional',
        header: `--- En la provincia de San Juan, @dependencia,@departamento @fechaactuacion, el Funcionario de Policía que suscribe, con la intervención del Secretario de Actuaciones que refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora precitada, comparece ante esta Instrucción la persona mencionada precedentemente a fin de poner en conocimiento la supuesta Comisión de un hecho de carácter CONTRAVENCIONAL, que da lugar a la intervención de esta Autoridad Policial, acto seguido y luego de ser impuesto del contenido del Art. 245° del Código Penal, se le pregunta por sus nombres apellidos y demás circunstancias personales manifestó llamarse: @afectados . Que se presenta ante esta Autoridad policial a fin de manifestar que`,
        footer: `Lo que solicita es que se tomen las medidas legales de rigor. No siendo para más la presente acta la que leída y ratificada en todo su contenido se firma al pie por ante mí que lo CERTIFICA. --------`
    },
    {
        id:'expediente-oficio',
        titulo: 'Acta de inicio',
        header: `--- En la provincia de San Juan, @dependencia,@departamento @fechaactuacion, el funcionario de Policia que suscribe, a los fines legales HACE CONSTAR: Que siendo la fecha y hora antes indicada, se presenta el Personal Interviniente informando que siendo las @horaDelHecho horas, el funcionario de Policia que suscribe, a los fines legales HACE CONSTAR: Que siendo la fecha y hora antes indicada, se presenta el Personal Interviniente`,
        footer: `Al consultarle por los datos personales manifestando llamarse @vinculados , procediendo al traslado a esta dependencia, como así también del secuestro de @efectos DISPONE: Iniciar en base a la presente Acta las Actuaciones Contravencionales de rigor. Designar Secretario al Oficial que al pie firma en notificación del cargo conferido. Recibir a tenor el , el acta Contravencional labrada in situ, así también al contraventor antes mencionado. Dar inmediata intervención al Señor Juez del , Sr. Jefe de Policia (Dpto. Jud.D-5) mediante remisión de copias nota de Estilo. Llevar adelante toda otra medida que se estime de interés para la sustanciación del presente expediente. CERTIFICO.`
    },
    {
        id:'ufi-oficio',
        titulo: 'Acta de inicio legajo',
        header: `--- En la provincia de San Juan, @departamento , sede de @dependencia , @fechaactuacion, el funcionario de Policía que suscribe y Secretario de actuaciones que refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada precedentemente se toma conocimiento por parte del`,
        footer: `; en virtud de ello la instrucción DISPONE: Iniciar el Legajo de investigación que corresponda. Designar como secretario de las mismas al funcionario de Policía al pie firmante. Dar inmediata intervención a la U.F.I. N° @ufi mediante la remisión del Parte Preventivo. Recibir a @vinculados Designar al Medico Legista de la Policía, a fin que examine al aprehendido. Requerir a través de cualquier medio idóneo la Plantilla Prontuarial actualizada del aprehendido. Llevar a cabo toda otra medida de carácter legal que se estime de interés.CERTIFICO.-`
    },
    {
        id:'ufi-denuncia',
        titulo: 'Denuncia legajo',
        header: `--- En la provincia de San Juan, @departamento , sede de @dependencia , @fechaactuacion, el funcionario de Policía que suscribe y Secretario de actuaciones que refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada precedentemente se toma conocimiento por parte del`,
        footer: `; en virtud de ello la instrucción DISPONE: Iniciar el Legajo de investigación que corresponda. Designar como secretario de las mismas al funcionario de Policía al pie firmante. Dar inmediata intervención a la U.F.I. N° @ufi mediante la remisión del Parte Preventivo. Recibir a @vinculados Designar al Medico Legista de la Policía, a fin que examine al aprehendido. Requerir a través de cualquier medio idóneo la Plantilla Prontuarial actualizada del aprehendido. Llevar a cabo toda otra medida de carácter legal que se estime de interés.CERTIFICO.-`
    },
    {
        id:'ufi-paradero',
        titulo: 'Acta de inicio legajo',
        header: `--- En la provincia de San Juan, @departamento , sede de @dependencia , @fechaactuacion, el funcionario de Policía que suscribe, Jefe Titular de esta Dependencia, con intervención del Secretario de Actuaciones que Refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada, se hace presente el ciudadano: @afectados , a fin de dar cuenta que desde fecha , desconoce el paradero de: @vinculados .`,
        footer: `En virtud de ello se mantuvo comunicación con el fiscal en turno @fiscal, quien interiorizado de lo acontecido, el mismo al respecto dispuso que se inicie protocolo de búsqueda de personas, que se le dé aviso a la sección búsqueda y rescate de personas y a la red interna de la policía. En virtud de ello la Instrucción se DISPONE: Iniciar el Legajo de investigación que corresponda. Designar como secretario de las mismas al funcionario de Policía al pie firmante. Dar intervención a la U.F.I. Nº @ufi mediante la comunicación con el Ayudante Fiscal. Recibir, agregar y vincular a la causa, Acta de Procedimiento, a los fines legales correspondientes. Llevar a cabo toda otra medida de carácter legal que se estime de interés. CERTIFICO.-`
    },
    {
        id:'ufi-delitos-especiales',
        titulo: 'Acta de inicio legajo',
        header: `--- En la provincia de San Juan, @departamento , sede de @dependencia , @fechaactuacion, el funcionario de Policía que suscribe, Jefe Titular de esta Dependencia, con intervención del Secretario de Actuaciones que Refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada, se hizo presente personal de @intervinientes , informando que`,
        footer: `. Motivo por el cual se mantuvo comunicación telefónica con el @fiscal , Ayudante Fiscal en turno, quien dio la directiva de iniciar las actuaciones correspondientes. En virtud de ello la Instrucción se DISPONE: Iniciar el Legajo de investigación que corresponda. Designar como secretario de las mismas al funcionario de Policía al pie firmante. Dar intervención a la U.F.I. @ufi mediante la comunicación con el Ayudante Fiscal. Recibir, agregar y vincular a la causa, Acta de Procedimiento, a los fines legales correspondientes. Llevar a cabo toda otra medida de carácter legal que se estime de interés. CERTIFICO.-`
    },
    {
        id:'preliminares',
        titulo: 'Acta de inicio legajo',
        header: `--- En la provincia de San Juan, @departamento , sede de @dependencia , @fechaactuacion, el funcionario de Policía que suscribe, Jefe Titular de esta Dependencia, con intervención del Secretario de Actuaciones que Refrenda, a los fines legales HACE CONSTAR: Que en la fecha y hora indicada, se hizo presente personal de @intervinientes , informando que`,
        footer: `En virtud de ello el suscripto DISPONE: Iniciar las actuaciones sumariales correspondientes. Agregar a continuación Declaración testimonial del funcionario policial y acta labrada en el lugar, en calidad de una foja útil. Designar como Secretario de actuaciones al Oficial que firma al pie, como prueba de su conformidad y aceptación al cargo conferido. Llevar adelante toda medida legal de interés, en los presentes actuados. CERTIFICO.-`
    }

]