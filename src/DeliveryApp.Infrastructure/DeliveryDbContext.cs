using DeliveryApp.Core;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Infrastructure;

public class DeliveryDbContext : DbContext
{
    public DeliveryDbContext(DbContextOptions<DeliveryDbContext> options) : base(options)
    {
    }

    public DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.OrderNumber).IsRequired().HasMaxLength(20);
            entity.Property(e => e.SenderCity).IsRequired().HasMaxLength(100);
            entity.Property(e => e.SenderAddress).IsRequired().HasMaxLength(200);
            entity.Property(e => e.ReceiverCity).IsRequired().HasMaxLength(100);
            entity.Property(e => e.ReceiverAddress).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Weight).HasColumnType("decimal(10,2)");
            entity.Property(e => e.PickupDate).IsRequired();
            entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
        });
    }
} 