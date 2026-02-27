# PRD — Web monetizable (banners) con GitHub + Cloudflare

**Versión:** 1.0  
**Fecha:** 2026-02-26  
**Idioma:** Español (España)  
**Owner:** Product (PM)  
**Stakeholders:** UX/UI, Dev, QA, Legal/Compliance, Growth/CRO  

---

## 1) Resumen ejecutivo del producto

Se construirá una web **mobile-first**, moderna y rápida, orientada a **tráfico orgánico (SEO)** y **monetización sostenible con banners** (p. ej. AdSense). La web ofrecerá un **directorio y contenido útil** alrededor de GPTs y herramientas relacionadas, con un elemento clave de interfaz: una **caja visible para pegar el enlace a un GPT de ChatGPT** y abrirlo de forma segura.

El producto se desarrollará con un flujo profesional en **GitHub** (ramas, PR, CI, calidad) y se desplegará en **Cloudflare Pages** con **Preview Deployments** por PR, staging y producción. Se incorporarán requisitos de **cumplimiento legal UE/España** (privacidad/cookies/transparencia publicitaria) y objetivos mínimos de **Core Web Vitals**.

---

## 2) Problema que resuelve y propuesta de valor

### Problema
- Encontrar GPTs útiles y fiables suele ser **lento**: enlaces dispersos, baja calidad, falta de contexto.
- Muchas webs monetizadas priorizan anuncios sobre utilidad, generando **rebote** y mala reputación.
- El cumplimiento de cookies/privacidad suele estar mal integrado, con riesgo legal y de monetización.

### Propuesta de valor
- **Directorio curado y explicado**: GPTs clasificados por categorías y casos de uso, con contexto, recomendaciones y guías.
- **Acceso inmediato**: caja para **pegar el enlace del GPT** y abrirlo en 1 clic con validación.
- **Monetización responsable**: banners integrados de forma clara y no intrusiva, sin degradar UX.
- **Rendimiento alto + confianza**: páginas legales visibles, consentimiento cookies correcto, transparencia publicitaria.

---

## 3) Objetivos del negocio y objetivos del usuario

### Objetivos del negocio
1. Generar **tráfico orgánico** estable (SEO) en 60–90 días.
2. Maximizar **retención** (páginas/sesión) y tiempo en página sin tácticas engañosas.
3. Habilitar **monetización por banners** cumpliendo políticas (sin prometer aprobación).
4. Disponer de un pipeline de despliegue seguro (GitHub + Cloudflare) para iterar rápido.

### Objetivos del usuario
1. Encontrar GPTs relevantes por categoría/caso de uso de forma rápida.
2. Entender por qué un GPT es útil (contexto, ejemplos, límites).
3. Abrir un GPT pegando su enlace sin errores.
4. Navegar sin fricción en móvil, con carga rápida y mínima intrusión publicitaria.

---

## 4) Público objetivo / Buyer persona

| Persona | Perfil | Necesidades | Fricciones | Oportunidades |
|---|---|---|---|---|
| Usuario curioso | 16–35, consumo de IA casual | Ideas rápidas, GPTs “top” | Saturación, baja confianza | Listas curadas + guías breves |
| Usuario avanzado | 25–45, trabaja con IA | GPTs por caso de uso, comparativas | Tiempo perdido probando | Filtros, tags, páginas detalladas |
| Creador/autor | Publica GPTs | Difusión de su GPT | Falta de visibilidad | Sección “Enviar GPT”, criterios claros |
| Anunciante indirecto (Ad network) | Requisitos de políticas | Tráfico válido, contenido de valor | Riesgo de incumplimiento | Transparencia + legal + UX |

---

## 5) Casos de uso principales y user journeys

### Casos de uso (top)
1. Explorar categorías (p. ej. Productividad, Idiomas, Programación, Diseño, Estudio).
2. Buscar por palabra clave.
3. Abrir un GPT pegando URL en la caja.
4. Leer una guía (contenido evergreen) y descubrir GPTs relacionados.
5. Guardar/compartir un GPT (enlaces, copy).
6. (Opcional MVP) Enviar sugerencia de GPT vía formulario.

