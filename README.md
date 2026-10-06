# Repositorio de Presentaciones con Reveal.js

Bienvenido a tu repositorio central de presentaciones interactivas impulsado por **[reveal.js](https://revealjs.com/)**.

Este directorio está configurado para gestionar, crear y consumir presentaciones interactivas HTML a lo largo del tiempo de manera limpia y organizada.

---

## 📁 Estructura del Proyecto

```
Presentaciones/
├── package.json                   # Dependencias (reveal.js, serve) y scripts de automatización
├── index.html                     # Dashboard visual central para navegar y lanzar presentaciones
├── README.md                      # Documentación y guía de uso
├── vendor/
│   └── reveal/
│       └── dist/                  # Distribución compilada de reveal.js (temas, plugins, reset.css)
├── plantillas/
│   └── base/                      # Plantilla base reutilizable para nuevas presentaciones
│       ├── index.html
│       └── custom.css
└── presentaciones/
    └── ejemplo-demostracion/      # Presentación interactiva de demostración con todas las funciones
        ├── index.html
        ├── markdown-slide.md
        └── custom.css
```

---

## 🚀 Cómo Iniciar el Servidor Local

Para previsualizar las presentaciones con todas sus funciones habilitadas (como la carga de archivos Markdown externos y las notas del orador), inicia el servidor local integrado:

```bash
npm start
# O alternativamente:
npm run dev
```

Luego abre tu navegador en: **`http://localhost:8000`**

---

## 🛠️ Cómo Crear una Nueva Presentación

1. **Duplica la plantilla base:**
   Ejecuta el siguiente comando en la terminal para crear una nueva carpeta dentro de `presentaciones/`:

   ```bash
   cp -r plantillas/base presentaciones/mi-nueva-presentacion
   ```

2. **Edita el contenido:**
   Modifica el archivo `presentaciones/mi-nueva-presentacion/index.html` para agregar tus diapositivas, textos o código.

3. **Previsualiza tu trabajo:**
   Accede a `http://localhost:8000/presentaciones/mi-nueva-presentacion/` en tu navegador.

---

## ⌨️ Atajos Teclado en Presentaciones

| Atajo | Función |
| :--- | :--- |
| <kbd>ESC</kbd> / <kbd>O</kbd> | Vista global de todas las diapositivas (Overview grid) |
| <kbd>S</kbd> | Abrir ventana de **Notas del Orador** con cronómetro |
| <kbd>F</kbd> | Modo **Pantalla Completa** |
| <kbd>B</kbd> / <kbd>.</kbd> | Pausar presentación / Pantalla en negro |
| <kbd>Alt</kbd> + <kbd>Clic</kbd> | **Zoom interactivo** en cualquier elemento |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> | Buscador de texto en la presentación |

---

## 🔄 Actualización de Reveal.js

Si en el futuro deseas actualizar a una versión más reciente de `reveal.js`, simplemente ejecuta:

```bash
npm update reveal.js
```

El script de `postinstall` actualizará automáticamente la carpeta `vendor/reveal/dist`.
