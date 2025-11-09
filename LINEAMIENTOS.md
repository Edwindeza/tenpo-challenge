# 📐 Lineamientos Técnicos

Como Tech Lead, estos son los lineamientos técnicos que deben seguirse en el proyecto:

## 📝 Estándares de Código

### TypeScript
- ✅ Usar `type` en lugar de `interface` (excepto para clases si es necesario)
- ✅ Usar `import type` para imports de tipos
- ✅ Evitar `any`, usar `unknown` si es necesario
- ✅ Tipar todos los parámetros y valores de retorno
- ✅ Usar tipos estrictos, evitar aserciones innecesarias

### Naming Conventions
- ✅ **Componentes**: PascalCase (`PhotoCard`, `LoginForm`)
- ✅ **Hooks**: camelCase con prefijo `use` (`useLogin`, `usePhotoSearch`)
- ✅ **Funciones/Constantes**: camelCase (`getPhotos`, `photoAdapter`)
- ✅ **Tipos**: PascalCase (`Photo`, `LoginCredentials`)
- ✅ **Archivos**: PascalCase para componentes, camelCase para utilidades
- ✅ **Carpetas**: camelCase para módulos, kebab-case para assets

### Estructura de Archivos
- ✅ Un componente por archivo
- ✅ Archivos de barril (`index.ts`) para exportaciones limpias
- ✅ Separar hooks en archivos propios cuando encapsulan lógica compleja
- ✅ Agrupar por feature, no por tipo de archivo

## 🏗️ Arquitectura

### Separación de Responsabilidades
- ✅ **Service**: Lógica de fetch, independiente de React
- ✅ **Adapter**: Transformación de datos API → UI
- ✅ **Hook**: Orquestación con TanStack Query
- ✅ **Component**: Solo UI, recibe props
- ✅ **Container**: Maneja lógica y data fetching, pasa props al componente

### Módulos
- ✅ Cada módulo es autocontenido (components, hooks, services, types)
- ✅ Módulos públicos vs privados claramente separados
- ✅ Infraestructura compartida en `shared/`

## 🎨 Componentes

### Reglas de Componentes
- ✅ Componentes funcionales con hooks
- ✅ Props tipadas con TypeScript
- ✅ Componentes pequeños y enfocados (Single Responsibility)
- ✅ Usar `React.memo` cuando sea necesario para optimización
- ✅ Extraer lógica compleja a custom hooks

### Presentational vs Container
- ✅ **Presentational**: Solo UI, sin lógica, recibe props
- ✅ **Container**: Maneja estado, data fetching, pasa props

## 🔧 Hooks

### Custom Hooks
- ✅ Encapsular lógica compleja en hooks personalizados
- ✅ Un hook por responsabilidad
- ✅ Nombres descriptivos: `useLogin`, `usePhotoSearch`
- ✅ Retornar objetos con propiedades nombradas

### React Hooks Avanzados
- ✅ `useDeferredValue` para búsquedas y filtros
- ✅ `useTransition` para transiciones no bloqueantes
- ✅ `useMemo` y `useCallback` solo cuando sea necesario (no prematuro)

## 🌐 HTTP y Estado del Servidor

### Axios
- ✅ Usar `getHttpClient(baseURL)` para instancias específicas
- ✅ No crear instancias de Axios directamente
- ✅ Los interceptores se aplican automáticamente

### TanStack Query
- ✅ Usar para todo el estado del servidor
- ✅ Query keys descriptivas y consistentes
- ✅ Configurar `staleTime` y `gcTime` apropiadamente
- ✅ No usar `useEffect` para data fetching

## 🎯 Estado Global

### Zustand
- ✅ Usar para estado del cliente (auth, theme, UI)
- ✅ No usar para estado del servidor (usar TanStack Query)
- ✅ Stores pequeños y enfocados
- ✅ Selectores específicos para evitar re-renders

## 🎨 Estilos

### Tailwind CSS
- ✅ Mobile-first approach
- ✅ Usar clases de utilidad, evitar estilos inline cuando sea posible
- ✅ Usar sistema de temas (dark/light)
- ✅ Responsive: `sm:`, `md:`, `lg:` breakpoints

## 🧪 Testing (Próximamente)

### Estrategia
- ✅ Tests unitarios para servicios, adapters, hooks
- ✅ Tests de integración para flujos completos
- ✅ Tests de componentes con React Testing Library
- ✅ Cobertura mínima: 80% para lógica crítica

## 📦 Performance

### Optimizaciones
- ✅ Virtualización para listas grandes (>100 items)
- ✅ `React.memo` con comparación personalizada cuando sea necesario
- ✅ Lazy loading de imágenes (`loading="lazy"`)
- ✅ Code splitting por ruta
- ✅ Evitar re-renders innecesarios

## 🔒 Seguridad

### Rutas
- ✅ Usar `ProtectedRoute` para rutas privadas
- ✅ Usar `PublicRoute` para rutas públicas
- ✅ Verificar autenticación en el store, no en localStorage

### Tokens
- ✅ Almacenar en cookies (no localStorage)
- ✅ Interceptores automáticos para agregar token
- ✅ Manejo de 401 con logout automático

## 📚 Documentación

### Código
- ✅ No agregar comentarios innecesarios (código auto-documentado)
- ✅ Comentarios solo para lógica compleja o decisiones no obvias
- ✅ JSDoc para funciones públicas complejas

### README
- ✅ Mantener actualizado con cambios arquitectónicos
- ✅ Documentar decisiones técnicas importantes
- ✅ Incluir ejemplos de uso cuando sea relevante

## 🔄 Git y Commits

### Commits
- ✅ Mensajes descriptivos y en español
- ✅ Formato: `tipo(scope): descripción breve`
- ✅ Tipos: `feat`, `fix`, `refactor`, `test`, `docs`, `style`
- ✅ Ejemplo: `feat(auth): agregar validación de email en login`

### Branches
- ✅ `main` - Código en producción
- ✅ `develop` - Desarrollo activo
- ✅ Feature branches: `feature/nombre-feature`
- ✅ Hotfix branches: `hotfix/nombre-fix`

## 👥 Code Review

### Checklist
- ✅ Código sigue los lineamientos técnicos
- ✅ Tests pasan y cobertura adecuada
- ✅ No hay console.logs o código comentado
- ✅ TypeScript sin errores
- ✅ Linter sin errores
- ✅ Performance considerada (especialmente en listas)
- ✅ Responsive design verificado

## 🚀 Deployment

### Build
- ✅ `npm run build` debe pasar sin errores
- ✅ Variables de entorno documentadas
- ✅ Optimizaciones de producción habilitadas

---

**Nota**: Estos lineamientos son responsabilidad del Tech Lead y deben ser revisados y actualizados según evolucione el proyecto.