### User Journey 1 — “Quiero abrir un GPT rápido”
1. Entra a Home → ve caja “Pega aquí el enlace de tu GPT”.
2. Pega URL → validación → botón “Abrir GPT”.
3. Se abre en nueva pestaña → mantiene sesión en la web.
4. La web sugiere categorías/recursos relacionados.

### User Journey 2 — “Estoy buscando un GPT para X”
1. Home → buscador → resultados.
2. Filtra por categoría/tag.
3. Abre ficha de GPT (detalle) → lee descripción, ejemplos y advertencias.
4. Clic “Abrir GPT” → nueva pestaña.
5. Continúa explorando otros GPTs/guías.

---

## 6) Funcionalidades del MVP (priorizadas)

> Priorización: **Imprescindible (P0)** / **Recomendable (P1)** / **Futuro (P2)**

| Área | Funcionalidad | Prioridad | Notas / criterio |
|---|---|---:|---|
| Core | Home con propuesta de valor + navegación | P0 | Mobile-first, rápida |
| Core | Caja visible para pegar URL de GPT + botón abrir | P0 | Validación + errores + nueva pestaña |
| Directorio | Listado de GPTs por categorías/tags | P0 | Paginación o lazy loading |
| Directorio | Página detalle de GPT (SEO-friendly) | P0 | Descripción + ejemplos + CTA abrir |
| Contenido | Sección guías/artículos evergreen | P0 | Evitar thin content |
| Legal | Privacidad, Cookies, Aviso legal, Contacto | P0 | En footer + accesibles |
| Consentimiento | Banner/caja de consentimiento cookies (UE) | P0 | No cargar tags no esenciales sin consentimiento (cuando aplique) |
| Monetización | Banners integrados (no intrusivos) | P0 | Separación visual + etiquetado “Publicidad” |
| SEO | Sitemap, robots, metadatos, canonical | P0 | Indexación correcta |
| Rendimiento | Optimización CWV (LCP/CLS/INP) | P0 | Imágenes optimizadas, lazy, caching |
| Analítica | Medición de eventos clave | P0 | Sin trackear clics de anuncios |
| GitHub | Repo, ramas, PR, Actions, dependabot | P0 | Calidad y seguridad |
| Cloudflare | Pages: preview/staging/prod + dominio/SSL | P0 | Rollback + headers |
| Engagement | Newsletter (captación email) | P1 | Doble opt-in recomendado |
| CRO | A/B tests básicos de CTA/orden bloques | P1 | Medir retención |
| UGC | Formulario “Enviar GPT” | P1 | Moderación y políticas |
| Personalización | Favoritos local (sin cuenta) | P2 | LocalStorage |
| Cuenta | Login / perfiles / votos | P2 | Requiere backend/Workers |

---

## 7) Arquitectura de la información (IA)

### Mapa del sitio (propuesto)
- `/` Home
- `/directorio` (listado general)
- `/categoria/{slug}` (categorías)
- `/gpt/{slug}` (detalle GPT)
- `/guias` (blog/guías)
- `/guias/{slug}`
- `/enviar-gpt` (si P1)
- `/sobre-nosotros` (opcional, recomendada)
- `/contacto`
- `/privacidad`
- `/cookies`
- `/aviso-legal`
- `/ads.txt` (si AdSense u otras redes lo requieren)

### Navegación
- Header: Logo, Directorio, Guías, (Enviar GPT), Contacto
- Footer: Legales + Transparencia publicitaria + Contacto + (About)

---

## 8) Estrategia de contenido

### Principios
- **Valor real** por página: explicación + contexto + ejemplos + límites.
- Evitar contenido duplicado o “thin content”.
- Priorizar **evergreen** (temas estables) y clústers (hub & spoke).

