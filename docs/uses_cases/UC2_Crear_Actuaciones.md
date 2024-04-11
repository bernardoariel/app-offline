# UC2: Crear Actuaciones

## Identificador
UC2

## Nombre
Crear Actuaciones

## Actores Principales
Usuario final

## Precondiciones
- El usuario debe estar autenticado en la aplicación.
- El usuario debe tener permisos para crear actuaciones (si aplicable).

## Flujo Principal
1. El usuario accede a la sección de "Crear Actuación" en la aplicación.
2. La aplicación muestra un formulario para ingresar los detalles de la nueva actuación, incluyendo título, descripción, fecha, participantes, y ubicación.
3. El usuario llena el formulario y selecciona "Guardar" o "Crear Actuación".
4. La aplicación valida la información proporcionada.
5. Si la información es válida, la aplicación envía los datos al servidor para crear la nueva actuación.
6. El servidor responde confirmando la creación de la actuación.
7. La aplicación muestra un mensaje al usuario confirmando que la actuación ha sido creada exitosamente.

## Postcondiciones
- Se ha creado una nueva actuación, y está disponible para ser vista por otros usuarios.

## Flujos Alternativos
- Si la información proporcionada en el formulario no es válida, la aplicación muestra mensajes de error específicos y solicita al usuario corregir los datos.
- Si el servidor no puede crear la actuación por cualquier motivo, la aplicación muestra un mensaje de error explicando el problema.
