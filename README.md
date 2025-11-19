# 🚀 API REST de Tareas (ToDo List)
Este proyecto implementa una API REST básica para la gestión de tareas (CRUD: Crear, Leer, Actualizar, Eliminar) utilizando Node.js y el framework Express.js. La API gestiona los datos en memoria (utilizando un archivo JSON como simulador de Base de Datos) y sigue la arquitectura **Separación de Responsabilidades** (Rutas, Controladores, Servicios, Modelo).
## 💻 Descripción del Proyecto
### Requisitos

La API gestiona la entidad **Tarea** con los siguientes campos:
* `id` (número único)
* `title` (texto, requerido)
* `description` (texto, requerido)
* `completed` (booleano, por defecto `false`)
### Endpoints Disponibles

| Método | Endpoint | Descripción | Cuerpo de Petición (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tasks` | Obtiene todas las tareas. | - |
| **POST** | `/api/tasks` | Crea una nueva tarea. | `{ "title": "...", "description": "..." }` |
| **GET** | `/api/tasks/:id` | Obtiene una tarea específica. | - |
| **PUT** | `/api/tasks/:id` | Actualiza campos de una tarea. | `{ "completed": true }` |
| **DELETE** | `/api/tasks/:id` | Elimina una tarea por su ID. | - |
### 🛠️ Configuración y Ejecución
#### 1. Clonar el Repositorio:
git clone https://github.com/martinrioss/ToDo-backend.git
cd todo-api-express
#### 2. Instalar Dependencias:
npm install
#### 3. Ejecutar el Servidor:
npm start
# Herramientas y Modelos Utilizados
| Herramienta (Asistente) | Modelo de IA Utilizado |
| :--- | :--- |
| **Gemini** | **[Gemini Flash 2.5]** |
| **Antigravity** | **[Gemini 3 Pro (High)]**  |
### Proceso de Interacción con la IA
Aquí se incluyen ejemplos de *prompts* utilizados y la evaluación de su efectividad.
| Prompt de Ejemplo | Evaluación (Contexto/Rol/Formato/Tarea) | Resultado y Utilidad |
| :--- | :--- | :--- |
| **Prompt 1: Refactorización y Arquitectura**<br>*"Que estructura de carpetas es la más adecuada para el proyecto?"* | **Efectivo.** El *Contexto* fue la captura de pantalla de la estructura. El *Rol* fue "Revisor de Arquitectura" y "Asistente de Refactorización". La *Tarea* era validar el diseño e iniciar la separación de lógica. La IA validó el diseño MVC y propuso los pasos lógicos. | Me validó la estructura de alto nivel, lo cual fue clave para decidir la separación de `server.js` en **Controladores**, **Servicios** y **Rutas**. |
| **Prompt 2: Error de Implementación (DELETE)**<br>*"Mi función deleteTask siempre retorna un error 404, aunque el ID existe. ¿Puede ser que esté comparando un string con un número? Revisala y corrige la lógica de búsqueda en el servicio."* | **Muy efectivo.** El *Contexto* fue un error de *debugging* específico. El *Rol* fue "Depurador de Lógica". La *Tarea* fue identificar y corregir el error de tipo de datos. La IA señaló que los IDs de la URL (`req.params`) son **strings** y deben convertirse a **números** (`parseInt()`) antes de la búsqueda. | Ayudó a diagnosticar un error de tipo común en Express (parámetros de ruta como strings), ahorrando tiempo de depuración y corrigiendo la lógica en el `taskService.js`. |
| **Prompt 3: Lógica de Actualización (PUT)**<br>*"Para el endpoint PUT /tasks/:id, la función updateTask solo debe actualizar los campos (title, description o completed) que se envíen en el cuerpo de la petición (req.body), ignorando el resto. ¿Cómo hago la lógica de actualización en el servicio para evitar sobrescribir datos con null?"* | **Crítico.** El *Contexto* fue la función `updateTask` en el servicio. El *Rol* fue "Consultor de Lógica de Negocio". La *Tarea* era implementar una **actualización parcial** (parcheo). La IA proporcionó el código usando la condición `if (updates.campo !== undefined)` o `if (updates.campo)` para solo modificar los campos presentes. | Me ayudó a implementar la lógica de **actualización parcial (parcheo)**, que es fundamental en PUT/PATCH y evita que campos opcionales sean borrados si no se envían en la petición. |
### Reflexión sobre la Utilidad

La IA fue **más útil** en las etapas de **refactorización de código existente** y en la **validación de lógica de negocio**.

* **Mayor Utilidad:** Fue crucial para migrar la lógica de un solo archivo a la **estructura MVC** (Controladores, Servicios, Rutas), un proceso que suele ser tedioso. En lugar de escribir el código base, la IA se encargó del *boilerplate* (como `express.Router()` o la estructura de los *controllers*), permitiéndome enfocarme en el diseño arquitectónico.
* **Adherencia a Estándares:** Me ayudó a aplicar **buenas prácticas de desarrollo**, como la lógica de **actualización parcial** para el *endpoint* `PUT` (Prompt 3), y el manejo correcto de tipos de datos en la búsqueda (Prompt 2).

### Manejo de "Alucinaciones" o Respuestas Incorrectas

No se experimentaron alucinaciones o errores lógicos graves por parte del asistente de IA.

* **Experiencia:** La IA mantuvo el **contexto** del proyecto (Node.js/Express y la arquitectura MVC) de manera consistente durante toda la sesión. El trabajo principal fue de **guía** y **revisión de sintaxis**.
* **Aprendizaje:** Esto subraya la importancia de proporcionar **prompts detallados y contextuales** (como en los ejemplos 1, 2 y 3), lo que parece haber evitado que la IA generara respuestas erróneas o perdiera el hilo de la implementación.

### Conclusiones Personales

Trabajar con la IA como asistente fue un **acelerador de productividad** innegable. La herramienta eliminó la fricción de escribir código repetitivo y sirvió como un excelente **tutor de depuración** para errores comunes.

El aprendizaje clave sobre **Prompt Engineering** es que funciona mejor cuando se le asigna un **Rol específico y un Contexto de archivo**. Al usar *prompts* que incluían el rol y el contexto (e.g., "revisa la función en el servicio"), la IA pudo ofrecer soluciones más precisas.
