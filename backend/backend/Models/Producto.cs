using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

public class Producto
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Nombre { get; set; } = string.Empty;
    
    [StringLength(1000)]
    public string? Descripcion { get; set; }
    
    [Column(TypeName = "decimal(18,2)")]
    public decimal Precio { get; set; }
    
    public int Stock { get; set; } = 0;
    
    [StringLength(50)]
    public string? Codigo { get; set; }
    
    [StringLength(100)]
    public string? Marca { get; set; }
    
    public bool Activo { get; set; } = true;
    
    public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    
    public DateTime? FechaModificacion { get; set; }
    
    // Relación con subcategoría
    public int SubcategoriaId { get; set; }
    public virtual Subcategoria Subcategoria { get; set; } = null!;
} 