# SRS — Web moderna monetizable con Google AdSense (GitHub + Cloudflare)

**Versión:** 1.0  
**Fecha:** 2026-02-26  
**Idioma:** Español (España)  
**Documento:** Software Requirements Specification (SRS)  
**Roles:** Arquitectura, Análisis Funcional, QA, DevOps, Cloudflare, Compliance/Legal, Monetización

---

## 1. Introducción

### 1.1 Propósito del documento
Este SRS define de forma **técnica, verificable y accionable** los requisitos para desarrollar y desplegar una web moderna, rápida y **monetizable con Google AdSense**, cumpliendo con **normativa UE/España** (privacidad/cookies/transparencia) y con un flujo profesional en **GitHub** y despliegue en **Cloudflare Pages** (y **Workers** solo si es imprescindible).

### 1.2 Alcance del sistema
El sistema incluirá:
- Frontend web **mobile-first** con navegación clara, contenido de valor, y componentes de monetización.
- Funcionalidad principal: **caja visible** para pegar un **enlace a un GPT de ChatGPT** y abrirlo con validación.
- Secciones de contenido (guías/artículos) y/o directorio/listados, según el tipo de web.
- Páginas legales mínimas (UE/España) y sistema de consentimiento de cookies cuando aplique.
- Integración de **Google AdSense** (sin prometer aprobación), incluyendo `ads.txt`.
- Pipeline de calidad (CI) y despliegue (CD) en **GitHub Actions** y **Cloudflare Pages**, con entornos:
  - local
  - preview (deploy por PR)
  - staging (rama dedicada, recomendado)
  - producción (main)

Fuera de alcance (MVP):
- Login/usuarios, backoffice y moderación avanzada (solo si se planifica fase posterior).
- API propia o SSR complejo (solo si se justifica; ver supuestos).

### 1.3 Definiciones, acrónimos y términos
- **SRS:** Software Requirements Specification.
- **PR:** Pull Request.
- **CI/CD:** Integración continua / Entrega (despliegue) continua.
- **CWV / Core Web Vitals:** métricas web (LCP, CLS, INP).
- **CMP:** Consent Management Platform (gestión consentimiento cookies).
- **EEA/UE:** Espacio Económico Europeo / Unión Europea.
- **SSG:** Static Site Generation (generación estática).
- **SSR:** Server-Side Rendering (renderizado en servidor).
- **CSP:** Content Security Policy (política de seguridad de contenido).
- **ads.txt:** archivo público para inventario publicitario (recomendado/obligatorio en muchos casos).

### 1.4 Referencias (normativas, políticas, documentación relevante)
> Nota: listar estas referencias en el repositorio como enlaces/documentación interna; las políticas pueden cambiar.

- RGPD (UE) y LOPDGDD (España) — privacidad y protección de datos.
- Directiva ePrivacy / normativa de cookies aplicable (UE/España).
- Políticas de Google Publisher (AdSense) — anuncios, contenido, clics, etc.
- Recomendaciones WCAG 2.1 AA — accesibilidad.
- OWASP Top 10 — buenas prácticas de seguridad web.
- Documentación Cloudflare Pages (deploy, `_headers`, `_redirects`, env vars).
- Documentación GitHub Actions (pipelines y secretos).

### 1.5 Visión general del documento
Las secciones 2–10 describen el sistema, requisitos funcionales y no funcionales, gestión de assets, arquitectura, ejemplos, trazabilidad y UAT. Las secciones 11–14 definen requisitos detallados de GitHub, CI/CD, Cloudflare y cumplimiento UE (cookies/consentimiento). Al final se incluyen checklists operativas.

---

## 2. Descripción general del sistema

### 2.1 Contexto del producto
El sistema es una web informativa/funcional orientada a atraer tráfico orgánico y monetizar con AdSense. Se despliega en el edge mediante Cloudflare Pages, y se gestiona con un flujo de colaboración y calidad en GitHub.

### 2.2 Objetivos del producto
- Experiencia rápida y clara: **mobile-first**, navegación simple, layout estable.
- Monetización sostenible y compliant: anuncios no intrusivos, transparencia, páginas legales.
- Operación profesional: calidad automática en CI, despliegues automáticos y rollback.
- Escalabilidad: arquitectura de carpetas, entornos, configuración por variables, control de assets.

### 2.3 Tipos de usuarios / perfiles
- **Usuario final (visitante):** navega, lee contenido, pega enlace GPT y abre el GPT.
- **Editor/administrador (interno):** mantiene contenido y enlaces (sin backoffice en MVP; vía commits).
- **Equipo técnico (dev/qa/devops):** desarrolla, revisa PRs, mantiene CI/CD y despliegue.

### 2.4 Supuestos y dependencias
**Supuestos (si el proyecto no aporta datos):**
- Tipo de web: **directorio + contenido educativo** sobre GPTs/herramientas.
- Público: **España**, 18–45, nivel técnico mixto.
- Objetivo negocio: **tráfico orgánico** + **ingresos AdSense**.
- Stack (recomendado para Cloudflare Pages): **Astro SSG + TypeScript** (alternativa: Next.js export estático).
- SSR/API: **No** en MVP; Workers solo si se justifica en fase futura.
- Dominio: `tu-dominio.com`, DNS gestionado en Cloudflare: **sí**.
- Repositorio GitHub: `gpt-directorio-adsense`, licencia **MIT** (si es público).

**Dependencias:**
- Aprobación/configuración de cuenta AdSense (proceso externo).
- Configuración de dominio y DNS en Cloudflare.
- Selección/implantación de CMP (si aplica) y/o Consent Mode (si aplica).

### 2.5 Limitaciones iniciales del proyecto
- Contenido inicial puede ser limitado: el MVP debe evitar “thin content” mediante plantillas robustas.
- El cumplimiento de cookies puede variar por jurisdicción/segmento; se definirá mínimo UE/España.
- Las políticas de AdSense y requisitos técnicos pueden cambiar; se requiere revisión periódica.

---

## 3. Requisitos funcionales (RF)

> Formato: ID, Nombre, Descripción (“El sistema deberá…”), Justificación, Prioridad, Criterio de aceptación, Dependencias, Riesgos.

### 3.1 Núcleo de producto y navegación

