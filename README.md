# Tenpo Challenge - Frontend

## 📋 Desafío

Challenge Frontend - Tenpo

Se requiere crear una aplicación en un repositorio personal que haga lo siguiente:

### Funcionalidades Requeridas:

- **Pantalla de login** (correo y pass) y hacer un **fake-login** (código 200-OK + token-fake)
- **Home** que se conecte con una **API pública** (a elección) y muestre una **lista de 2000 elementos**
- **Botón de logout** que devuelva al login y **limpie la sesión**

### Requisitos Técnicos:

- **React con TypeScript** que sea **responsiva (web y mobile)**

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 22+
- npm o yarn

### Pasos para ejecutar el proyecto

- **Clonar el repositorio** (si aplica):
  ```bash
  git clone https://github.com/Edwindeza/tenpo-challenge
  cd tenpo-front-challenge
  ```

- **Instalar dependencias**:
  ```bash
  npm install
  ```

- **Configurar variables de entorno**:
  
  Copia el archivo `.env.example` a `.env`:
  ```bash
  cp .env.example .env
  ```
  
  Edita el archivo `.env` con tus configuraciones:
  ```env
  # API Configuration
  VITE_API_BASE_URL=
  VITE_API_PHOTOS_URL=https://jsonplaceholder.typicode.com/photos
  ```

- **Ejecutar en modo desarrollo**:
  ```bash
  npm run dev
  ```
  
  La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

- **Compilar para producción**:
  ```bash
  npm run build
  ```

- **Previsualizar build de producción**:
  ```bash
  npm run preview
  ```

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter
- `npm run test` - Ejecuta los tests en modo watch
- `npm run test:ui` - Ejecuta los tests con interfaz gráfica
- `npm run test:coverage` - Ejecuta los tests con reporte de cobertura

---

## 🛠️ Stack Tecnológico

- **React 19** con **TypeScript**
- **Vite** - Build tool y dev server
- **React Router v7** - Routing y navegación
- **Axios** - Cliente HTTP con interceptores
- **TanStack Query** - Manejo de estado del servidor y cache
- **TanStack Virtual** - Virtualización de listas para rendimiento
- **Zustand** - Estado global del cliente (auth, theme, UI)
- **Tailwind CSS v4** - Estilos utility-first y sistema de temas
- **React Hooks avanzados** - `useDeferredValue`, `useTransition`, `useActionState`

---

## 🏗️ Arquitectura

### Principios de Diseño

- **Modular**: Cada módulo es independiente y autocontenido
- **Separación de Contextos**: 
  - **Contexto Público**: Módulos sin autenticación (login)
  - **Contexto Privado**: Módulos con autenticación (home)
- **Arquitectura en Capas**: Service → Adapter → Hook → Component
- **Infraestructura Compartida**: HTTP client, storage, stores centralizados

### Estructura del Proyecto

```
src/
├── modules/              # Módulos de la aplicación
│   ├── auth/            # Módulo público (login)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── home/            # Módulo privado (fotos)
│       ├── components/
│       ├── containers/
│       ├── hooks/
│       ├── queries/
│       ├── services/
│       └── types/
├── shared/              # Código compartido
│   ├── components/      # Componentes reutilizables
│   ├── infrastructure/  # Infraestructura
│   │   ├── http/        # Axios con singleton por URL
│   │   ├── storage/     # Cookie storage para tokens
│   │   ├── store/       # Zustand stores
│   │   └── query/       # TanStack Query client
│   ├── layouts/         # Layouts públicos y privados
│   ├── routing/         # Sistema de routing con protección
│   └── types/           # Tipos compartidos
└── styles/              # Estilos globales y temas
```

---

## ✨ Características Implementadas

### Autenticación
- ✅ Login con fake API (200 OK + token)
- ✅ Token almacenado en cookies (1 día de expiración)
- ✅ Interceptores Axios para agregar token automáticamente
- ✅ Manejo de errores 401 con logout automático
- ✅ Rutas protegidas con `ProtectedRoute`
- ✅ Rutas públicas con `PublicRoute` (redirige si ya está autenticado)

### Home - Lista de Fotos
- ✅ Lista virtualizada de 2000 elementos con `@tanstack/react-virtual`
- ✅ Búsqueda por título y número de álbum con `useDeferredValue`
- ✅ Cache inteligente con TanStack Query
- ✅ Scroll al inicio al buscar
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Imágenes optimizadas con Picsum Photos (300 IDs únicos, luego repetidos)