### Tipos de contenido
1. **Listas curadas**: “Top GPTs para…”
2. **Guías prácticas**: “Cómo usar GPTs para…”
3. **Páginas de GPT**: ficha con microcopy + ejemplos + “qué no hacer”.

### Microcopy y CTAs
- CTAs claros: “Abrir GPT”, “Ver ejemplos”, “Explorar categoría”
- Mensajes de confianza: “Publicidad”, “Cómo elegimos estos GPTs”, “Aviso legal”

### Orden recomendado de la información (Home)
1. Hero con propuesta de valor + caja de enlace GPT
2. Categorías destacadas
3. GPTs populares / recién añadidos
4. Bloque guía destacada
5. Suscripción/newsletter (P1)
6. Footer legal/transparencia

---

## 9) Requisitos de diseño UX/UI

### Estilo visual
- Elegante, limpio, moderno; tipografía legible; alto contraste.
- Componentes consistentes (cards, chips, botones).
- Espaciado generoso, sin saturación.

### Principios UX
- **1 objetivo por pantalla** (evitar distracciones).
- Navegación evidente, jerarquía visual clara.
- Estados: loading, vacío, error, éxito.
- Accesibilidad: foco visible, navegación teclado, ARIA en formularios.

### Accesibilidad (objetivo)
- WCAG 2.1 AA (objetivo)
- Contraste mínimo recomendado, tamaños de fuente adecuados.
- `alt` en imágenes y etiquetas en inputs.

---

## 10) Requisitos de monetización con banners

### Reglas (monetización responsable)
- Separación visual clara entre anuncios y contenido.
- Etiqueta visible “Publicidad” cuando aplique.
- No usar incentivos a clics, ni layouts engañosos.
- No interrumpir navegación (evitar interstitials agresivos en MVP).
- Mantener una densidad de anuncios moderada.

### Ubicaciones sugeridas (MVP)
- Home:
  - 1 banner entre “Categorías” y “GPTs populares”
  - 1 banner antes del footer (opcional)
- Listados (directorio/categoría):
  - 1 banner cada X tarjetas (p. ej. cada 8–12) en desktop; menos en móvil.
- Detalle GPT:
  - 1 banner después del bloque “Descripción + ejemplos” (no encima del CTA principal)
- Guías:
  - 1 banner después del primer tercio del contenido
  - 1 banner al final (opcional)

> Nota: el número final se ajusta tras medir retención y CWV.

---

## 11) Requisitos técnicos (alto nivel)

### Stack recomendado (asunción)
- **Astro** (SSG) o **Next.js** con export estático si no hay SSR.
- Hosting: **Cloudflare Pages** (estático).
- SSR/API: **No** en MVP (Workers solo si se justifica en fase futura).

### Rendimiento (Core Web Vitals — objetivos)
- LCP ≤ 2.5s (p75)
- CLS ≤ 0.1 (p75)
- INP ≤ 200ms (p75)

### SEO técnico
- HTML semántico, titles/descr únicos, OpenGraph.
- `sitemap.xml` y `robots.txt`.
- Canonical en páginas indexables.
- Estructura de enlaces internos (clústers).

### Responsive
- Mobile-first; breakpoints mínimos (móvil, tablet, desktop).

### Analítica (eventos clave)
- `gpt_url_submit` (submit caja)
- `gpt_url_invalid` (validación fallida)
- `gpt_open_click` (clic abrir)
- `category_click`
- `search_submit`
- `gpt_card_click`
- `guide_read_depth` (25/50/75/100)
- `newsletter_signup` (si P1)

> Importante: no trackear clics de anuncios (políticas).

### Seguridad (básico)
- Sanitizar inputs (URL GPT).
- CSP compatible con banners y consentimiento.
- Headers: `X-Content-Type-Options`, `Referrer-Policy`, etc.

---

## 12) Requisitos legales y de confianza (UE/España)

