# DIETESSECRE

Aplicación web (Vite + React + TypeScript) para gestión ligera de citas con:
- Inicio de sesión por **PIN** con roles:
  - **Secretaría:** `1111`
  - **Admin:** `0000`
- **Calendario** visual de citas (mensual/diario).
- Persistencia local (LocalStorage) para pruebas.

---

## Requisitos
- **Node.js 18+** (recomendado 20+)
- **npm 9+** o **pnpm**/**yarn**
- **Visual Studio Code** con extensiones sugeridas:
  - ES7+ React/Redux/TS Snippets
  - ESLint
  - Prettier

## Clonar y abrir en VS Code
```bash
git clone https://github.com/GUSTAVOGD2001/DIETESSECRE
cd DIETESSECRE
code .

Instalar dependencias
npm install

Variables de entorno (opcional)

Crea un archivo .env.local en la raíz si usarás APIs externas:

VITE_TIMEZONE=America/Mexico_City

Ejecutar en desarrollo
npm run dev


Abre el enlace que muestra Vite (por defecto http://localhost:5173
).

Build y preview
npm run build
npm run preview

Inicio de sesión por PIN (roles)

Secretaría: ingresa 1111

Admin: ingresa 0000

El rol se usa para mostrar/ocultar funciones del panel.

Calendario de citas

Vista mensual con citas marcadas por día.

Click para ver citas del día.

Los datos se guardan en LocalStorage para pruebas.

Estructura relevante añadida
src/
  store/session.ts        # estado de sesión y rol
  lib/appointments.ts     # modelo, seed y utilidades de citas (LocalStorage)
  components/Login.tsx    # pantalla de PIN y rol
  components/Calendar.tsx # calendario visual
  App.tsx                 # routing simple por estado

Solución de problemas

Error de puertos: cierra otros procesos en el 5173 o usa --port.

Node antiguo: actualiza Node a 18+.

Limpieza de node_modules:

rm -rf node_modules package-lock.json
npm install

Licencia

MIT