### Rendimiento
- ✅ Virtualización de listas (solo renderiza elementos visibles)
- ✅ Memoización de componentes (`React.memo`, `useMemo`)
- ✅ `useDeferredValue` para búsqueda sin bloquear UI
- ✅ `useTransition` para transiciones suaves
- ✅ Optimización de imágenes (`loading="lazy"`, `fetchPriority="low"`)

### UI/UX
- ✅ Sistema de temas (dark/light) con Tailwind CSS
- ✅ Diseño responsive mobile-first
- ✅ Componentes reutilizables (Button, Input, LoadingSpinner, ErrorMessage)
- ✅ Skeleton loading states
- ✅ Manejo de errores con mensajes claros

### Accesibilidad (a11y)
- ✅ Navegación por teclado en formularios
- ✅ Etiquetas semánticas HTML (`<form>`, `<button>`, `<input>`)
- ✅ Textos alternativos en imágenes (`alt`)
- ✅ Contraste de colores adecuado (WCAG AA)
- ✅ Focus visible en elementos interactivos
- ✅ Mensajes de error asociados a campos de formulario
- ✅ Estructura semántica de encabezados (h1, h2)
- ✅ Estados de carga anunciados visualmente

---

## 🎯 Decisiones Arquitectónicas Principales

### Singleton de Axios por URL
- **Problema**: Múltiples instancias de Axios innecesarias conforme el proyecto escala
- **Solución**: Patrón singleton que crea instancias por `baseURL` y Configuración de HEADERS
- **Beneficio**: Reutilización, interceptores centralizados, mejor rendimiento

### Arquitectura en Capas (Service → Adapter → Hook)
- **Service**: Lógica de fetch, independiente de React
- **Adapter**: Transforma datos de API a tipos de UI
- **Hook**: Orquesta Service + Adapter con TanStack Query
- **Beneficio**: Separación de responsabilidades, testeable, reutilizable

### Virtualización de Listas
- **Problema**: Renderizar 2000 elementos impacta el rendimiento
- **Solución**: `@tanstack/react-virtual` renderiza solo elementos visibles
- **Beneficio**: Scroll fluido incluso con miles de elementos

### Zustand vs Context API
- **Decisión**: Zustand para estado global
- **Razón**: Más ligero, no necesita Provider, mejor rendimiento
- **Uso**: Auth, theme, UI state

### TanStack Query para Estado del Servidor
- **Decisión**: TanStack Query en lugar de useState + useEffect
- **Razón**: Cache automático, integridad referencial, deduplicación de requests
- **Beneficio**: Menos código, mejor UX, menos requests al servidor

### Cookies para Persistencia de Token
- **Decisión**: Cookies en lugar de localStorage/sessionStorage
- **Razón**: Expiración automática (1 día), más seguro (SameSite=Strict)
- **Beneficio**: Mejor manejo de sesiones

### Seguridad de Rutas con HOCs
- **Problema**: Prevenir acceso no autorizado a rutas privadas y redirigir usuarios autenticados desde rutas públicas
- **Solución**: HOCs `ProtectedRoute` y `PublicRoute` que verifican estado de autenticación
- **Implementación**: 
  - `ProtectedRoute`: Verifica `isAuthenticated` del store, redirige a login si no hay sesión
  - `PublicRoute`: Redirige a home si ya hay sesión activa
- **Beneficio**: Seguridad a nivel de routing, UX mejorada, código centralizado y reutilizable

---

## 🎨 Patrones de Diseño Implementados

### Container/Presentational Pattern
- **Container**: `PhotoListContainer` - Maneja lógica, estado y data fetching
- **Presentational**: `PhotoList` - Solo renderiza UI, recibe props
- **Beneficio**: Separación de lógica y presentación, componentes más testeables y reutilizables

### Page Pattern
- **Implementación**: `LoginPage` - Componente de nivel de página que agrupa contenido estático y componentes
- **Uso**: Contiene título, subtítulo, hints y renderiza el componente de formulario
- **Beneficio**: Organización clara, fácil agregar contenido estático sin tocar lógica

### Encapsulación de Hooks
- **Hooks personalizados**: `useLogin`, `usePhotoSearch`, `useVirtualizedList`, `useSearchBar`
- **Encapsulación**: Cada hook encapsula su propia lógica y estado
- **Ejemplo**: `useSearchBar` maneja `searchTerm`, `isPending` y `handleChange` internamente
- **Beneficio**: Lógica reutilizable, componentes más limpios, fácil de testear