- **ID:** RF-001  
  **Nombre:** Home con propuesta de valor  
  **Descripción:** El sistema deberá mostrar una home con propuesta de valor clara, navegación principal y acceso a las secciones principales.  
  **Justificación:** Reduce rebote y guía al usuario desde el primer impacto.  
  **Prioridad:** Must  
  **Criterio de aceptación:** En móvil y desktop, la home muestra H1 + subtítulo + menú + enlaces a Directorio/Guías/Contacto y carga sin errores.  
  **Dependencias:** Diseño UI, rutas definidas.  
  **Riesgos asociados:** Diseño confuso aumenta rebote.

- **ID:** RF-002  
  **Nombre:** Rutas principales y páginas estáticas  
  **Descripción:** El sistema deberá implementar rutas para Home, Directorio/Listados, Detalle, Guías y páginas legales mínimas.  
  **Justificación:** Estructura base para SEO y cumplimiento.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Las rutas definidas responden 200 y están enlazadas desde header/footer según corresponda.  
  **Dependencias:** Router/SSG.  
  **Riesgos asociados:** 404 y pérdida SEO.

- **ID:** RF-003  
  **Nombre:** Footer con enlaces legales y transparencia  
  **Descripción:** El sistema deberá incluir un footer común con enlaces visibles a Privacidad, Cookies, Aviso legal, Contacto y (si aplica) Transparencia publicitaria.  
  **Justificación:** Cumplimiento UE y confianza.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Footer presente en todas las páginas; enlaces funcionan y cargan 200.  
  **Dependencias:** Contenido legal.  
  **Riesgos asociados:** Riesgo legal y de monetización.

### 3.2 Caja de enlace a GPT (funcionalidad clave)

- **ID:** RF-010  
  **Nombre:** Campo visible para URL de GPT  
  **Descripción:** El sistema deberá mostrar un campo visible para introducir una URL de un GPT de ChatGPT, con etiqueta descriptiva y texto de ayuda.  
  **Justificación:** Funcionalidad diferenciadora y directa.  
  **Prioridad:** Must  
  **Criterio de aceptación:** En móvil y desktop el campo se ve sin hacer scroll (idealmente above-the-fold) y tiene label accesible.  
  **Dependencias:** UI components.  
  **Riesgos asociados:** Mal posicionamiento reduce uso.

- **ID:** RF-011  
  **Nombre:** Validación básica de URL GPT  
  **Descripción:** El sistema deberá validar que el texto introducido tiene formato URL válido y, opcionalmente, que coincide con patrones esperados (p. ej. dominio `chatgpt.com` u `openai.com`).  
  **Justificación:** Evita errores y abuso.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Si la entrada no es URL válida, se muestra mensaje de error y no se ejecuta apertura.  
  **Dependencias:** Librería/función de validación.  
  **Riesgos asociados:** Falsos positivos/negativos.

- **ID:** RF-012  
  **Nombre:** Apertura de GPT en nueva pestaña  
  **Descripción:** El sistema deberá abrir el enlace validado en una nueva pestaña/ventana para no interrumpir la navegación.  
  **Justificación:** Mantiene sesión y mejora retención.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Al pulsar “Abrir GPT”, se abre un nuevo tab; la web permanece intacta.  
  **Dependencias:** UI, control de eventos.  
  **Riesgos asociados:** Bloqueadores de popups si no es acción explícita.

- **ID:** RF-013  
  **Nombre:** Estados de error y vacío del campo  
  **Descripción:** El sistema deberá mostrar errores claros si el campo está vacío o si la URL es inválida.  
  **Justificación:** UX y reducción de frustración.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Mensajes diferentes para “vacío” e “inválido”; no se rompe el layout.  
  **Dependencias:** UI/validación.  
  **Riesgos asociados:** Mensajes ambiguos.

- **ID:** RF-014  
  **Nombre:** Sanitización de la entrada  
  **Descripción:** El sistema deberá sanitizar la entrada del usuario para evitar inyección de HTML/JS y abrir únicamente URLs permitidas.  
  **Justificación:** Seguridad básica.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Entradas con `<script>` o caracteres maliciosos no se ejecutan ni rompen la UI.  
  **Dependencias:** Sanitizador/validación.  
  **Riesgos asociados:** XSS/reflected.

- **ID:** RF-015  
  **Nombre:** Preferencia por HTTPS  
  **Descripción:** El sistema deberá advertir o bloquear URLs no HTTPS cuando la URL de destino lo soporte, priorizando enlaces seguros.  
  **Justificación:** Seguridad y confianza.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Si se pega `http://…`, se muestra aviso o se normaliza a `https://` si procede.  
  **Dependencias:** Lógica de normalización.  
  **Riesgos asociados:** Romper enlaces legítimos.

### 3.3 Contenido, directorio y SEO funcional

- **ID:** RF-020  
  **Nombre:** Listado de elementos (directorio)  
  **Descripción:** El sistema deberá mostrar listados (p. ej. GPTs/artículos) con paginación o carga incremental para evitar páginas pesadas.  
  **Justificación:** Rendimiento y UX.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Listado navegable; TTI razonable; no se cargan más de N items iniciales (definir N).  
  **Dependencias:** Dataset / CMS / contenido en repo.  
  **Riesgos asociados:** Listados demasiado largos → CWV peor.

- **ID:** RF-021  
  **Nombre:** Página detalle SEO-friendly  
  **Descripción:** El sistema deberá proporcionar páginas de detalle con URL estable (slug) y metadatos únicos (title/description).  
  **Justificación:** SEO y usabilidad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Cada detalle tiene title/description únicos y canonical correcto; responde 200.  
  **Dependencias:** Plantillas.  
  **Riesgos asociados:** Duplicados SEO.

- **ID:** RF-022  
  **Nombre:** Sitemap y robots  
  **Descripción:** El sistema deberá exponer `sitemap.xml` y `robots.txt` correctos para facilitar indexación.  
  **Justificación:** SEO técnico mínimo.  
  **Prioridad:** Must  
  **Criterio de aceptación:** `GET /sitemap.xml` y `GET /robots.txt` devuelven 200 y contenido válido.  
  **Dependencias:** Build/SSG.  
  **Riesgos asociados:** No indexación.

- **ID:** RF-023  
  **Nombre:** Página 404 amigable  
  **Descripción:** El sistema deberá implementar una página 404 con enlaces de recuperación (home, categorías).  
  **Justificación:** UX y retención.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Navegar a ruta inexistente muestra 404 con CTA de retorno.  
  **Dependencias:** Router/hosting.  
  **Riesgos asociados:** Rebote alto.