### Páginas mínimas (MVP)
- Política de privacidad
- Política de cookies
- Aviso legal
- Contacto
- (Opcional recomendado) Sobre nosotros
- (Opcional) Términos

### Consentimiento cookies
- Mecanismo de consentimiento claro (aceptar/rechazar/configurar).
- Bloqueo previo de tags no esenciales cuando aplique (EEA/UE).
- Posibilidad de cambiar consentimiento (en footer).

### Transparencia publicitaria
- Aviso de publicidad y explicación (p. ej. “Esta web se financia con anuncios…”).
- Separación visual clara de anuncios.

### Copyright / trazabilidad
- Solo usar imágenes con licencia válida.
- Registrar origen/licencia en `docs/assets-licenses.md` (recomendado).
- Proceso de retirada por reclamación.

---

## 13) KPIs y métricas de éxito

| KPI | Definición | Objetivo inicial (MVP) | Fuente |
|---|---|---:|---|
| Usuarios orgánicos | Sesiones desde buscadores | + crecimiento semana a semana | Analytics |
| Bounce rate | Rebote (según herramienta) | ↓ respecto baseline | Analytics |
| Páginas/sesión | Engagement | ≥ 1.6 (inicio) | Analytics |
| Tiempo medio | Engagement | ≥ 60–90s en guías | Analytics |
| CTR interno | Clics en “Abrir GPT” / visitas | ≥ 8–15% (depende de tráfico) | Eventos |
| CWV | p75 LCP/CLS/INP | Cumplir objetivos | Lighthouse/CrUX |
| RPM/Ingresos | Según red publicitaria | Estimar tras tráfico | Ad platform |
| Indexación | URLs indexadas | Creciente, sin errores | Search Console |

---

## 14) Riesgos y errores comunes a evitar

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Thin content / baja calidad | SEO y monetización | Guías útiles, fichas completas, curación real |
| UX dañada por anuncios | Rebote, mala reputación | Límites de slots, test A/B, claridad “Publicidad” |
| Incumplimiento cookies/privacidad | Riesgo legal y de monetización | CMP, bloqueo previo, legales accesibles |
| Scripts de banners rompen rendimiento | CWV | Lazy, control scripts, test en móvil |
| Enlaces rotos (GPT/recursos) | Confianza | Validación + revisión periódica + 404 friendly |
| Cambios de políticas (ads/cookies) | Bloqueos | Checklist y revisión trimestral |

---

## 15) Roadmap por fases

### Fase 1 — MVP (0–4 semanas)
- Home + directorio + detalle GPT + guías base
- Caja de enlace GPT (validación + abrir)
- Legales + consentimiento cookies
- Integración banners (mínimo)
- SEO técnico básico
- GitHub Actions + Cloudflare Pages (preview/staging/prod)

### Fase 2 — Optimización UX/CRO (4–8 semanas)
- Mejoras de navegación y filtros
- A/B tests de orden de bloques/CTAs
- Newsletter (P1)
- Mejoras CWV, caching y assets

### Fase 3 — Escalado (8–16 semanas)
- Enviar GPT + moderación
- Favoritos local
- Posible Workers para features (búsqueda avanzada / API)
- Programas de afiliación (si aplica) sin degradar confianza

---

## 16) Criterios de aceptación del producto (checklist)

- [ ] La web carga en móvil con buena legibilidad y navegación clara.
- [ ] La caja de URL GPT valida formato, muestra errores claros y abre en nueva pestaña.
- [ ] Directorio y detalle GPT existen y son indexables (SEO).
- [ ] Páginas legales accesibles desde footer en todas las páginas.
- [ ] Consentimiento cookies funciona y bloquea tags no esenciales cuando aplique.
- [ ] Banners se muestran sin confundir con contenido y sin interrumpir navegación.
- [ ] `sitemap.xml` y `robots.txt` presentes.
- [ ] Objetivos mínimos de Lighthouse en móvil (rendimiento/SEO/accesibilidad) definidos y medidos.
- [ ] Repo GitHub con PR + CI obligatorio, sin secretos comprometidos.
- [ ] Cloudflare Pages configurado con preview/staging/prod y dominio en HTTPS.