### Service → Adapter → Hook Pattern
- **Service**: Lógica de fetch independiente de React (`photoService`, `authService`)
- **Adapter**: Transforma datos de API a tipos de UI (`photoAdapter`)
- **Hook**: Orquesta Service + Adapter con TanStack Query (`usePhotos`)
- **Beneficio**: Separación de responsabilidades, testeable, desacoplamiento API/UI

### Singleton Pattern
- **Implementación**: `httpClient` - Instancias de Axios por `baseURL`
- **Uso**: `getAxiosInstance(baseURL)` crea o reutiliza instancia existente
- **Beneficio**: Evita múltiples instancias innecesarias, interceptores centralizados

### HOC Pattern (Higher-Order Components)
- **Implementación**: `ProtectedRoute`, `PublicRoute`
- **Uso**: Envuelven componentes para agregar lógica de protección de rutas
- **Beneficio**: Reutilización de lógica, composición de componentes

### Memoization Pattern
- **Implementación**: `React.memo` en `PhotoCard`, `VirtualRow`
- **Uso**: Comparación personalizada de props para evitar re-renders innecesarios
- **Beneficio**: Mejor rendimiento, especialmente en listas grandes

### Custom Hooks Pattern
- **Encapsulación**: Lógica compleja en hooks reutilizables
- **Ejemplos**: 
  - `useLogin`: Maneja estado de formulario, validación, submit
  - `usePhotoSearch`: Filtrado con `useDeferredValue`
  - `useVirtualizedList`: Toda la lógica de virtualización
- **Beneficio**: Separación de concerns, código más limpio, fácil de testear

---

## 🔐 Credenciales de Prueba

Para facilitar las pruebas, el formulario de login viene prellenado con:

- **Email**: `admin@tenpo.com`
- **Password**: `123456`

---

## 📝 Notas Adicionales

- El token es fake y se genera automáticamente en el login
- Las imágenes se generan dinámicamente usando Picsum Photos ya que el API original no trae imágenes válidas
- El proyecto usa TypeScript estricto con `type` en lugar de `interface` (excepto para clases si llegásemos a necesitar, por ejemplo en servicios)
- Todos los componentes están optimizados para rendimiento
- La arquitectura está diseñada para escalar fácilmente con nuevos módulos

---

## 📐 Modelo de Lineamientos Técnicos

Como parte de este challenge, cree un documento de lineamientos técnicos

📄 **[Ver Lineamientos Técnicos](./LINEAMIENTOS.md)**

Este documento es un ejemplo de algunos lineamientos que daría:
- Estándares de código (TypeScript, naming, estructura)
- Arquitectura y separación de responsabilidades
- Reglas para componentes, hooks y estado
- Convenciones de Git y Code Review
- Checklist de deployment

---

## 🧪 Tests

Estrategia de testing implementada para garantizar la calidad y confiabilidad del código

### Estrategia de Testing

- **Tests unitarios**: Para servicios, adapters y hooks personalizados ✅
- **Tests de componentes**: Con React Testing Library para componentes UI ✅
- **Cobertura mínima**: 80% para lógica crítica (servicios, hooks, adapters)

### Herramientas Utilizadas

- **Vitest** - Test runner rápido compatible con Vite
- **React Testing Library** - Testing de componentes centrado en el usuario
- **@testing-library/user-event** - Simulación de interacciones del usuario
- **happy-dom** - Entorno DOM ligero para tests

### Tests Implementados

**Tests Unitarios:**
- **Servicios**: 
  - `authService.test.ts` - Tests para login y logout (5 tests)
  - `photoService.test.ts` - Tests para obtención de fotos (4 tests)
- **Adapters**: 
  - `photoAdapter.test.ts` - Tests para transformación de datos (7 tests)
- **Hooks**: 
  - `usePhotoSearch.test.ts` - Tests para búsqueda y filtrado (10 tests)

**Tests de Componentes:**
- `Button.test.tsx` - Tests para componente Button (11 tests)
- `Input.test.tsx` - Tests para componente Input (11 tests)
- `ProtectedRoute.test.tsx` - Tests para protección de rutas (3 tests)

**Total: 51 tests pasando**

**Tests de Integración (Pendientes):**
- Flujo completo de login (formulario → servicio → store → navegación)
- Flujo completo de logout (botón → limpieza de store → redirección)
- Flujo completo de búsqueda (input → filtrado → renderizado de resultados)

### Ejecutar Tests

```bash
# Ejecutar tests en modo watch
npm run test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests con cobertura
npm run test:coverage
```

---