### 3.4 Monetización (AdSense) y cumplimiento funcional

- **ID:** RF-030  
  **Nombre:** Integración de bloques de anuncios (AdSense)  
  **Descripción:** El sistema deberá permitir la inserción de bloques de anuncios en ubicaciones definidas (home, listados, detalle, guías) sin interferir con navegación.  
  **Justificación:** Monetización.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Los espacios de anuncios cargan cuando corresponde y no tapan elementos críticos.  
  **Dependencias:** AdSense, consentimiento (si aplica).  
  **Riesgos asociados:** Intrusividad y penalización.

- **ID:** RF-031  
  **Nombre:** Separación visual y etiqueta de publicidad  
  **Descripción:** El sistema deberá diferenciar visualmente los anuncios del contenido e incluir etiqueta “Publicidad” cuando corresponda.  
  **Justificación:** Transparencia y reducción de clics accidentales.  
  **Prioridad:** Must  
  **Criterio de aceptación:** QA valida que el slot de anuncio no se confunde con CTA; existe separación visual.  
  **Dependencias:** Diseño.  
  **Riesgos asociados:** Prácticas engañosas.

- **ID:** RF-032  
  **Nombre:** Publicación de ads.txt  
  **Descripción:** El sistema deberá publicar `ads.txt` accesible públicamente en `https://<dominio>/ads.txt`.  
  **Justificación:** Requisito frecuente para inventario y confianza publicitaria.  
  **Prioridad:** Must  
  **Criterio de aceptación:** `GET /ads.txt` devuelve 200 y el contenido coincide con lo configurado por el publisher.  
  **Dependencias:** Dominio configurado.  
  **Riesgos asociados:** Pérdida de ingresos/limitaciones.

- **ID:** RF-033  
  **Nombre:** Páginas legales mínimas  
  **Descripción:** El sistema deberá incluir páginas de Privacidad, Cookies, Aviso legal, Copyright/PI y Contacto, accesibles desde el footer.  
  **Justificación:** Cumplimiento UE/España y políticas de monetización.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Todas las páginas responden 200; enlaces presentes en footer.  
  **Dependencias:** Contenido legal.  
  **Riesgos asociados:** Riesgo legal, rechazo monetización.

- **ID:** RF-034  
  **Nombre:** Transparencia publicitaria  
  **Descripción:** El sistema deberá informar de forma clara del uso de publicidad de terceros en el sitio (página o sección).  
  **Justificación:** Confianza y cumplimiento.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Existe sección/página que explica financiación por anuncios y enlaza desde footer o legal.  
  **Dependencias:** Redacción legal/UX.  
  **Riesgos asociados:** Desconfianza usuario.

### 3.5 Consentimiento de cookies (funcional)

- **ID:** RF-040  
  **Nombre:** Banner/gestor de consentimiento cookies  
  **Descripción:** El sistema deberá mostrar un mecanismo de consentimiento de cookies cuando sea legalmente exigible (UE/EEA), con opciones aceptar, rechazar y configurar.  
  **Justificación:** Cumplimiento ePrivacy/RGPD.  
  **Prioridad:** Must  
  **Criterio de aceptación:** En primera visita desde UE, aparece el banner; permite rechazar; se recuerda decisión.  
  **Dependencias:** CMP o implementación propia.  
  **Riesgos asociados:** Incumplimiento legal.

- **ID:** RF-041  
  **Nombre:** Bloqueo previo de tags no esenciales  
  **Descripción:** El sistema deberá impedir la carga de tags no esenciales (p. ej. AdSense/ads personalizados, analítica) antes del consentimiento cuando aplique.  
  **Justificación:** Cumplimiento UE.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Con “Rechazar”, no se cargan scripts no esenciales (verificable en DevTools).  
  **Dependencias:** CMP/consent mode.  
  **Riesgos asociados:** Incumplimiento, penalización.

- **ID:** RF-042  
  **Nombre:** Cambio/revocación del consentimiento  
  **Descripción:** El sistema deberá permitir al usuario cambiar o revocar el consentimiento desde un enlace persistente (footer).  
  **Justificación:** Derecho del usuario y cumplimiento.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Existe enlace “Cambiar cookies” que reabre el panel y aplica cambios.  
  **Dependencias:** CMP.  
  **Riesgos asociados:** Falta de control del usuario.

---

## 4. Requisitos no funcionales (RNF)

### 4.1 Rendimiento (Core Web Vitals)
- **ID:** RNF-001  
  **Nombre:** Objetivos mínimos de CWV  
  **Descripción:** El sistema deberá cumplir objetivos mínimos de Core Web Vitals en móvil (p75): LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms.  
  **Justificación:** UX y SEO.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Lighthouse/medición en staging cumple umbrales definidos.  
  **Dependencias:** Optimización assets, layout, scripts.  
  **Riesgos asociados:** Scripts de anuncios degradan CWV.

- **ID:** RNF-002  
  **Nombre:** Peso de página controlado  
  **Descripción:** El sistema deberá mantener el peso de recursos críticos por página dentro de límites definidos (p. ej. JS inicial ≤ 200KB gzip como objetivo).  
  **Justificación:** Rendimiento en móvil.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Build report muestra bundles dentro de umbral o justificación documentada.  
  **Dependencias:** Bundler.  
  **Riesgos asociados:** Complejidad creciente.

### 4.2 Seguridad
- **ID:** RNF-010  
  **Nombre:** Protección básica contra XSS  
  **Descripción:** El sistema deberá evitar inyección de scripts mediante sanitización y escapado correcto en inputs y templates.  
  **Justificación:** Seguridad del usuario.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Tests manuales de XSS básicos no ejecutan código.  
  **Dependencias:** Framework/templating.  
  **Riesgos asociados:** Vulnerabilidades.

- **ID:** RNF-011  
  **Nombre:** Headers de seguridad  
  **Descripción:** El sistema deberá aplicar headers de seguridad (al menos `X-Content-Type-Options`, `Referrer-Policy`, y CSP compatible con AdSense/CMP).  
  **Justificación:** Reduce superficie de ataque.  
  **Prioridad:** Must  
  **Criterio de aceptación:** En producción se observan headers en respuesta y no rompen anuncios/consentimiento.  
  **Dependencias:** Cloudflare Pages `_headers`.  
  **Riesgos asociados:** CSP demasiado restrictiva rompe scripts.

