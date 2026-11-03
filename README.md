# the Plan

Página estática de rutinas semanales, adaptable a pantallas móviles.

## Publicar en GitHub Pages

1. Sube el contenido de este repositorio a la rama `main`.
2. En GitHub, abre **Settings → Pages**.
3. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y la carpeta `/(root)`, y guarda.
4. Cuando termine la publicación, abre `https://teixg.github.io/the-plan/` desde el móvil.

## Añadir a la pantalla de inicio

- **iPhone/iPad:** abre la página en Safari, toca **Compartir** y elige **Añadir a pantalla de inicio**.
- **Android:** abre la página en Chrome, toca el menú y elige **Instalar aplicación** o **Añadir a pantalla de inicio**.

El icono y el nombre de la app se configuran en `manifest.webmanifest` y `assets/icons/`. No requiere dependencias ni compilación. Los recursos de `assets/` deben conservarse en sus rutas para que se carguen la fuente, las imágenes y los iconos.