---

## 17) Backlog inicial (priorizado)

| Prioridad | Épica | Tareas |
|---:|---|---|
| P0 | Setup | Repo, Astro/Next, lint/format, estructura base |
| P0 | Core UX | Home + hero + caja URL GPT + validación + abrir |
| P0 | Directorio | Categorías + listado + cards + paginación |
| P0 | Detalle GPT | Plantilla SEO + CTA + ejemplos + disclaimers |
| P0 | Contenido | Plantilla guías + 5–10 guías iniciales |
| P0 | Legal | Privacidad, cookies, aviso legal, contacto |
| P0 | Consentimiento | CMP/consent banner + bloqueo scripts no esenciales |
| P0 | Ads | Integración banners + slots + etiquetado |
| P0 | SEO | Sitemap, robots, canonical, OG, schema básico |
| P0 | Performance | Imágenes optimizadas, lazy, caching, bundle |
| P0 | CI/CD | GH Actions + checks + preview/staging/prod |
| P1 | CRO | Heatmaps/scroll, A/B tests, microcopy |
| P1 | Newsletter | Captación, doble opt-in, eventos |
| P1 | Enviar GPT | Formulario + cola moderación |
| P2 | Personalización | Favoritos local + historial |
| P2 | Backend | Workers para features avanzadas |

---

## 18) Sugerencias de tests A/B (CRO)

1. **Hero**: “Directorio de GPTs” vs “Encuentra el GPT perfecto”
2. **CTA**: “Abrir GPT” vs “Probar ahora”
3. **Orden Home**: categorías arriba vs GPTs populares arriba
4. **Detalle GPT**: ejemplos arriba vs descripción arriba
5. **Densidad de anuncios**: 1 vs 2 slots en guías (medir rebote/CWV)
6. **Microcopy consentimiento**: texto corto vs explicativo (medir opt-in sin dark patterns)

---

# SECCIÓN OBLIGATORIA — GitHub (Workflow + Calidad + Seguridad)

## A) Estructura recomendada del repositorio
```
/
  README.md
  LICENSE (si aplica)
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md (opcional)
  .env.example
  docs/
    architecture.md
    deployment.md
    assets-licenses.md
  public/ (o assets/)
  src/
  .github/
    workflows/
    ISSUE_TEMPLATE/
    PULL_REQUEST_TEMPLATE.md
```

## B) Convenciones y control de cambios
- Commits: **Conventional Commits** (feat/fix/chore/docs/refactor/test).
- Ramas:
  - `main` → producción
  - `staging` → preproducción (recomendado)
  - `feature/*`, `fix/*`
- Branch protection (`main` y `staging`):
  - PR obligatorio
  - 1 aprobación mínima
  - Checks obligatorios (CI verde)
  - Bloqueo de push directo

## C) CI con GitHub Actions (mínimo)
- En Pull Request:
  - install → lint → test → build
  - link-check (404, rutas de assets)
  - Lighthouse CI (umbral mínimo)
  - auditoría dependencias + Dependabot
- Gate de calidad: no merge si falla CI.
- Recomendado: CodeQL (JS/TS) si aplica.

---

# SECCIÓN OBLIGATORIA — Cloudflare (Pages/DNS/SSL/Headers/Redirects)

## A) Cloudflare Pages: configuración
- Conectar repo GitHub a Cloudflare Pages.
- Deploy:
  - PR → Preview Deploy (URL por PR)
  - `staging` → Staging Deploy
  - `main` → Production Deploy
- Rollback: documentar procedimiento y validación post-rollback.

## B) Variables de entorno y secretos
- Variables separadas por entorno (Preview/Staging/Prod).
- No exponer secretos en cliente; si hubiera secretos reales, usar Workers (fase futura) o servicios externos.

