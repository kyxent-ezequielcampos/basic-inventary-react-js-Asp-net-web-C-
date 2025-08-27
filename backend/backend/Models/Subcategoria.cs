using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Subcategoria
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Nombre { get; set; } = string.Empty;
    
    [StringLength(500)]
    public string? Descripcion { get; set; }
    
    public bool Activo { get; set; } = true;
    
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    
    // Relación con categoría
    public int CategoriaId { get; set; }
    public virtual Categoria Categoria { get; set; } = null!;
    
    // Relación con productos
    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
} 