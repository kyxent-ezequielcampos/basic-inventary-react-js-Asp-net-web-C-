using backend.Models.DTOs;

namespace backend.Services;

public interface IProductoService
{
    Task<IEnumerable<ProductoDto>> GetAllAsync();
    Task<IEnumerable<ProductoDto>> GetBySubcategoriaIdAsync(int subcategoriaId);
    Task<IEnumerable<ProductoDto>> GetByCategoriaIdAsync(int categoriaId);
    Task<ProductoDto?> GetByIdAsync(int id);
    Task<ProductoDto?> GetByCodigoAsync(string codigo);
    Task<ProductoDto> CreateAsync(CreateProductoDto dto);
    Task<ProductoDto?> UpdateAsync(int id, UpdateProductoDto dto);
    Task<bool> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<bool> ExistsByCodigoAsync(string codigo);
} 