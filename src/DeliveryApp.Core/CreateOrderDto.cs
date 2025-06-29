using System.ComponentModel.DataAnnotations;

namespace DeliveryApp.Core;

public class CreateOrderDto
{
    [Required(ErrorMessage = "Город отправителя обязателен")]
    [StringLength(100, ErrorMessage = "Название города не может превышать 100 символов")]
    public string SenderCity { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Адрес отправителя обязателен")]
    [StringLength(200, ErrorMessage = "Адрес не может превышать 200 символов")]
    public string SenderAddress { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Город получателя обязателен")]
    [StringLength(100, ErrorMessage = "Название города не может превышать 100 символов")]
    public string ReceiverCity { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Адрес получателя обязателен")]
    [StringLength(200, ErrorMessage = "Адрес не может превышать 200 символов")]
    public string ReceiverAddress { get; set; } = string.Empty;
    
    [Required(ErrorMessage = "Вес обязателен")]
    [Range(0.1, 1000, ErrorMessage = "Вес должен быть от 0.1 до 1000 кг")]
    public decimal Weight { get; set; }
    
    [Required(ErrorMessage = "Дата забора обязательна")]
    public DateTime PickupDate { get; set; }
} 