# Galería con buscador

Página estática (sin backend) para publicar en GitHub Pages: subes imágenes con un texto arriba de cada una, y un buscador las filtra en tiempo real mientras escribes.

## Estructura

```
galeria/
├── index.html        ← la página
├── css/style.css      ← estilos
├── js/app.js           ← lógica del buscador (no hace falta tocarlo)
├── js/items.js         ← AQUÍ AÑADES CADA IMAGEN NUEVA
└── images/             ← aquí van los archivos de imagen
```

Ahora mismo el proyecto trae 6 imágenes de ejemplo (con letras de relleno, no son artes reales) para que veas cómo funciona el buscador. Bórralas cuando subas las tuyas.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado, pero Pages gratis solo funciona en repos públicos si no tienes plan de pago).
2. Sube todo el contenido de esta carpeta al repositorio:
   - Más fácil: en la página del repo, botón **Add file → Upload files**, arrastra todo (incluida la carpeta `images`, `css`, `js`).
   - O con git: `git add . && git commit -m "sitio inicial" && git push`
3. Entra a **Settings → Pages** del repositorio.
4. En "Build and deployment" elige **Deploy from a branch**, rama **main**, carpeta **/ (root)**. Guarda.
5. Espera un minuto y GitHub te dará la URL (algo como `https://tu-usuario.github.io/tu-repo/`).

## Cómo añadir una imagen nueva (cada vez que subas una)

1. Sube el archivo de imagen a la carpeta `images/` (por ejemplo `images/ezreal.png`).
2. Abre `js/items.js` y copia una línea existente, cambiando el texto y el nombre de archivo:
   ```js
   { text: "Ezreal", file: "images/ezreal.png" },
   ```
3. Guarda el archivo y sube el cambio (commit). En un minuto la página se actualiza sola.

Puedes editar `js/items.js` directamente desde la web de GitHub (icono de lápiz al ver el archivo), no necesitas nada instalado en tu computadora.

## Cómo funciona la búsqueda

- No distingue mayúsculas/minúsculas ni acentos: "mis", "Mis" o "MISS" encuentran "Miss Fortune".
- Busca por coincidencia parcial: escribir "for" también encuentra "Miss Fortune".
- Si una imagen no aparece, revisa que el nombre del archivo en `items.js` sea EXACTAMENTE igual al de la carpeta `images/` (mayúsculas y extensión incluidas).

## Si quieres automatizarlo más

Ahora mismo cada imagen nueva requiere una línea manual en `items.js`. Si en algún momento quieres que la página detecte las imágenes solo con subir el archivo (sin tocar código), se puede agregar un GitHub Action que genere esa lista automáticamente a partir de los nombres de archivo — avísame y te lo preparo.
