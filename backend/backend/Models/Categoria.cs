using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class Categoria
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Nombre { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Descripcion { get; set; }
    
    public bool Activo { get; set; } = true;
    
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    
    // Relación con subcategorías
    public virtual ICollection<Subcategoria> Subcategorias { get; set; } = new List<Subcategoria>();
} 