using DeliveryApp.Core;
using DeliveryApp.Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework with SQLite
builder.Services.AddDbContext<DeliveryDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("DeliveryApp.API")));

// Register repositories
builder.Services.AddScoped<IOrderRepository, OrderRepository>();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DeliveryDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    
    try
    {
        // Проверяем, есть ли миграции для применения
        if (context.Database.GetPendingMigrations().Any())
        {
            logger.LogInformation("Applying pending migrations...");
            context.Database.Migrate();
            logger.LogInformation("Migrations applied successfully");
        }
        else
        {
            logger.LogInformation("No pending migrations found");
        }
        
        // Проверяем, что база данных доступна
        var canConnect = await context.Database.CanConnectAsync();
        if (!canConnect)
        {
            throw new Exception("Cannot connect to database");
        }
        
        logger.LogInformation("Database connection verified successfully");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "An error occurred while initializing the database");
        
        // В режиме разработки выводим подробную информацию об ошибке
        if (app.Environment.IsDevelopment())
        {
            throw;
        }
        
        // В продакшене можно продолжить работу или завершить приложение
        // throw;
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// Добавляем CORS перед другими middleware
app.UseCors();

app.UseAuthorization();

app.MapControllers();

// Добавляем обработку ошибок
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An unhandled exception occurred.");
        throw;
    }
});

// Добавляем эндпоинт для проверки здоровья
app.MapGet("/health", () => "OK");

app.Run();
