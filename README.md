# Portfolio Website Template

Plantilla de portafolio profesional creada con **Astro**, **React**, **TypeScript** y **Tailwind CSS**.

Este proyecto está preparado para publicarse en GitHub Pages, pero actualmente no contiene datos personales reales. Todos los campos sensibles fueron reemplazados por placeholders editables.

## Qué Incluye

- Diseño moderno, oscuro y responsive.
- Paleta morada/violeta relajada para la vista.
- Arquitectura limpia basada en componentes.
- Contenido editable desde archivos separados en `src/data/`.
- Navbar responsive con menú móvil.
- Secciones de Inicio, Sobre mí, Habilidades, Experiencia, Proyectos, Certificaciones, Contacto y Footer.
- Formulario de contacto funcional mediante `mailto:`.
- Música ambiental opcional en la sección Contacto.
- SEO base con título, descripción, canonical URL, Open Graph y favicon.
- Workflow de GitHub Actions para despliegue en GitHub Pages.

## Tecnologías

- Astro
- React
- TypeScript
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## Estructura

```text
src/
  components/
    Navbar.astro
    Hero.astro
    About.astro
    Skills.astro
    Experience.astro
    Projects.astro
    Certifications.astro
    Contact.astro
    Footer.astro
    MobileMenu.tsx
    MusicController.tsx
    ContactForm.tsx
  data/
    profile.ts
    skills.ts
    experience.ts
    projects.ts
    certifications.ts
  layouts/
    Layout.astro
  pages/
    index.astro
  styles/
    global.css
public/
  audio/
    contact-theme.mp3
  cv/
    CV.pdf
  images/
.github/
  workflows/
    deploy.yml
astro.config.mjs
tailwind.config.mjs
tsconfig.json
package.json
README.md
```

## Instalación

```bash
npm install
```

## Desarrollo Local

```bash
npm run dev
```

Astro normalmente mostrará una URL similar a:

```text
http://localhost:4321/
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Datos Personales

Este repositorio fue sanitizado para poder subirse públicamente sin exponer información personal.

Se reemplazaron por placeholders:

- Nombre real.
- Correo personal.
- Número de WhatsApp.
- Enlaces reales de GitHub y LinkedIn.
- Universidad o institución real.
- Ubicación real.
- Experiencia laboral real.
- Ruta de CV con nombre personal.
- Textos SEO con nombre personal.
- Imagen Open Graph con nombre personal.

## Dónde Editar La Información

Cuando quieras usar el portafolio de verdad, edita estos archivos:

- `src/data/profile.ts`: nombre, iniciales, título, correo, redes, WhatsApp, ubicación, CV y resumen.
- `src/data/skills.ts`: habilidades por categoría.
- `src/data/experience.ts`: experiencia profesional.
- `src/data/projects.ts`: proyectos, tecnologías, demos y repositorios.
- `src/data/certifications.ts`: certificaciones.

## Dónde Editar Textos Y Diseño

- `src/components/Hero.astro`
- `src/components/About.astro`
- `src/components/Skills.astro`
- `src/components/Experience.astro`
- `src/components/Projects.astro`
- `src/components/Certifications.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`
- `src/styles/global.css`
- `tailwind.config.mjs`

## CV

El botón de CV apunta actualmente a:

```text
/cv/CV.pdf
```

Cuando quieras usarlo, coloca tu archivo aquí:

```text
public/cv/CV.pdf
```

No se incluye ningún CV personal en el repositorio.

## Música De Contacto

La música opcional de la sección Contacto debe estar en:

```text
public/audio/contact-theme.mp3
```

Funcionamiento:

- No fuerza autoplay al cargar la página.
- Se desbloquea después de una interacción del usuario.
- Se reproduce a bajo volumen cuando la sección Contacto está visible.
- Se pausa o desvanece al salir de la sección.
- Tiene botón para activar o desactivar.
- Guarda la preferencia en `localStorage`.
- Si el archivo no existe, el sitio no se rompe.

## Formulario De Contacto

El formulario está en:

```text
src/components/ContactForm.tsx
```

Funciona con `mailto:` para ser compatible con GitHub Pages sin backend.

Al enviar, abre el cliente de correo del visitante con el mensaje prellenado.

Para envío real sin abrir cliente de correo, se puede integrar más adelante:

- Formspree
- EmailJS
- Resend
- Un backend propio

## Configuración De GitHub Pages

El archivo `astro.config.mjs` usa actualmente una URL placeholder:

```js
site: "https://example.github.io"
```

Cuando vayas a desplegar el sitio real, cambia ese valor por la URL final del repositorio.

Si el repositorio es un sitio de usuario como `usuario.github.io`, no necesitas configurar `base`.

Si el repositorio es un sitio de proyecto como `usuario.github.io/mi-repo`, entonces sí deberás configurar `base`.

## Workflow De Deploy

El workflow está en:

```text
.github/workflows/deploy.yml
```

Para usarlo:

1. Sube el proyecto a GitHub.
2. Entra a `Settings > Pages`.
3. Selecciona `GitHub Actions` como fuente.
4. Haz push a `main`.
5. GitHub Actions construirá y publicará el sitio.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Estado Actual

- Proyecto funcional.
- Datos personales eliminados.
- CV personal eliminado.
- Placeholders listos para editar.
- Build compatible con Astro.
