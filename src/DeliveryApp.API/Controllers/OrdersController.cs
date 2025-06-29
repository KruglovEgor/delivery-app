using DeliveryApp.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DeliveryApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _repository;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IOrderRepository repository, ILogger<OrdersController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    /// <summary>
    /// Получить список всех заказов
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAll()
    {
        try
        {
            var orders = await _repository.GetAllAsync();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all orders");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Получить заказ по ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetById(int id)
    {
        try
        {
            var order = await _repository.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound($"Заказ с ID {id} не найден");
            }
            return Ok(order);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting order with ID: {Id}", id);
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    /// <summary>
    /// Создать новый заказ
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Order>> Create([FromBody] CreateOrderDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var order = new Order
            {
                SenderCity = dto.SenderCity,
                SenderAddress = dto.SenderAddress,
                ReceiverCity = dto.ReceiverCity,
                ReceiverAddress = dto.ReceiverAddress,
                Weight = dto.Weight,
                PickupDate = dto.PickupDate
            };

            var created = await _repository.CreateAsync(order);
            
            return CreatedAtAction(
                nameof(GetById), 
                new { id = created.Id }, 
                created);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating order");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }
} 