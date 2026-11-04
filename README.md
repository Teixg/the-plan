# ✨ the Plan

Una pequeña app web para tener a mano tu rutina semanal, seguir los ejercicios y celebrar la constancia. Está pensada para usar cómodamente desde el móvil y se puede añadir a la pantalla de inicio.

## 🏋️ Qué puedes hacer

- Consultar las rutinas de lunes, martes, miércoles, viernes y sábado.
- Marcar los ejercicios a medida que los completas y abrir enlaces con indicaciones de técnica.
- Llevar una racha de rutinas completadas, con Astro como animador.
- Usar jueves y domingos como días de descanso: no cuentan ni interrumpen la racha.

## 🔥 Cómo funciona la racha

Cuando termines la rutina, pulsa **«Marcar rutina de hoy»**. El contador guarda la fecha en el almacenamiento local (`localStorage`) del navegador. Si te equivocas, puedes deshacer la marca del día.

> La racha se guarda en este navegador y dispositivo; no se sincroniza y puede borrarse si eliminas los datos del navegador. Para mantenerla, usa el mismo navegador.

## 📲 Añadir al móvil

Abre la app desde tu móvil y añádela a la pantalla de inicio:

- **iPhone o iPad:** en Safari, pulsa **Compartir → Añadir a pantalla de inicio**.
- **Android:** en Chrome, abre el menú y selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**.

## 🚀 Publicar con GitHub Pages

1. En GitHub, abre **Settings → Pages**.
2. En **Build and deployment**, elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/(root)`; pulsa **Save**.
4. Cuando finalice la publicación, visita [teixg.github.io/the-plan](https://teixg.github.io/the-plan/).

## 💻 Desarrollo local

No necesita dependencias ni compilación. Clona el repositorio y abre `index.html` en un navegador; para probar la persistencia de la racha, utiliza el mismo navegador entre visitas.

## 📁 Archivos principales

| Archivo o carpeta | Contenido |
| --- | --- |
| `index.html` | Estructura y rutinas |
| `styles.css` | Diseño adaptable a móvil y escritorio |
| `script.js` | Interacción, ejercicios y contador de racha |
| `manifest.webmanifest` | Nombre, iconos y ajustes de instalación |
| `assets/` | Imágenes, iconos y fuente |

Conserva las rutas de `assets/` para que se carguen correctamente los recursos visuales.