### 4.3 Usabilidad y accesibilidad
- **ID:** RNF-020  
  **Nombre:** Objetivo WCAG 2.1 AA  
  **Descripción:** El sistema deberá aspirar a conformidad WCAG 2.1 AA en componentes principales (formularios, navegación, contraste, foco).  
  **Justificación:** Inclusión y calidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Auditoría (Lighthouse a11y + checklist manual) sin fallos críticos.  
  **Dependencias:** Diseño.  
  **Riesgos asociados:** Deuda de accesibilidad.

- **ID:** RNF-021  
  **Nombre:** Navegación por teclado  
  **Descripción:** El sistema deberá permitir navegar por teclado con foco visible en elementos interactivos.  
  **Justificación:** Accesibilidad básica.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Tabulación recorre elementos; foco visible; no hay traps.  
  **Dependencias:** UI.  
  **Riesgos asociados:** Experiencia mala para usuarios.

### 4.4 SEO técnico
- **ID:** RNF-030  
  **Nombre:** Metadatos y canonical  
  **Descripción:** El sistema deberá generar metadatos únicos por página (title/description) y canonical correcto en páginas indexables.  
  **Justificación:** SEO y evitar duplicados.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Auditoría de 20 URLs sin duplicados críticos; canonical apunta a la URL canónica.  
  **Dependencias:** Plantillas.  
  **Riesgos asociados:** Penalizaciones o indexación deficiente.

### 4.5 Mantenibilidad y portabilidad
- **ID:** RNF-040  
  **Nombre:** Configuración por entorno  
  **Descripción:** El sistema deberá externalizar configuración en variables de entorno y ficheros de configuración, evitando hardcodear URLs y paths.  
  **Justificación:** Portabilidad y despliegue multi-entorno.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Cambiar de staging a prod no requiere cambios de código; solo configuración.  
  **Dependencias:** CI/CD y Cloudflare env vars.  
  **Riesgos asociados:** Errores por configuración.

- **ID:** RNF-041  
  **Nombre:** Estándares de código y lint  
  **Descripción:** El sistema deberá aplicar lint/format automáticos y fallar CI si no se cumplen.  
  **Justificación:** Calidad y coherencia.  
  **Prioridad:** Must  
  **Criterio de aceptación:** PR con lint fallido no puede mergear.  
  **Dependencias:** GitHub Actions.  
  **Riesgos asociados:** Fricción si no se configura bien.

### 4.6 Observabilidad / logging
- **ID:** RNF-050  
  **Nombre:** Registro mínimo de errores front  
  **Descripción:** El sistema deberá disponer de un mecanismo mínimo de detección de errores (p. ej. logging de errores JS y 404) y proceso de revisión.  
  **Justificación:** Operación y QA continua.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Existe procedimiento y, si se implementa herramienta, se registran errores en staging/prod.  
  **Dependencias:** Herramienta/Analytics.  
  **Riesgos asociados:** Fallos silenciosos.

### 4.7 Cumplimiento legal y monetización
- **ID:** RNF-060  
  **Nombre:** No prometer aprobación AdSense  
  **Descripción:** El sistema y su documentación no deberán afirmar que la aprobación de AdSense está garantizada.  
  **Justificación:** Precisión y expectativas.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Revisiones de contenido/documentación sin frases de “aprobación garantizada”.  
  **Dependencias:** Documentación.  
  **Riesgos asociados:** Expectativas erróneas.

- **ID:** RNF-061  
  **Nombre:** Revisión periódica de políticas  
  **Descripción:** El sistema deberá incluir un procedimiento documentado para revisar cambios en políticas de Google y actualizar el checklist de cumplimiento.  
  **Justificación:** Políticas cambian.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Existe documento `docs/compliance-checklist.md` y una tarea recurrente definida (p. ej. trimestral).  
  **Dependencias:** Procesos.  
  **Riesgos asociados:** Incumplimientos futuros.

---

## 5. Requisitos específicos de gestión de imágenes y recursos multimedia (OBLIGATORIO)

> Esta sección incluye requisitos específicos (10–15) dedicados a rutas, optimización, validación y fallback.

- **ID:** RF-100  
  **Nombre:** Estructura estándar de assets  
  **Descripción:** El sistema deberá usar una estructura estándar para recursos estáticos: `/assets/images`, `/assets/css`, `/assets/js` (o equivalente según stack).  
  **Justificación:** Orden, mantenibilidad y despliegue consistente.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Repositorio contiene estructura y las rutas referencian esos directorios.  
  **Dependencias:** Stack.  
  **Riesgos asociados:** Desorganización de assets.

- **ID:** RF-101  
  **Nombre:** Prohibición de rutas absolutas del SO  
  **Descripción:** El sistema no deberá referenciar imágenes mediante rutas absolutas del sistema operativo (ej. `C:\...` o `/Users/...`).  
  **Justificación:** Portabilidad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Revisión CI busca patrones de rutas absolutas y falla si existen.  
  **Dependencias:** Script de validación.  
  **Riesgos asociados:** Roturas en producción.

- **ID:** RF-102  
  **Nombre:** Base path configurable para assets  
  **Descripción:** El sistema deberá soportar base path/base URL configurable para assets estáticos mediante configuración por entorno.  
  **Justificación:** Compatibilidad multi-entorno.  
  **Prioridad:** Should  
  **Criterio de aceptación:** En preview/staging/prod las imágenes cargan sin cambios de código.  
  **Dependencias:** Config env.  
  **Riesgos asociados:** Dificultad de despliegue.

- **ID:** RF-103  
  **Nombre:** Convención de nombres de imágenes  
  **Descripción:** El sistema deberá usar nombres de archivo en minúsculas, sin espacios, con guiones y extensiones permitidas.  
  **Justificación:** Evitar errores por case-sensitivity y compatibilidad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Linter/CI detecta nombres fuera de convención.  
  **Dependencias:** Script/linter.  
  **Riesgos asociados:** 404 en Linux.

