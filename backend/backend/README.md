# API de Gestión de Productos

Esta es una API REST completa desarrollada en ASP.NET Core 9.0 para la gestión de productos, categorías y subcategorías.

## Características

- **Arquitectura MVC**: Implementada con ASP.NET Core MVC
- **Base de Datos**: PostgreSQL con Entity Framework Core
- **API REST**: Endpoints completos para CRUD de entidades
- **Validaciones**: Validaciones de modelo y reglas de negocio
- **Soft Delete**: Implementación de eliminación lógica
- **Relaciones**: Gestión de relaciones entre Categoría → Subcategoría → Producto
- **Swagger**: Documentación automática de la API

## Estructura del Proyecto

```
backend/
├── Controllers/          # Controladores API
├── Data/                # Contexto de Entity Framework
├── Models/              # Modelos de dominio y DTOs
├── Services/            # Lógica de negocio
└── Program.cs           # Configuración de la aplicación
```

## Modelos

### Categoría
- Id, Nombre, Descripción, Activo, FechaCreación
- Relación 1:N con Subcategorías

### Subcategoría
- Id, Nombre, Descripción, Activo, FechaCreación, CategoriaId
- Relación N:1 con Categoría
- Relación 1:N con Productos

### Producto
- Id, Nombre, Descripción, Precio, Stock, Código, Marca, Activo, FechaCreación, FechaModificación
- Relación N:1 con Subcategoría

## Endpoints de la API

### Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Obtener todas las categorías |
| GET | `/api/categorias/{id}` | Obtener categoría por ID |
| POST | `/api/categorias` | Crear nueva categoría |
| PUT | `/api/categorias/{id}` | Actualizar categoría |
| DELETE | `/api/categorias/{id}` | Eliminar categoría (soft delete) |

### Subcategorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/subcategorias` | Obtener todas las subcategorías |
| GET | `/api/subcategorias/{id}` | Obtener subcategoría por ID |
| GET | `/api/subcategorias/categoria/{categoriaId}` | Obtener subcategorías por categoría |
| POST | `/api/subcategorias` | Crear nueva subcategoría |
| PUT | `/api/subcategorias/{id}` | Actualizar subcategoría |
| DELETE | `/api/subcategorias/{id}` | Eliminar subcategoría (soft delete) |

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/{id}` | Obtener producto por ID |
| GET | `/api/productos/codigo/{codigo}` | Obtener producto por código |
| GET | `/api/productos/subcategoria/{subcategoriaId}` | Obtener productos por subcategoría |
| GET | `/api/productos/categoria/{categoriaId}` | Obtener productos por categoría |
| POST | `/api/productos` | Crear nuevo producto |
| PUT | `/api/productos/{id}` | Actualizar producto |
| DELETE | `/api/productos/{id}` | Eliminar producto (soft delete) |

## Configuración de Base de Datos

La aplicación está configurada para conectarse a PostgreSQL con los siguientes parámetros:

- **Host**: 172.18.0.3
- **Puerto**: 5432
- **Base de datos**: postgres
- **Usuario**: postgres
- **Contraseña**: example

## Instalación y Ejecución

1. **Restaurar dependencias**:
   ```bash
   dotnet restore
   ```

2. **Compilar el proyecto**:
   ```bash
   dotnet build
   ```

3. **Ejecutar migraciones** (se ejecutan automáticamente al iniciar):
   ```bash
   dotnet ef database update
   ```

4. **Ejecutar la aplicación**:
   ```bash
   dotnet run
   ```

5. **Acceder a Swagger**:
   - URL: https://localhost:7001/swagger
   - HTTP: http://localhost:5000/swagger

## Ejemplos de Uso

### Crear una Categoría
```json
POST /api/categorias
{
  "nombre": "Electrónicos",
  "descripcion": "Productos electrónicos y tecnología"
}
```

### Crear una Subcategoría
```json
POST /api/subcategorias
{
  "nombre": "Smartphones",
  "descripcion": "Teléfonos inteligentes",
  "categoriaId": 1
}
```

### Crear un Producto
```json
POST /api/productos
{
  "nombre": "iPhone 15",
  "descripcion": "Smartphone de Apple con iOS 17",
  "precio": 999.99,
  "stock": 50,
  "codigo": "IPH15-128",
  "marca": "Apple",
  "subcategoriaId": 1
}
```

## Reglas de Negocio

1. **Categorías**: No se pueden eliminar si tienen subcategorías activas
2. **Subcategorías**: No se pueden eliminar si tienen productos activos
3. **Productos**: El código debe ser único en el sistema
4. **Soft Delete**: Todas las entidades implementan eliminación lógica
5. **Validaciones**: Campos requeridos y longitudes máximas definidas

## Tecnologías Utilizadas

- **.NET 9.0**: Framework de desarrollo
- **ASP.NET Core**: Framework web
- **Entity Framework Core**: ORM para base de datos
- **PostgreSQL**: Base de datos relacional
- **Swagger**: Documentación de API
- **CORS**: Soporte para aplicaciones frontend 