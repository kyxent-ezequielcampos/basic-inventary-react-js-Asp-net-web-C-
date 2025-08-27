using backend.Models.DTOs;

namespace backend.Services;

public interface ICategoriaService
{
    Task<IEnumerable<CategoriaDto>> GetAllAsync();
    Task<CategoriaDto?> GetByIdAsync(int id);
    Task<CategoriaDto> CreateAsync(CreateCategoriaDto dto);
    Task<CategoriaDto?> UpdateAsync(int id, UpdateCategoriaDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
} 