- **ID:** RF-104  
  **Nombre:** Control de mayúsculas/minúsculas en rutas  
  **Descripción:** El sistema deberá garantizar coincidencia exacta entre ruta referenciada y nombre de archivo (case-sensitive).  
  **Justificación:** Compatibilidad con Linux/Cloudflare.  
  **Prioridad:** Must  
  **Criterio de aceptación:** CI verifica que todas las referencias existen con casing exacto.  
  **Dependencias:** Validación build-time.  
  **Riesgos asociados:** Recursos rotos.

- **ID:** RF-105  
  **Nombre:** Extensiones permitidas  
  **Descripción:** El sistema deberá permitir únicamente extensiones aprobadas (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.svg` según política).  
  **Justificación:** Seguridad, rendimiento y compatibilidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** CI alerta o falla ante extensiones no permitidas.  
  **Dependencias:** Script.  
  **Riesgos asociados:** Formatos ineficientes.

- **ID:** RF-106  
  **Nombre:** Optimización y formatos modernos  
  **Descripción:** El sistema deberá promover formatos modernos (WebP/AVIF) con fallback cuando aplique.  
  **Justificación:** Rendimiento (LCP).  
  **Prioridad:** Should  
  **Criterio de aceptación:** Al menos X% de imágenes en WebP/AVIF (definir umbral) o justificación documentada.  
  **Dependencias:** Pipeline de imágenes.  
  **Riesgos asociados:** Complejidad extra.

- **ID:** RF-107  
  **Nombre:** Lazy loading en imágenes no críticas  
  **Descripción:** El sistema deberá aplicar lazy loading a imágenes fuera del viewport inicial cuando sea apropiado.  
  **Justificación:** Rendimiento y ahorro de datos.  
  **Prioridad:** Must  
  **Criterio de aceptación:** En listados, imágenes bajo el fold usan `loading="lazy"` o mecanismo equivalente.  
  **Dependencias:** Templates.  
  **Riesgos asociados:** Layout shifts si no se dimensiona.

- **ID:** RF-108  
  **Nombre:** Dimensionado para evitar CLS  
  **Descripción:** El sistema deberá definir dimensiones (width/height o aspect ratio) para imágenes para minimizar CLS.  
  **Justificación:** CWV.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Lighthouse CLS ≤ 0.1; componentes de imagen definen tamaño.  
  **Dependencias:** CSS/layout.  
  **Riesgos asociados:** CLS elevado.

- **ID:** RF-109  
  **Nombre:** Texto alternativo accesible  
  **Descripción:** El sistema deberá incluir `alt` descriptivo en imágenes informativas y `alt=""` en decorativas.  
  **Justificación:** Accesibilidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Auditoría a11y sin errores por `alt` faltante en imágenes informativas.  
  **Dependencias:** Contenido.  
  **Riesgos asociados:** Accesibilidad deficiente.

- **ID:** RF-110  
  **Nombre:** Validación de existencia de recursos en CI  
  **Descripción:** El sistema deberá validar en CI que las rutas referenciadas a imágenes/assets existen (build-time).  
  **Justificación:** Evitar enlaces rotos.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Pipeline falla si encuentra referencias a archivos inexistentes.  
  **Dependencias:** Script de link-check.  
  **Riesgos asociados:** Falsos positivos en rutas dinámicas.

- **ID:** RF-111  
  **Nombre:** Informe de errores de assets  
  **Descripción:** El sistema deberá generar un informe (artefacto CI) con rutas inválidas detectadas y sugerencias.  
  **Justificación:** QA y corrección rápida.  
  **Prioridad:** Should  
  **Criterio de aceptación:** El job produce un reporte descargable en PR.  
  **Dependencias:** GitHub Actions artifacts.  
  **Riesgos asociados:** No se revisa el reporte.

- **ID:** RF-112  
  **Nombre:** Fallback de imagen ante fallo  
  **Descripción:** El sistema deberá mostrar una imagen de fallback si la imagen principal falla, sin romper el layout.  
  **Justificación:** Robustez y UX.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Simular 404 de imagen y verificar fallback y layout estable.  
  **Dependencias:** Componentes UI.  
  **Riesgos asociados:** Fallback no accesible o pesado.

- **ID:** RF-113  
  **Nombre:** Prohibición de hotlinking no autorizado  
  **Descripción:** El sistema deberá evitar hotlinking de imágenes de terceros sin permiso y priorizar assets propios/licenciados.  
  **Justificación:** Copyright y estabilidad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Revisión de contenido/CI bloquea dominios no aprobados.  
  **Dependencias:** Política de fuentes de imágenes.  
  **Riesgos asociados:** Reclamos copyright.

- **ID:** RNF-114  
  **Nombre:** Presupuesto de imagen hero  
  **Descripción:** El sistema deberá limitar el peso de la imagen hero (si existe) y optimizarla para no degradar LCP.  
  **Justificación:** CWV.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Hero ≤ umbral (p. ej. 150KB WebP/AVIF) o justificación documentada.  
  **Dependencias:** Pipeline imágenes.  
  **Riesgos asociados:** LCP alto.

- **ID:** RNF-115  
  **Nombre:** Compatibilidad de SVG segura  
  **Descripción:** El sistema deberá sanitizar o controlar SVGs para evitar scripts embebidos, permitiendo solo SVGs seguros.  
  **Justificación:** Seguridad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** SVGs revisados; CI detecta `<script>` en SVG y falla.  
  **Dependencias:** Script.  
  **Riesgos asociados:** Vector XSS.

---

## 6. Restricciones técnicas

- **Stack/hosting:** el sistema deberá ser compatible con **Cloudflare Pages** (preferencia por SSG/estático).  
- **Workers:** solo se permitirá Cloudflare Workers si hay necesidad explícita de SSR/API; deberá documentarse la justificación.  
- **Compatibilidad navegador:** últimas 2 versiones de Chrome/Edge/Firefox/Safari, y soporte móvil moderno.  
- **Dependencias:** versiones bloqueadas con lockfile (`package-lock.json`, `pnpm-lock.yaml` o `yarn.lock`).  
- **Rutas y assets:** se prohíben rutas absolutas locales; base path configurable.  
- **AdSense:** se prohíben prácticas engañosas (incentivar clics, overlays, confusión UI).  
- **Políticas legales:** no publicar contenidos con copyright sin licencia.

---

## 7. Consideraciones de arquitectura

### 7.1 Estructura de carpetas (recomendada)
```
/
  src/
    pages/              # rutas/páginas
    components/         # UI components (incl. GPTLinkBox, AdSlot)
    styles/
    lib/                # utilidades (validación URL, sanitización)
    content/            # markdown/colecciones (guias, items directorio)
  assets/
    images/
    css/
    js/
  public/
    robots.txt
    sitemap.xml (generado)
    ads.txt
  docs/
    architecture.md
    deployment.md
    compliance-checklist.md
    assets-licenses.md
  .github/
    workflows/
```

### 7.2 Gestión de configuración por entorno
- Variables de entorno separadas para preview/staging/prod.
- No exponer secretos reales en cliente; si fueran necesarios, usar Workers/servicios externos.
- Base URL/canonical configurable.

### 7.3 Estrategia de recursos estáticos
- Hashing en nombres de bundles para caching eficiente.
- Cache largo para assets con hash; cache controlado para HTML.

### 7.4 Manejo de errores de assets
- Validación en CI de rutas/imágenes.
- 404 page y logs mínimos.

### 7.5 Integración de AdSense (no intrusiva)
- Componente `AdSlot` aislado para controlar carga y evitar duplicación.
- Documentar ubicaciones y límites de densidad por plantilla.
- Integración compatible con consentimiento.

### 7.6 SEO
- sitemap/robots/canonical.
- OpenGraph y metadatos por página.
- Estructura interna de enlaces (hub & spoke si hay contenido).

### 7.7 `ads.txt` y páginas legales
- `ads.txt` versionado en repo o generado desde config.
- Legales enlazados desde footer global.

---

## 8. Ejemplos de implementación recomendada

### 8.1 Ejemplos de requisitos correctamente redactados
- “El sistema deberá validar la existencia de rutas de imágenes en el pipeline de CI y fallar el build si detecta una referencia a un archivo inexistente.”  
- “El sistema deberá mostrar una imagen de fallback si la imagen principal no está disponible, sin romper el layout de la página.”  
- “El sistema deberá incluir un campo visible para introducir un enlace a un GPT de ChatGPT, validando el formato de URL y mostrando un mensaje de error si el enlace no es válido.”

### 8.2 Ejemplo de validación básica de URL (pseudo)
```ts
function isValidUrl(u: string): boolean {
  try { new URL(u); return true; } catch { return false; }
}
```

### 8.3 Ejemplo Cloudflare Pages `_headers` (orientativo)
> Ajustar CSP según CMP/AdSense (dominios permitidos) y validar en staging.
```txt
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 8.4 Ejemplo `_redirects` (www ↔ raíz)
```txt
https://www.tu-dominio.com/* https://tu-dominio.com/:splat 301!
```

---

## 9. Matriz de trazabilidad (recomendado)

| Requisito | Componente | Prueba/Validación |
|---|---|---|
| RF-010 | `GPTLinkBox` | Test UI + validación manual |
| RF-011 | `lib/validateUrl` | Unit test |
| RF-032 | `public/ads.txt` | CI smoke test `curl /ads.txt` |
| RF-040 | CMP/Consent UI | QA: aceptar/rechazar/configurar |
| RF-110 | CI link-check | Job GitHub Actions |
| RNF-001 | Performance budget | Lighthouse CI |

---

## 10. Criterios de aceptación del sistema (UAT / checklist final)

- [ ] Home clara, navegación funcional, responsive.
- [ ] Caja de GPT visible, valida URL, muestra errores y abre en nueva pestaña.
- [ ] Listados y páginas de detalle responden 200 y son indexables.
- [ ] Páginas legales mínimas publicadas y enlazadas.
- [ ] Consentimiento cookies operativo (UE) y bloqueo previo de tags no esenciales cuando aplique.
- [ ] AdSense integrado sin prácticas engañosas, anuncios separados del contenido.
- [ ] `ads.txt` accesible en `/ads.txt`.
- [ ] `sitemap.xml` y `robots.txt` correctos.
- [ ] CI pasa (lint/test/build/link-check/Lighthouse).
- [ ] Cloudflare Pages con preview/staging/prod y dominio en HTTPS.
- [ ] No hay enlaces rotos críticos (404) ni imágenes rotas en rutas principales.

---

## 11. Requisitos de GitHub (OBLIGATORIO)

- **ID:** RF-200  
  **Nombre:** Estructura mínima del repositorio  
  **Descripción:** El repositorio deberá incluir `README.md`, `LICENSE` (si aplica), `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md` (si aplica), `.env.example` y carpeta `docs/`.  
  **Justificación:** Colaboración, seguridad y documentación.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Los ficheros existen en `main` y se revisan en PR.  
  **Dependencias:** Equipo.  
  **Riesgos asociados:** Falta de onboarding.

- **ID:** RF-201  
  **Nombre:** Plantillas de Issues y PR  
  **Descripción:** El repositorio deberá incluir plantillas para issues y pull requests.  
  **Justificación:** Consistencia y calidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** `.github/ISSUE_TEMPLATE/*` y `PULL_REQUEST_TEMPLATE.md` presentes.  
  **Dependencias:** Repo.  
  **Riesgos asociados:** PRs incompletas.

- **ID:** RF-202  
  **Nombre:** Estrategia de ramas  
  **Descripción:** El sistema deberá usar `main` para producción, `staging` para preproducción (recomendado) y ramas `feature/*` y `fix/*`.  
  **Justificación:** Control de releases.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Reglas de rama documentadas en README/docs.  
  **Dependencias:** Equipo.  
  **Riesgos asociados:** Cambios directos en main.

- **ID:** RF-203  
  **Nombre:** Branch protection  
  **Descripción:** El repositorio deberá habilitar protección de ramas en `main` (y `staging` si existe) con PR obligatorio y checks obligatorios.  
  **Justificación:** Previene regressions.  
  **Prioridad:** Must  
  **Criterio de aceptación:** No es posible hacer push directo a `main`; merge requiere CI verde y 1 aprobación.  
  **Dependencias:** Admin GitHub.  
  **Riesgos asociados:** Bloqueo por mala configuración.

- **ID:** RF-204  
  **Nombre:** Convención de commits  
  **Descripción:** El equipo deberá seguir Conventional Commits (o estándar explícito) para facilitar changelog y mantenimiento.  
  **Justificación:** Trazabilidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** PRs revisan mensajes; opcional: commitlint en CI.  
  **Dependencias:** Tooling.  
  **Riesgos asociados:** Resistencia del equipo.

- **ID:** RF-205  
  **Nombre:** Dependabot y lockfile  
  **Descripción:** El repositorio deberá usar lockfile y habilitar Dependabot para actualizaciones de dependencias.  
  **Justificación:** Seguridad y estabilidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Dependabot config presente y lockfile versionado.  
  **Dependencias:** GitHub.  
  **Riesgos asociados:** Rupturas por updates; mitigable por CI.

- **ID:** RF-206  
  **Nombre:** Gestión de secretos  
  **Descripción:** El repositorio no deberá contener secretos; `.env` no se commitea y `.env.example` se mantiene actualizado.  
  **Justificación:** Seguridad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Escaneo de secretos (opcional) no detecta credenciales; `.gitignore` incluye `.env`.  
  **Dependencias:** Política.  
  **Riesgos asociados:** Filtración.

---

## 12. Requisitos de CI/CD con GitHub Actions (OBLIGATORIO)

- **ID:** RF-300  
  **Nombre:** Pipeline CI por Pull Request  
  **Descripción:** El sistema deberá ejecutar en cada PR un pipeline mínimo: instalar → lint → test → build.  
  **Justificación:** Calidad automática.  
  **Prioridad:** Must  
  **Criterio de aceptación:** PR muestra checks; si falla, no se puede mergear.  
  **Dependencias:** GitHub Actions.  
  **Riesgos asociados:** Pipelines lentos.

- **ID:** RF-301  
  **Nombre:** Chequeo de enlaces e imágenes  
  **Descripción:** El pipeline deberá verificar enlaces e imágenes para evitar rotos (404) en build-time.  
  **Justificación:** Calidad SEO/UX.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Job falla si detecta referencia a asset inexistente o enlaces críticos rotos.  
  **Dependencias:** Herramienta link-check.  
  **Riesgos asociados:** Falsos positivos.

- **ID:** RF-302  
  **Nombre:** Lighthouse CI con umbrales  
  **Descripción:** El pipeline deberá ejecutar Lighthouse CI (o verificación equivalente) con umbrales mínimos para rendimiento/SEO/accesibilidad.  
  **Justificación:** Control de CWV y calidad.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Se definen umbrales (p. ej. Performance ≥ 80 móvil en staging) y el job falla si no se cumplen.  
  **Dependencias:** Entorno de test.  
  **Riesgos asociados:** Flaky tests; mitigable con retries y condiciones.

- **ID:** RF-303  
  **Nombre:** Artefactos de build y reportes  
  **Descripción:** El pipeline deberá guardar artefactos/reportes relevantes (link-check, Lighthouse) para revisión en PR.  
  **Justificación:** QA eficiente.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Artefactos descargables en el PR.  
  **Dependencias:** GitHub Actions artifacts.  
  **Riesgos asociados:** Tamaño de artefactos.

- **ID:** RF-304  
  **Nombre:** Estrategia de releases  
  **Descripción:** Si el proyecto lo requiere, el repositorio deberá usar tags y un changelog (manual o automático) para releases.  
  **Justificación:** Operación y rollback lógico.  
  **Prioridad:** Could  
  **Criterio de aceptación:** Proceso documentado en `docs/release.md`.  
  **Dependencias:** Equipo.  
  **Riesgos asociados:** Sobrecoste para MVP.

### 12.1 Ejemplo de workflow (orientativo)
```yaml
name: CI
on:
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test --if-present
      - run: npm run build
      - run: npm run link-check
      - run: npm run lhci --if-present
```

---

## 13. Requisitos de Cloudflare (OBLIGATORIO)

- **ID:** RF-400  
  **Nombre:** Cloudflare Pages conectado a GitHub  
  **Descripción:** El sistema deberá desplegarse mediante Cloudflare Pages conectado al repositorio GitHub.  
  **Justificación:** CD simplificado y edge hosting.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Cloudflare Pages muestra builds automáticos al push.  
  **Dependencias:** Cuenta Cloudflare.  
  **Riesgos asociados:** Config incorrecta de build dir.

- **ID:** RF-401  
  **Nombre:** Deploy automático por ramas  
  **Descripción:** El sistema deberá generar preview deploys por PR, staging desde `staging` y producción desde `main`.  
  **Justificación:** Flujo seguro.  
  **Prioridad:** Must  
  **Criterio de aceptación:** PR crea URL preview; push a staging despliega staging; push a main despliega prod.  
  **Dependencias:** Branch strategy.  
  **Riesgos asociados:** Confusión de entornos.

- **ID:** RF-402  
  **Nombre:** Variables de entorno por entorno  
  **Descripción:** Cloudflare Pages deberá tener variables separadas para Preview/Staging/Prod y no exponer secretos.  
  **Justificación:** Seguridad y consistencia.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Variables configuradas y documentadas; no hay secretos en cliente.  
  **Dependencias:** Config Cloudflare.  
  **Riesgos asociados:** Errores de config.

- **ID:** RF-403  
  **Nombre:** Dominio, DNS y redirecciones canónicas  
  **Descripción:** El sistema deberá configurar dominio en Cloudflare, DNS mínimo y redirección `www`↔raíz según preferencia.  
  **Justificación:** SEO y consistencia.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Dominio responde en HTTPS; redirección canónica 301 aplicada.  
  **Dependencias:** DNS en Cloudflare.  
  **Riesgos asociados:** Propagación DNS.

- **ID:** RF-404  
  **Nombre:** HTTPS obligatorio y TLS recomendado  
  **Descripción:** El sistema deberá servir todo el tráfico por HTTPS y usar configuración TLS recomendada; HSTS solo tras validación.  
  **Justificación:** Seguridad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** HTTP redirige a HTTPS; configuración TLS activa.  
  **Dependencias:** Cloudflare SSL.  
  **Riesgos asociados:** HSTS mal aplicado.

- **ID:** RF-405  
  **Nombre:** Headers de seguridad vía `_headers`  
  **Descripción:** El sistema deberá configurar headers de seguridad en Cloudflare Pages con `_headers` (o equivalente).  
  **Justificación:** Seguridad.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Respuestas contienen headers y no rompen AdSense/CMP.  
  **Dependencias:** `_headers` y QA.  
  **Riesgos asociados:** CSP rompe anuncios.

- **ID:** RF-406  
  **Nombre:** Estrategia de caching  
  **Descripción:** El sistema deberá definir caching de assets estáticos con hashing y evitar cache agresivo de HTML si perjudica despliegues/consentimiento.  
  **Justificación:** Rendimiento y control.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Assets cachean largo; HTML controlado; QA valida cambios tras deploy.  
  **Dependencias:** Build output.  
  **Riesgos asociados:** Contenido stale.

- **ID:** RF-407  
  **Nombre:** Rollback rápido  
  **Descripción:** El sistema deberá permitir rollback a un deployment anterior y documentar el procedimiento.  
  **Justificación:** Mitigación de regresiones.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Procedimiento documentado y probado en staging.  
  **Dependencias:** Cloudflare UI.  
  **Riesgos asociados:** Rollback incompleto.

- **ID:** RF-408  
  **Nombre:** Compatibilidad con AdSense y optimizaciones  
  **Descripción:** El sistema deberá documentar y validar cualquier optimización de Cloudflare (p. ej. Rocket Loader) para asegurar que no rompe scripts de AdSense/CMP.  
  **Justificación:** Estabilidad y monetización.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Decisión documentada; QA valida carga de anuncios y consentimiento.  
  **Dependencias:** Config Cloudflare.  
  **Riesgos asociados:** Anuncios no cargan o incumplimiento.

---

## 14. Cumplimiento UE (cookies/consentimiento) con despliegue real (OBLIGATORIO)

- **ID:** RF-500  
  **Nombre:** CMP modular  
  **Descripción:** El sistema deberá integrar una CMP o mecanismo modular que permita gestionar consentimiento sin acoplarse a una única implementación.  
  **Justificación:** Flexibilidad y cumplimiento.  
  **Prioridad:** Should  
  **Criterio de aceptación:** Arquitectura permite cambiar CMP sin refactor masivo; integración documentada.  
  **Dependencias:** CMP elegida.  
  **Riesgos asociados:** Vendor lock-in.

- **ID:** RF-501  
  **Nombre:** Compatibilidad con IAB TCF 2.2 (si aplica)  
  **Descripción:** Si la monetización/ads lo requiere, el sistema deberá ser compatible con IAB TCF 2.2 o equivalente, documentando el motivo.  
  **Justificación:** Requisitos de redes publicitarias.  
  **Prioridad:** Could  
  **Criterio de aceptación:** Documentación de compatibilidad; QA valida señal de consentimiento.  
  **Dependencias:** CMP.  
  **Riesgos asociados:** Complejidad adicional.

- **ID:** RF-502  
  **Nombre:** Auditoría QA de consentimiento  
  **Descripción:** El sistema deberá definir una batería de pruebas QA para consentimiento: primera visita, aceptar, rechazar, configurar, revocar, y verificación de scripts cargados.  
  **Justificación:** Cumplimiento verificable.  
  **Prioridad:** Must  
  **Criterio de aceptación:** Checklist QA ejecutable y evidencias (capturas/logs) en release.  
  **Dependencias:** QA process.  
  **Riesgos asociados:** Fallos en producción.

- **ID:** RNF-503  
  **Nombre:** Minimización de datos  
  **Descripción:** El sistema deberá minimizar datos personales y no recoger información innecesaria para el propósito del sitio.  
  **Justificación:** RGPD (minimización).  
  **Prioridad:** Should  
  **Criterio de aceptación:** Revisión de analítica y cookies; documentación de finalidades.  
  **Dependencias:** Analytics/CMP.  
  **Riesgos asociados:** Riesgo legal.

---

## 15. Riesgos principales + recomendaciones (MVP vs escalable)

### Riesgos
- **Thin content** → mala indexación/monetización: mitigar con plantillas ricas y contenido inicial suficiente.
- **Anuncios degradan CWV**: limitar slots, lazy, medición continua.
- **CSP/CMP mal configurados**: QA en staging con escenarios de consentimiento.
- **Enlaces rotos y assets**: CI link-check obligatorio y revisiones.

### MVP recomendado
- SSG en Cloudflare Pages, sin Workers.
- CMP simple pero correcto.
- Pocas ubicaciones de anuncios y transparencia clara.

### Escalable (futuro)
- Workers para APIs (búsqueda avanzada, moderación, formularios con seguridad).
- Observabilidad avanzada y paneles de errores.
- Automatización de revisión de enlaces externos.

---

# ENTREGABLES EXTRA (OBLIGATORIO)

## 1) Checklist de configuración GitHub
- [ ] Repo creado con `README.md`, `.gitignore`, licencia (si aplica)
- [ ] `main` protegida (PR obligatorio, 1 aprobación, CI obligatorio)
- [ ] `staging` creada y protegida (si se usa)
- [ ] Plantillas de issue + PR
- [ ] `.env` en `.gitignore` + `.env.example` actualizado
- [ ] Dependabot activo
- [ ] (Opcional recomendado) Escaneo de secretos y/o CodeQL

## 2) Checklist de configuración Cloudflare Pages
- [ ] Proyecto Pages conectado a GitHub
- [ ] Build command y output dir correctos
- [ ] Preview Deploy por PR funcionando
- [ ] Staging Deploy desde `staging` funcionando
- [ ] Production Deploy desde `main` funcionando
- [ ] Dominio custom vinculado
- [ ] DNS correcto en Cloudflare
- [ ] HTTPS activo; redirecciones canónicas (`www` ↔ raíz)
- [ ] `_headers` aplicado (CSP compatible con AdSense/CMP)
- [ ] Estrategia de cache revisada
- [ ] Rollback probado/documentado

## 3) Checklist de verificación pre-lanzamiento (UX + legal + AdSense + CWV + enlaces rotos + ads.txt + sitemap/robots)
- [ ] UX móvil: navegación clara, sin CLS notable
- [ ] Accesibilidad básica: labels, foco, contraste
- [ ] Páginas legales: Privacidad/Cookies/Aviso legal/Copyright/Contacto
- [ ] Consentimiento cookies: aceptar/rechazar/configurar/revocar
- [ ] AdSense: anuncios no intrusivos, sin incentivos a clic, separación visual
- [ ] `ads.txt` accesible y correcto (`/ads.txt` 200)
- [ ] `sitemap.xml` y `robots.txt` 200 y válidos
- [ ] Link-check: sin 404 críticos ni imágenes rotas
- [ ] Lighthouse CI: umbrales mínimos cumplidos en staging
- [ ] Revisión de CSP: no rompe AdSense/CMP
