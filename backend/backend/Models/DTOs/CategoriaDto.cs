namespace backend.Models.DTOs;

public class CategoriaDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public bool Activo { get; set; }
    public DateTime FechaCreacion { get; set; }
    public int CantidadSubcategorias { get; set; }
}

public class CreateCategoriaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
}

public class UpdateCategoriaDto
{
    public string Nombre { get; set; } = string.Empty;
    public string? Descripcion { get; set; }
    public bool Activo { get; set; }
} 