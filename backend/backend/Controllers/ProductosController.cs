using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly IProductoService _productoService;

    public ProductosController(IProductoService productoService)
    {
        _productoService = productoService;
    }

    // GET: api/productos
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductoDto>>> GetProductos()
    {
        try
        {
            var productos = await _productoService.GetAllAsync();
            return Ok(productos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/productos/subcategoria/5
    [HttpGet("subcategoria/{subcategoriaId}")]
    public async Task<ActionResult<IEnumerable<ProductoDto>>> GetProductosBySubcategoria(int subcategoriaId)
    {
        try
        {
            var productos = await _productoService.GetBySubcategoriaIdAsync(subcategoriaId);
            return Ok(productos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/productos/categoria/5
    [HttpGet("categoria/{categoriaId}")]
    public async Task<ActionResult<IEnumerable<ProductoDto>>> GetProductosByCategoria(int categoriaId)
    {
        try
        {
            var productos = await _productoService.GetByCategoriaIdAsync(categoriaId);
            return Ok(productos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/productos/codigo/ABC123
    [HttpGet("codigo/{codigo}")]
    public async Task<ActionResult<ProductoDto>> GetProductoByCodigo(string codigo)
    {
        try
        {
            var producto = await _productoService.GetByCodigoAsync(codigo);
            if (producto == null)
            {
                return NotFound(new { message = "Producto no encontrado" });
            }

            return Ok(producto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/productos/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductoDto>> GetProducto(int id)
    {
        try
        {
            var producto = await _productoService.GetByIdAsync(id);
            if (producto == null)
            {
                return NotFound(new { message = "Producto no encontrado" });
            }

            return Ok(producto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // POST: api/productos
    [HttpPost]
    public async Task<ActionResult<ProductoDto>> CreateProducto(CreateProductoDto createProductoDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producto = await _productoService.CreateAsync(createProductoDto);
            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // PUT: api/productos/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProducto(int id, UpdateProductoDto updateProductoDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var producto = await _productoService.UpdateAsync(id, updateProductoDto);
            if (producto == null)
            {
                return NotFound(new { message = "Producto no encontrado" });
            }

            return Ok(producto);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // DELETE: api/productos/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProducto(int id)
    {
        try
        {
            var result = await _productoService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest(new { message = "No se pudo eliminar el producto" });
            }

            return Ok(new { message = "Producto eliminado exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }
} 