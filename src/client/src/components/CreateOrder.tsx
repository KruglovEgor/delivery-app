import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateOrderDto } from '../types';
import { ordersApi } from '../api';

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateOrderDto>({
    senderCity: '',
    senderAddress: '',
    receiverCity: '',
    receiverAddress: '',
    weight: 0,
    pickupDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'weight') {
      const numValue = value === '' ? 0 : parseFloat(value) || 0;
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.senderCity.trim()) return 'Город отправителя обязателен';
    if (!formData.senderAddress.trim()) return 'Адрес отправителя обязателен';
    if (!formData.receiverCity.trim()) return 'Город получателя обязателен';
    if (!formData.receiverAddress.trim()) return 'Адрес получателя обязателен';
    if (formData.weight <= 0) return 'Вес должен быть больше 0';
    if (!formData.pickupDate) return 'Дата забора обязательна';

    const pickupDate = new Date(formData.pickupDate);
    const now = new Date();
    if (pickupDate < now) {
      return 'Дата забора не может быть в прошлом';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const orderData = {
        ...formData,
        pickupDate: new Date(formData.pickupDate).toISOString()
      };

      await ordersApi.create(orderData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      console.error('Error creating order:', err);
      if (err.response?.data?.errors) {
        const apiErrors = err.response.data.errors;
        const errorMessages = Object.values(apiErrors).flat().join(', ');
        setError(`Ошибка валидации: ${errorMessages}`);
      } else {
        setError('Ошибка при создании заказа');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Создать новый заказ</h2>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">Заказ успешно создан! Перенаправление...</div>}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="senderCity">Город отправителя *</label>
            <input
              type="text"
              id="senderCity"
              name="senderCity"
              className="form-control"
              value={formData.senderCity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senderAddress">Адрес отправителя *</label>
            <input
              type="text"
              id="senderAddress"
              name="senderAddress"
              className="form-control"
              value={formData.senderAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiverCity">Город получателя *</label>
            <input
              type="text"
              id="receiverCity"
              name="receiverCity"
              className="form-control"
              value={formData.receiverCity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiverAddress">Адрес получателя *</label>
            <input
              type="text"
              id="receiverAddress"
              name="receiverAddress"
              className="form-control"
              value={formData.receiverAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Вес груза (кг) *</label>
            <input
              type="number"
              id="weight"
              name="weight"
              className="form-control"
              value={formData.weight === 0 ? '' : formData.weight}
              onChange={handleChange}
              min="0.1"
              max="1000"
              step="0.1"
              placeholder="Введите вес"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pickupDate">Дата забора груза *</label>
            <input
              type="datetime-local"
              id="pickupDate"
              name="pickupDate"
              className="form-control"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Создание...' : 'Создать заказ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder; 