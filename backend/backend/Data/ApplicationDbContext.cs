using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Categoria> Categorias { get; set; }
    public DbSet<Subcategoria> Subcategorias { get; set; }
    public DbSet<Producto> Productos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración de Categoria
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Descripcion).HasMaxLength(500);
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            // Índices
            entity.HasIndex(e => e.Nombre).IsUnique();
        });

        // Configuración de Subcategoria
        modelBuilder.Entity<Subcategoria>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Descripcion).HasMaxLength(500);
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            // Relación con Categoria
            entity.HasOne(e => e.Categoria)
                  .WithMany(e => e.Subcategorias)
                  .HasForeignKey(e => e.CategoriaId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            // Índices
            entity.HasIndex(e => new { e.Nombre, e.CategoriaId }).IsUnique();
        });

        // Configuración de Producto
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Descripcion).HasMaxLength(1000);
            entity.Property(e => e.Precio).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Codigo).HasMaxLength(50);
            entity.Property(e => e.Marca).HasMaxLength(100);
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("CURRENT_TIMESTAMP");
            
            // Relación con Subcategoria
            entity.HasOne(e => e.Subcategoria)
                  .WithMany(e => e.Productos)
                  .HasForeignKey(e => e.SubcategoriaId)
                  .OnDelete(DeleteBehavior.Restrict);
            
            // Índices
            entity.HasIndex(e => e.Codigo).IsUnique();
            entity.HasIndex(e => e.Nombre);
        });
    }
} 