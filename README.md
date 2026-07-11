# Explorador de usuarios con React

Aplicación React que consume la API pública de Random User, muestra una lista de usuarios y permite guardar preferencias del usuario en localStorage y cookies.

## Funcionalidades
- Consumo de API con fetch, async/await.
- Arquitectura basada en componentes.
- Uso de useState, useMemo y useEffect.
- Persistencia de preferencias en localStorage y cookies.
- Búsqueda de usuarios por nombre o correo.

## Requisitos
- Node.js 18+
- npm

## Instalación
```bash
npm install
```

## Ejecución
```bash
npm run dev
```

## Build
```bash
npm run build
```
## Ejecutar con Docker

Construir y levantar el contenedor:

```bash
docker compose up --build
```

Abrir la aplicación en:

```
http://localhost:8080
```