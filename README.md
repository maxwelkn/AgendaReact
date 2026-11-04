# Agenda React

Tarea 4 de Programación Web. Esta tarea consiste en rehacer la agenda anterior con React, usando un componente para listar contactos y otro para agregarlos, ambos dentro de un componente padre.

## Datos del estudiante

- Nombre: Maxwel Kenen Sael Soriano.
- Matrícula: 2025-1984.
- Institución: Instituto Tecnológico de Las Américas (ITLA).
- Carrera: Desarrollo de Software.
- Asignatura: Programación Web.
- Tarea: 4 — Agenda React.

## Estado actual

La agenda está implementada con React, JavaScript y Vite. El componente padre `Agenda` coordina la consulta y el guardado; `FormularioContacto` controla los campos y el envío, y `ListaContactos` muestra los contactos y los controles de búsqueda y actualización.

- Consulta los contactos de `https://www.raydelto.org/agenda.php` y permite buscar por nombre, apellido o teléfono.
- Envía por POST un JSON con `nombre`, `apellido` y `telefono`, quitando espacios al inicio y al final. Los tres campos son obligatorios.
- Después de guardar, vuelve a consultar el listado. Si el guardado funciona y esa consulta falla, el mensaje lo aclara para evitar reenviar el contacto.
- Muestra estados de carga, agenda vacía, búsqueda sin resultados y errores. Durante el guardado se bloquean los campos y el botón para evitar envíos duplicados.
- Conserva el diseño adaptable de la tarea anterior. Los datos se guardan en el servicio compartido, no en el navegador.

Se comprobaron 11 escenarios en Edge con respuestas simuladas, incluidos los errores de consulta y guardado, el JSON enviado, el bloqueo de duplicados, la búsqueda, el uso básico con teclado y la vista móvil de 390 px. No se enviaron contactos reales ni se verificó en esta revisión la disponibilidad del servicio externo. También pasaron el análisis de código y la compilación. Las capturas de entrega y la revisión final de documentación quedan para la siguiente sección.

## Cómo ejecutarla

Se necesita Node.js y npm. La base se verificó con Node.js 24.19.0 y npm 11.17.0.

Desde la raíz del proyecto:

```sh
npm install
npm run dev
```

Abre la dirección que indique la terminal. Vite suele usar `http://localhost:5173`; si el puerto está ocupado, mostrará otro.

Para revisar el código y generar la compilación:

```sh
npm run lint
npm run build
```

Después de compilar, `npm run preview` permite abrir el resultado localmente. La dirección aparece en la terminal.

## Estructura

```text
AgendaReact/
├── index.html                  Entrada de la aplicación
├── js/
│   ├── main.jsx                Monta React en la página
│   ├── components/
│   │   ├── Agenda.jsx          Componente padre
│   │   ├── FormularioContacto.jsx
│   │   └── ListaContactos.jsx
│   └── services/
│       └── agenda.js           Peticiones al servicio de contactos
├── css/
│   └── styles.css              Diseño y adaptación a móvil
├── package.json               Dependencias y comandos
├── package-lock.json          Versiones de las dependencias
├── vite.config.js             Configuración de Vite
└── .oxlintrc.json              Configuración del análisis de código
```

Las capturas se agregarán en `img/` cuando la interfaz esté terminada y revisada. Las dependencias instaladas y la carpeta `dist/` de compilación se excluyen de Git.
