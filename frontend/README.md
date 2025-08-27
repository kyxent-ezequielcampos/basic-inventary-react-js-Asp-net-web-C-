# Frontend - Sistema de Gestión de Productos

Frontend completo desarrollado en React para la gestión de productos, categorías y subcategorías.

## 🚀 Características

- **React 18** con hooks modernos
- **Bootstrap 5** para diseño responsivo y atractivo
- **React Router DOM** para navegación entre páginas
- **React Hook Form** para formularios validados
- **Axios** para comunicación con la API
- **Hooks personalizados** para gestión de estado
- **Componentes reutilizables** y modulares

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Bootstrap** - Componentes de Bootstrap para React
- **React Router DOM** - Enrutamiento de aplicaciones
- **React Hook Form** - Gestión de formularios
- **Axios** - Cliente HTTP para peticiones a la API

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Navbar.jsx      # Barra de navegación principal
│   ├── CategoryForm.jsx # Formulario de categorías
│   ├── CategoryTable.jsx # Tabla de categorías
│   ├── SubCategoryForm.jsx # Formulario de subcategorías
│   ├── SubCategoryTable.jsx # Tabla de subcategorías
│   ├── ProductForm.jsx # Formulario de productos
│   └── ProductTable.jsx # Tabla de productos
├── hooks/              # Hooks personalizados
│   ├── useCategories.js # Hook para gestión de categorías
│   ├── useSubCategories.js # Hook para gestión de subcategorías
│   └── useProducts.js # Hook para gestión de productos
├── pages/              # Páginas principales
│   ├── HomePage.jsx    # Página de inicio
│   ├── CategoriesPage.jsx # Página de categorías
│   ├── SubCategoriesPage.jsx # Página de subcategorías
│   └── ProductsPage.jsx # Página de productos
├── routes/             # Configuración de rutas
│   └── AppRoutes.jsx   # Sistema de rutas principal
├── services/           # Servicios de API
│   ├── ClientHttp.js   # Cliente HTTP base con Axios
│   ├── CategoryService.js # Servicio de categorías
│   ├── SubCategoryService.js # Servicio de subcategorías
│   └── ProductService.js # Servicio de productos
├── App.jsx             # Componente principal
├── main.jsx            # Punto de entrada
└── App.css             # Estilos personalizados
```

## 🎯 Funcionalidades Implementadas

### 📂 Categorías
- ✅ Listar todas las categorías
- ✅ Crear nueva categoría
- ✅ Editar categoría existente
- ✅ Eliminar categoría (soft delete)
- ✅ Validaciones de formulario
- ✅ Contador de subcategorías

### 📁 Subcategorías
- ✅ Listar todas las subcategorías
- ✅ Crear nueva subcategoría
- ✅ Editar subcategoría existente
- ✅ Eliminar subcategoría (soft delete)
- ✅ Selección de categoría padre
- ✅ Validaciones de formulario
- ✅ Contador de productos

### 📦 Productos
- ✅ Listar todos los productos
- ✅ Crear nuevo producto
- ✅ Editar producto existente
- ✅ Eliminar producto (soft delete)
- ✅ Selección de categoría y subcategoría
- ✅ Búsqueda por código
- ✅ Validaciones de formulario
- ✅ Información completa del producto

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ instalado
- Backend ejecutándose en `http://localhost:5001`

### Pasos de instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**:
   - URL: `http://localhost:5173`

### Scripts disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la construcción

## 🔧 Configuración

### URL de la API
La aplicación está configurada para conectarse al backend en:
```javascript
// src/services/ClientHttp.js
baseURL: 'http://localhost:5001/api'
```

### Variables de entorno
Puedes configurar la URL de la API mediante variables de entorno:
```bash
# .env
VITE_API_URL=http://localhost:5001/api
```

## 📱 Diseño Responsivo

- **Mobile First** - Diseño optimizado para dispositivos móviles
- **Bootstrap 5** - Sistema de grid responsivo
- **Componentes adaptativos** - Tablas y formularios que se adaptan a diferentes pantallas
- **Navegación móvil** - Menú hamburguesa para dispositivos pequeños

## 🎨 Características de UI/UX

- **Diseño moderno** con Bootstrap 5
- **Iconos emoji** para mejor experiencia visual
- **Colores consistentes** y accesibles
- **Animaciones suaves** y transiciones
- **Feedback visual** para todas las acciones
- **Mensajes de error** claros y útiles
- **Confirmaciones** para acciones destructivas

## 🔒 Validaciones

- **Validación en tiempo real** con React Hook Form
- **Validaciones del lado del cliente** para mejor UX
- **Mensajes de error** personalizados y claros
- **Validaciones de longitud** para campos de texto
- **Validaciones de tipo** para campos numéricos
- **Campos requeridos** claramente marcados

## 📊 Estado de la Aplicación

- **Hooks personalizados** para gestión de estado
- **Estado local** para formularios y modales
- **Estado global** para datos de la API
- **Manejo de errores** centralizado
- **Estados de carga** para mejor UX

## 🚨 Manejo de Errores

- **Interceptores de Axios** para errores HTTP
- **Manejo de errores** en cada hook
- **Mensajes de error** amigables para el usuario
- **Fallbacks** para estados de error
- **Logging** de errores en consola

## 🔄 Flujo de Datos

1. **Usuario interactúa** con la interfaz
2. **Componente llama** al hook correspondiente
3. **Hook ejecuta** la función del servicio
4. **Servicio hace** petición HTTP a la API
5. **API responde** con datos o error
6. **Hook actualiza** el estado local
7. **Componente se re-renderiza** con nuevos datos

## 🧪 Pruebas y Testing

Para ejecutar las pruebas (cuando estén implementadas):
```bash
npm test
```

## 📦 Construcción para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/` lista para desplegar.

## 🌐 Despliegue

### Netlify
1. Conectar repositorio
2. Configurar comando de build: `npm run build`
3. Configurar directorio de salida: `dist`

### Vercel
1. Conectar repositorio
2. Configurar framework: Vite
3. Desplegar automáticamente

### Servidor tradicional
1. Ejecutar `npm run build`
2. Subir contenido de `dist/` al servidor
3. Configurar servidor web para SPA

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -am 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🆘 Soporte

Para soporte técnico o preguntas:
- Crear un issue en el repositorio
- Revisar la documentación de la API
- Verificar la configuración del backend
