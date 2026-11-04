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

Está preparada la base con React, JavaScript y Vite. El componente padre `Agenda` muestra las secciones de `FormularioContacto` y `ListaContactos`. Por ahora son la estructura inicial: todavía no consultan ni guardan contactos y el diseño completo se incorporará en los siguientes pasos.

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
│   └── components/
│       ├── Agenda.jsx          Componente padre
│       ├── FormularioContacto.jsx
│       └── ListaContactos.jsx
├── css/
│   └── styles.css              Estilos iniciales
├── package.json               Dependencias y comandos
├── package-lock.json          Versiones de las dependencias
├── vite.config.js             Configuración de Vite
└── .oxlintrc.json              Configuración del análisis de código
```

Las capturas se agregarán en `img/` cuando la interfaz esté terminada y revisada. Las dependencias instaladas y la carpeta `dist/` de compilación se excluyen de Git.
