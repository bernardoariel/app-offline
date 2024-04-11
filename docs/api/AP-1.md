## GET /users/{id}

Obtiene la información del usuario por su ID.

### Parámetros
- `id` (en ruta): ID del usuario a obtener. Debe ser un entero.

### Respuestas
- `200 OK`: Operación exitosa.
  - Cuerpo de la respuesta:
    ```json
    {
      "id": 1,
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com"
    }
    ```
- `404 Not Found`: No se encontró el usuario con el ID especificado.

### Ejemplo de solicitud