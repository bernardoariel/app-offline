# UC1: Ver Actuaciones

## Historial de Revisiones

Version | Fecha       | Descripción de Cambios
--------|------------|-----------------------
1.00     | 2024-04-10 | Versión inicial del caso de uso.
1.01     | 2024-04-11 | Agregando un nuevo HeaderName y Botones a la tabla principal.

## Identificador
UC1

## Nombre
Ver Actuaciones

## Actores Principales
Usuario final

## Precondiciones
- No hay conexión a internet.
- No requiere autenticación.
- Debe existir al menos una actuación disponible para visualizar almacenada localmente.

## Flujo Principal
1. El usuario accede a la sección de "Actuaciones" en la aplicación.
2. La aplicación consulta la base de datos local del navegador para obtener las actuaciones almacenadas.
3. La aplicación muestra las actuaciones en una tabla expansible. Las columnas son las siguientes: "Fecha", "Nro.de Actuación", "Actuaciones","Juzgado", "Acciones"
4. El usuario puede expandir una actuación para ver más detalles.
5. Al expandir una actuación, la fila se queda fija y las filas siguientes se mueven dando espacio a un selector de opciones y una nueva tabla que muestra datos adicionales de la actuación y sobre la tabla se reflejará un titulo segun la opcion seleccionada.
6. Las opciones para seleccionar son: "Afectados","Vinculados","Fecha y Ubicación","Efectos","Intervinientes", siendo esta opcion visible segun el tipo de actuación.
7. Los headerNames de la tabla de Afectados será:"Nombre","Apellido","Nro.Documento","Teléfono","Tipo de Afectado"
8. Los headerNames de la tabla de Vinculados será:"Nombre","Apellido","Nro.Documento","Teléfono","Apodo","Tipo de Vinculado"
9. Los headerNames de la tabla Fecha y Ubicación será:"Fecha desde","Fecha hasta","Calle","Número","Departamento"
10. Las fechas se mostraran en el formato dd/mm/yyyy
11. Los headerNames de la tabla Efectos será: "Categoría","Marca","Modelo","Subcategoría","Tipo"
12. Los headerNames de Intervinientes será: "Apellido","Nombre","Jerarquía","Dependencia"

## Postcondiciones
- El usuario ha podido ver las actuaciones disponibles y los detalles de una actuación seleccionada.

## Flujo Alternativo
- Si no hay actuaciones disponibles, la aplicación muestra la tabla vacía con un mensaje que sugiere al usuario verificar más tarde o actualizar los datos locales si es posible.

## Notas Técnicas
- **Tecnología de Almacenamiento Local**: La aplicación utiliza IndexedDB/localStorage para almacenar datos de las actuaciones. Esto permite guardar los datos localmente para ser consumidos luego.
- **Actualización de Datos**: La aplicación solo manejará datos cacheados.