## C) Dominio, DNS y SSL/TLS
- Configurar dominio custom.
- Definir canónica: `https://tu-dominio.com` (o `www`) + redirección.
- HTTPS obligatorio; TLS recomendado.
- HSTS: activar tras validar (cuidado con preload).

## D) Seguridad y performance en el edge
- Headers recomendados (ajustar CSP por banners/CMP):
  - `Content-Security-Policy` (compatible con scripts de monetización)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: SAMEORIGIN` (o `frame-ancestors` en CSP)
- Cache:
  - Assets con hash → cache largo
  - HTML → cache corto o controlado (depende del stack)
- Optimización automática:
  - Rocket Loader: **solo** si pasa QA y no rompe scripts (documentar).

## E) Archivos de plataforma
- `_headers` y `_redirects` si aplica.
- `sitemap.xml`, `robots.txt`.

---

# SECCIÓN OBLIGATORIA — Legal + Consentimiento (UE) + Publicidad

- Legales en footer y accesibles.
- Consentimiento cookies:
  - aceptar/rechazar/configurar
  - bloqueo previo de tags no esenciales cuando aplique
  - revocación/cambio accesible
- Transparencia publicitaria:
  - etiqueta “Publicidad”
  - explicación breve en una sección o página
- Trazabilidad de assets y procedimiento de retirada por copyright.

---

# AÑADIDO FINAL (OBLIGATORIO)

## A) Wireframe textual de la Home (orden de bloques)
1. Header (logo + nav)
2. Hero:
   - H1 claro + subtítulo
   - Caja URL GPT + botón “Abrir GPT”
   - Mensaje de ayuda (ejemplo de URL) + feedback de error
3. Categorías destacadas (chips/cards)
4. Banner publicitario (slot 1) — claramente separado
5. GPTs populares (cards)
6. Guía destacada / “Empieza por aquí”
7. (P1) Newsletter
8. Banner publicitario (slot 2 opcional)
9. Footer (legales + transparencia + contacto + cambiar cookies)

## B) Propuesta de estructura de navegación
- Directorio
- Categorías (dropdown)
- Guías
- (P1) Enviar GPT
- Contacto

## C) Propuesta de ubicación de banners (desktop + móvil)
- Desktop:
  - Home: 1–2 slots
  - Listados: 1 slot cada 8–12 cards
  - Detalle GPT: 1 slot tras ejemplos
  - Guías: 1 slot tras primer tercio + 1 al final (opcional)
- Móvil:
  - Reducir densidad: máximo 1 slot principal por página (y 1 adicional solo si no afecta UX/CWV)

## D) Checklist final de lanzamiento (GitHub + Cloudflare + Legal/Ads)

### Checklist GitHub
- [ ] Branch protection en `main` (y `staging`)
- [ ] PR template + issue templates
- [ ] Actions: lint/test/build/link-check/Lighthouse OK
- [ ] Dependabot activo
- [ ] Sin secretos en el repo (`.env` no commiteado; existe `.env.example`)

### Checklist Cloudflare
- [ ] Preview Deploy por PR OK
- [ ] Staging Deploy OK (`staging`)
- [ ] Production Deploy OK (`main`)
- [ ] Dominio + DNS correctamente configurados
- [ ] HTTPS activo
- [ ] Redirect `www` ↔ raíz aplicado
- [ ] Headers de seguridad activos (CSP compatible con banners/CMP)
- [ ] Estrategia de cache revisada

### Checklist Legal/Ads
- [ ] Privacidad/Cookies/Aviso legal/Contacto accesibles
- [ ] Consentimiento cookies funciona (bloqueo previo cuando aplique)
- [ ] Transparencia publicitaria visible
- [ ] Contenido suficiente y de valor (no thin content)
- [ ] CWV medidos en móvil y aceptables
- [ ] (Si aplica) `ads.txt` publicado en `/ads.txt`
