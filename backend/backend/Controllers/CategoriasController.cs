using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriaService _categoriaService;

    public CategoriasController(ICategoriaService categoriaService)
    {
        _categoriaService = categoriaService;
    }

    // GET: api/categorias
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoriaDto>>> GetCategorias()
    {
        try
        {
            var categorias = await _categoriaService.GetAllAsync();
            return Ok(categorias);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/categorias/5
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoriaDto>> GetCategoria(int id)
    {
        try
        {
            var categoria = await _categoriaService.GetByIdAsync(id);
            if (categoria == null)
            {
                return NotFound(new { message = "Categoría no encontrada" });
            }

            return Ok(categoria);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // POST: api/categorias
    [HttpPost]
    public async Task<ActionResult<CategoriaDto>> CreateCategoria(CreateCategoriaDto createCategoriaDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoria = await _categoriaService.CreateAsync(createCategoriaDto);
            return CreatedAtAction(nameof(GetCategoria), new { id = categoria.Id }, categoria);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // PUT: api/categorias/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategoria(int id, UpdateCategoriaDto updateCategoriaDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var categoria = await _categoriaService.UpdateAsync(id, updateCategoriaDto);
            if (categoria == null)
            {
                return NotFound(new { message = "Categoría no encontrada" });
            }

            return Ok(categoria);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // DELETE: api/categorias/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategoria(int id)
    {
        try
        {
            var result = await _categoriaService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest(new { message = "No se puede eliminar la categoría. Verifique que no tenga subcategorías activas." });
            }

            return Ok(new { message = "Categoría eliminada exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }
} 