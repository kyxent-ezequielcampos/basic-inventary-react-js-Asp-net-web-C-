using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Models.DTOs;

namespace backend.Services;

public class SubcategoriaService : ISubcategoriaService
{
    private readonly ApplicationDbContext _context;

    public SubcategoriaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<SubcategoriaDto>> GetAllAsync()
    {
        return await _context.Subcategorias
            .Include(sc => sc.Categoria)
            .Include(sc => sc.Productos)
            .Where(sc => sc.Activo)
            .Select(sc => new SubcategoriaDto
            {
                Id = sc.Id,
                Nombre = sc.Nombre,
                Descripcion = sc.Descripcion,
                Activo = sc.Activo,
                FechaCreacion = sc.FechaCreacion,
                CategoriaId = sc.CategoriaId,
                CategoriaNombre = sc.Categoria.Nombre,
                CantidadProductos = sc.Productos.Count(p => p.Activo)
            })
            .OrderBy(sc => sc.CategoriaNombre)
            .ThenBy(sc => sc.Nombre)
            .ToListAsync();
    }

    public async Task<IEnumerable<SubcategoriaDto>> GetByCategoriaIdAsync(int categoriaId)
    {
        return await _context.Subcategorias
            .Include(sc => sc.Categoria)
            .Include(sc => sc.Productos)
            .Where(sc => sc.CategoriaId == categoriaId && sc.Activo)
            .Select(sc => new SubcategoriaDto
            {
                Id = sc.Id,
                Nombre = sc.Nombre,
                Descripcion = sc.Descripcion,
                Activo = sc.Activo,
                FechaCreacion = sc.FechaCreacion,
                CategoriaId = sc.CategoriaId,
                CategoriaNombre = sc.Categoria.Nombre,
                CantidadProductos = sc.Productos.Count(p => p.Activo)
            })
            .OrderBy(sc => sc.Nombre)
            .ToListAsync();
    }

    public async Task<SubcategoriaDto?> GetByIdAsync(int id)
    {
        var subcategoria = await _context.Subcategorias
            .Include(sc => sc.Categoria)
            .Include(sc => sc.Productos)
            .FirstOrDefaultAsync(sc => sc.Id == id);

        if (subcategoria == null) return null;

        return new SubcategoriaDto
        {
            Id = subcategoria.Id,
            Nombre = subcategoria.Nombre,
            Descripcion = subcategoria.Descripcion,
            Activo = subcategoria.Activo,
            FechaCreacion = subcategoria.FechaCreacion,
            CategoriaId = subcategoria.CategoriaId,
            CategoriaNombre = subcategoria.Categoria.Nombre,
            CantidadProductos = subcategoria.Productos.Count(p => p.Activo)
        };
    }

    public async Task<SubcategoriaDto> CreateAsync(CreateSubcategoriaDto dto)
    {
        // Verificar que la categoría existe
        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
        if (categoria == null)
            throw new InvalidOperationException("La categoría especificada no existe");

        var subcategoria = new Subcategoria
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            CategoriaId = dto.CategoriaId,
            Activo = true,
            FechaCreacion = DateTime.UtcNow
        };

        _context.Subcategorias.Add(subcategoria);
        await _context.SaveChangesAsync();

        return new SubcategoriaDto
        {
            Id = subcategoria.Id,
            Nombre = subcategoria.Nombre,
            Descripcion = subcategoria.Descripcion,
            Activo = subcategoria.Activo,
            FechaCreacion = subcategoria.FechaCreacion,
            CategoriaId = subcategoria.CategoriaId,
            CategoriaNombre = categoria.Nombre,
            CantidadProductos = 0
        };
    }

    public async Task<SubcategoriaDto?> UpdateAsync(int id, UpdateSubcategoriaDto dto)
    {
        var subcategoria = await _context.Subcategorias.FindAsync(id);
        if (subcategoria == null) return null;

        // Verificar que la nueva categoría existe
        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
        if (categoria == null)
            throw new InvalidOperationException("La categoría especificada no existe");

        subcategoria.Nombre = dto.Nombre;
        subcategoria.Descripcion = dto.Descripcion;
        subcategoria.Activo = dto.Activo;
        subcategoria.CategoriaId = dto.CategoriaId;

        await _context.SaveChangesAsync();

        return new SubcategoriaDto
        {
            Id = subcategoria.Id,
            Nombre = subcategoria.Nombre,
            Descripcion = subcategoria.Descripcion,
            Activo = subcategoria.Activo,
            FechaCreacion = subcategoria.FechaCreacion,
            CategoriaId = subcategoria.CategoriaId,
            CategoriaNombre = categoria.Nombre,
            CantidadProductos = await _context.Productos.CountAsync(p => p.SubcategoriaId == id && p.Activo)
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var subcategoria = await _context.Subcategorias
            .Include(sc => sc.Productos)
            .FirstOrDefaultAsync(sc => sc.Id == id);

        if (subcategoria == null) return false;

        // Verificar si tiene productos activos
        if (subcategoria.Productos.Any(p => p.Activo))
            return false;

        // Soft delete
        subcategoria.Activo = false;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Subcategorias.AnyAsync(sc => sc.Id == id);
    }
} 