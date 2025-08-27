using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models.DTOs;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubcategoriasController : ControllerBase
{
    private readonly ISubcategoriaService _subcategoriaService;

    public SubcategoriasController(ISubcategoriaService subcategoriaService)
    {
        _subcategoriaService = subcategoriaService;
    }

    // GET: api/subcategorias
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SubcategoriaDto>>> GetSubcategorias()
    {
        try
        {
            var subcategorias = await _subcategoriaService.GetAllAsync();
            return Ok(subcategorias);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/subcategorias/categoria/5
    [HttpGet("categoria/{categoriaId}")]
    public async Task<ActionResult<IEnumerable<SubcategoriaDto>>> GetSubcategoriasByCategoria(int categoriaId)
    {
        try
        {
            var subcategorias = await _subcategoriaService.GetByCategoriaIdAsync(categoriaId);
            return Ok(subcategorias);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // GET: api/subcategorias/5
    [HttpGet("{id}")]
    public async Task<ActionResult<SubcategoriaDto>> GetSubcategoria(int id)
    {
        try
        {
            var subcategoria = await _subcategoriaService.GetByIdAsync(id);
            if (subcategoria == null)
            {
                return NotFound(new { message = "Subcategoría no encontrada" });
            }

            return Ok(subcategoria);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }

    // POST: api/subcategorias
    [HttpPost]
    public async Task<ActionResult<SubcategoriaDto>> CreateSubcategoria(CreateSubcategoriaDto createSubcategoriaDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subcategoria = await _subcategoriaService.CreateAsync(createSubcategoriaDto);
            return CreatedAtAction(nameof(GetSubcategoria), new { id = subcategoria.Id }, subcategoria);
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

    // PUT: api/subcategorias/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubcategoria(int id, UpdateSubcategoriaDto updateSubcategoriaDto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var subcategoria = await _subcategoriaService.UpdateAsync(id, updateSubcategoriaDto);
            if (subcategoria == null)
            {
                return NotFound(new { message = "Subcategoría no encontrada" });
            }

            return Ok(subcategoria);
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

    // DELETE: api/subcategorias/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubcategoria(int id)
    {
        try
        {
            var result = await _subcategoriaService.DeleteAsync(id);
            if (!result)
            {
                return BadRequest(new { message = "No se puede eliminar la subcategoría. Verifique que no tenga productos activos." });
            }

            return Ok(new { message = "Subcategoría eliminada exitosamente" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error interno del servidor", error = ex.Message });
        }
    }
} 