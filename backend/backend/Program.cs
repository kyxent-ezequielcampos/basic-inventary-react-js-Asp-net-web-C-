using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar Entity Framework con PostgreSQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar servicios
builder.Services.AddScoped<ICategoriaService, CategoriaService>();
builder.Services.AddScoped<ISubcategoriaService, SubcategoriaService>();
builder.Services.AddScoped<IProductoService, ProductoService>();

// Configurar CORS - PERMITIR TODAS LAS ORIGENES PARA DESARROLLO
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// IMPORTANTE: CORS debe ir ANTES de UseHttpsRedirection
app.UseCors("AllowAll");

// Solo redirigir a HTTPS en producción
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.MapControllers();

// Crear y aplicar migraciones automáticamente
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

app.Run();