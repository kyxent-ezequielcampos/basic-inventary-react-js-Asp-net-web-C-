using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Models.DTOs;

namespace backend.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ApplicationDbContext _context;

    public CategoriaService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CategoriaDto>> GetAllAsync()
    {
        return await _context.Categorias
            .Include(c => c.Subcategorias)
            .Select(c => new CategoriaDto
            {
                Id = c.Id,
                Nombre = c.Nombre,
                Descripcion = c.Descripcion,
                Activo = c.Activo,
                FechaCreacion = c.FechaCreacion,
                CantidadSubcategorias = c.Subcategorias.Count(sc => sc.Activo)
            })
            .Where(c => c.Activo)
            .OrderBy(c => c.Nombre)
            .ToListAsync();
    }

    public async Task<CategoriaDto?> GetByIdAsync(int id)
    {
        var categoria = await _context.Categorias
            .Include(c => c.Subcategorias)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (categoria == null) return null;

        return new CategoriaDto
        {
            Id = categoria.Id,
            Nombre = categoria.Nombre,
            Descripcion = categoria.Descripcion,
            Activo = categoria.Activo,
            FechaCreacion = categoria.FechaCreacion,
            CantidadSubcategorias = categoria.Subcategorias.Count(sc => sc.Activo)
        };
    }

    public async Task<CategoriaDto> CreateAsync(CreateCategoriaDto dto)
    {
        var categoria = new Categoria
        {
            Nombre = dto.Nombre,
            Descripcion = dto.Descripcion,
            Activo = true,
            FechaCreacion = DateTime.UtcNow
        };

        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();

        return new CategoriaDto
        {
            Id = categoria.Id,
            Nombre = categoria.Nombre,
            Descripcion = categoria.Descripcion,
            Activo = categoria.Activo,
            FechaCreacion = categoria.FechaCreacion,
            CantidadSubcategorias = 0
        };
    }

    public async Task<CategoriaDto?> UpdateAsync(int id, UpdateCategoriaDto dto)
    {
        var categoria = await _context.Categorias.FindAsync(id);
        if (categoria == null) return null;

        categoria.Nombre = dto.Nombre;
        categoria.Descripcion = dto.Descripcion;
        categoria.Activo = dto.Activo;

        await _context.SaveChangesAsync();

        return new CategoriaDto
        {
            Id = categoria.Id,
            Nombre = categoria.Nombre,
            Descripcion = categoria.Descripcion,
            Activo = categoria.Activo,
            FechaCreacion = categoria.FechaCreacion,
            CantidadSubcategorias = await _context.Subcategorias.CountAsync(sc => sc.CategoriaId == id && sc.Activo)
        };
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var categoria = await _context.Categorias
            .Include(c => c.Subcategorias)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (categoria == null) return false;

        // Verificar si tiene subcategorías activas
        if (categoria.Subcategorias.Any(sc => sc.Activo))
            return false;

        // Soft delete
        categoria.Activo = false;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        return await _context.Categorias.AnyAsync(c => c.Id == id);
    }
} 