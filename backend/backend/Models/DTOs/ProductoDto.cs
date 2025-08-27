namespace backend.Models.DTOs;

public class ProductoDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string? Codigo { get; set; }
    public string? Marca { get; set; }
    public bool Activo { get; set; }
    public DateTime FechaCreacion { get; set; }
    public DateTime? FechaModificacion { get; set; }
    public int SubcategoriaId { get; set; }
    public string SubcategoriaNombre { get; set; } = string.Empty;
    public string CategoriaNombre { get; set; } = string.Empty;
}

public class CreateProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string? Codigo { get; set; }
    public string? Marca { get; set; }
    public int SubcategoriaId { get; set; }
}

public class UpdateProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string? Codigo { get; set; }
    public string? Marca { get; set; }
    public bool Activo { get; set; }
    public int SubcategoriaId { get; set; }
} 