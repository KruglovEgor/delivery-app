using DeliveryApp.Core;
using Microsoft.EntityFrameworkCore;

namespace DeliveryApp.Infrastructure;

public class OrderRepository : IOrderRepository
{
    private readonly DeliveryDbContext _context;

    public OrderRepository(DeliveryDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();
    }

    public async Task<Order?> GetByIdAsync(int id)
    {
        return await _context.Orders.FindAsync(id);
    }

    public async Task<Order> CreateAsync(Order order)
    {
        order.OrderNumber = await GenerateOrderNumberAsync();
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order> UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task DeleteAsync(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order != null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }

    private async Task<string> GenerateOrderNumberAsync()
    {
        var lastOrder = await _context.Orders
            .OrderByDescending(o => o.Id)
            .FirstOrDefaultAsync();

        int nextNumber = 1;
        if (lastOrder != null && lastOrder.OrderNumber.StartsWith("ORD-"))
        {
            var numberPart = lastOrder.OrderNumber.Substring(4);
            if (int.TryParse(numberPart, out int lastNumber))
            {
                nextNumber = lastNumber + 1;
            }
        }

        return $"ORD-{nextNumber:D5}";
    }
} 