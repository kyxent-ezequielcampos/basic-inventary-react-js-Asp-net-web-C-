namespace backend.Models.DTOs;

public class SubcategoriaDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public bool Activo { get; set; }
    public DateTime FechaCreacion { get; set; }
    public int CategoriaId { get; set; }
    public string CategoriaNombre { get; set; } = string.Empty;
    public int CantidadProductos { get; set; }
}

public class CreateSubcategoriaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public int CategoriaId { get; set; }
}

public class UpdateSubcategoriaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public bool Activo { get; set; }
    public int CategoriaId { get; set; }
} 