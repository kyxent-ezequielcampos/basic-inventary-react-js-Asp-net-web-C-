using backend.Models.DTOs;

namespace backend.Services;

public interface ISubcategoriaService
{
    Task<IEnumerable<SubcategoriaDto>> GetAllAsync();
    Task<IEnumerable<SubcategoriaDto>> GetByCategoriaIdAsync(int categoriaId);
    Task<SubcategoriaDto?> GetByIdAsync(int id);
    Task<SubcategoriaDto> CreateAsync(CreateSubcategoriaDto dto);
    Task<SubcategoriaDto?> UpdateAsync(int id, UpdateSubcategoriaDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
} 