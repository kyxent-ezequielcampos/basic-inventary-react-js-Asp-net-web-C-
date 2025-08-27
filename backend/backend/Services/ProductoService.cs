using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Models.DTOs;

namespace backend.Services;

public class ProductoService : IProductoService
{
    private readonly ApplicationDbContext _context;

    public ProductoService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductoDto>> GetAllAsync()
    {
        return await _context.Productos
            .Include(p => p.Subcategoria)
            .ThenInclude(sc => sc.Categoria)
            .Where(p => p.Activo)
            .Select(p => new ProductoDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock,
                Codigo = p.Codigo,
                Marca = p.Marca,
                Activo = p.Activo,
                FechaCreacion = p.FechaCreacion,
                FechaModificacion = p.FechaModificacion,
                SubcategoriaId = p.SubcategoriaId,
                SubcategoriaNombre = p.Subcategoria.Nombre,
                CategoriaNombre = p.Subcategoria.Categoria.Nombre
            })
            .OrderBy(p => p.CategoriaNombre)
            .ThenBy(p => p.SubcategoriaNombre)
            .ThenBy(p => p.Nombre)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductoDto>> GetBySubcategoriaIdAsync(int subcategoriaId)
    {
        return await _context.Productos
            .Include(p => p.Subcategoria)
            .ThenInclude(sc => sc.Categoria)
            .Where(p => p.SubcategoriaId == subcategoriaId && p.Activo)
            .Select(p => new ProductoDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock,
                Codigo = p.Codigo,
                Marca = p.Marca,
                Activo = p.Activo,
                FechaCreacion = p.FechaCreacion,
                FechaModificacion = p.FechaModificacion,
                SubcategoriaId = p.SubcategoriaId,
                SubcategoriaNombre = p.Subcategoria.Nombre,
                CategoriaNombre = p.Subcategoria.Categoria.Nombre
            })
            .OrderBy(p => p.Nombre)
            .ToListAsync();
    }

    public async Task<IEnumerable<ProductoDto>> GetByCategoriaIdAsync(int categoriaId)
    {
        return await _context.Productos
            .Include(p => p.Subcategoria)
            .ThenInclude(sc => sc.Categoria)
            .Where(p => p.Subcategoria.CategoriaId == categoriaId && p.Activo)
            .Select(p => new ProductoDto
            {
                Id = p.Id,
                Nombre = p.Nombre,
                Descripcion = p.Descripcion,
                Precio = p.Precio,
                Stock = p.Stock,
                Codigo = p.Codigo,
                Marca = p.Marca,
                Activo = p.Activo,
                FechaCreacion = p.FechaCreacion,
                FechaModificacion = p.FechaModificacion,
                SubcategoriaId = p.SubcategoriaId,
                SubcategoriaNombre = p.Subcategoria.Nombre,
                CategoriaNombre = p.Subcategoria.Categoria.Nombre
            })
            .OrderBy(p => p.SubcategoriaNombre)
            .ThenBy(p => p.Nombre)
            .ToListAsync();
    }

    public async Task<ProductoDto?> GetByIdAsync(int id)
    {
        var producto = await _context.Productos
            .Include(p => p.Subcategoria)
            .ThenInclude(sc => sc.Categoria)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (producto == null) return null;

        return new ProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Codigo = producto.Codigo,
            Marca = producto.Marca,
            Activo = producto.Activo,
            FechaCreacion = producto.FechaCreacion,
            FechaModificacion = producto.FechaModificacion,
            SubcategoriaId = producto.SubcategoriaId,
            SubcategoriaNombre = producto.Subcategoria.Nombre,
            CategoriaNombre = producto.Subcategoria.Categoria.Nombre
        };
    }

    public async Task<ProductoDto?> GetByCodigoAsync(string codigo)
    {
        var producto = await _context.Productos
            .Include(p => p.Subcategoria)
            .ThenInclude(sc => sc.Categoria)
            .FirstOrDefaultAsync(p => p.Codigo == codigo && p.Activo);

        if (producto == null) return null;

        return new ProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Codigo = producto.Codigo,
            Marca = producto.Marca,
            Activo = producto.Activo,
            FechaCreacion = producto.FechaCreacion,
            FechaModificacion = producto.FechaModificacion,
            SubcategoriaId = producto.SubcategoriaId,
            SubcategoriaNombre = producto.Subcategoria.Nombre,
            CategoriaNombre = producto.Subcategoria.Categoria.Nombre
        };
    }

    public async Task<ProductoDto> CreateAsync(CreateProductoDto dto)
    {
        // Verificar que la subcategoría existe
        var subcategoria = await _context.Subcategorias
            .Include(sc => sc.Categoria)
            .FirstOrDefaultAsync(sc => sc.Id == dto.SubcategoriaId && sc.Activo);
        
        if (subcategoria == null)
            throw new InvalidOperationException("La subcategoría especificada no existe");

        // Verificar que el código sea único si se proporciona
        if (!string.IsNullOrEmpty(dto.Codigo) && await ExistsByCodigoAsync(dto.Codigo))
            throw new InvalidOperationException("Ya existe un producto con ese código");

        var producto = new Producto
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            Precio = dto.Precio,
            Stock = dto.Stock,
            Codigo = dto.Codigo,
            Marca = dto.Marca,
            SubcategoriaId = dto.SubcategoriaId,
            Activo = true,
            FechaCreacion = DateTime.UtcNow
        };

        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return new ProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Codigo = producto.Codigo,
            Marca = producto.Marca,
            Activo = producto.Activo,
            FechaCreacion = producto.FechaCreacion,
            FechaModificacion = producto.FechaModificacion,
            SubcategoriaId = producto.SubcategoriaId,
            SubcategoriaNombre = subcategoria.Nombre,
            CategoriaNombre = subcategoria.Categoria.Nombre
        };
    }

    public async Task<ProductoDto?> UpdateAsync(int id, UpdateProductoDto dto)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return null;

        // Verificar que la subcategoría existe
        var subcategoria = await _context.Subcategorias
            .Include(sc => sc.Categoria)
            .FirstOrDefaultAsync(sc => sc.Id == dto.SubcategoriaId && sc.Activo);
        
        if (subcategoria == null)
            throw new InvalidOperationException("La subcategoría especificada no existe");

        // Verificar que el código sea único si se cambia
        if (!string.IsNullOrEmpty(dto.Codigo) && dto.Codigo != producto.Codigo && await ExistsByCodigoAsync(dto.Codigo))
            throw new InvalidOperationException("Ya existe un producto con ese código");

        producto.Nombre = dto.Nombre;
        producto.Descripcion = dto.Descripcion;
        producto.Precio = dto.Precio;
        producto.Stock = dto.Stock;
        producto.Codigo = dto.Codigo;
        producto.Marca = dto.Marca;
        producto.Activo = dto.Activo;
        producto.SubcategoriaId = dto.SubcategoriaId;
        producto.FechaModificacion = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return new ProductoDto
        {
            Id = producto.Id,
            Nombre = producto.Nombre,
            Descripcion = producto.Descripcion,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Codigo = producto.Codigo,
            Marca = producto.Marca,
            Activo = producto.Activo,
            FechaCreacion = producto.FechaCreacion,
            FechaModificacion = producto.FechaModificacion,
            SubcategoriaId = producto.SubcategoriaId,
            SubcategoriaNombre = subcategoria.Nombre,
            CategoriaNombre = subcategoria.Categoria.Nombre
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null) return false;

        // Soft delete
        producto.Activo = false;
        producto.FechaModificacion = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Productos.AnyAsync(p => p.Id == id);
    }

    public async Task<bool> ExistsByCodigoAsync(string codigo)
    {
        return await _context.Productos.AnyAsync(p => p.Codigo == codigo && p.Activo);
    }
} 