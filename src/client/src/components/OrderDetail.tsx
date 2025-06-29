import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Order } from '../types';
import { ordersApi } from '../api';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadOrder(parseInt(id));
    }
  }, [id]);

  const loadOrder = async (orderId: number) => {
    try {
      setLoading(true);
      const data = await ordersApi.getById(orderId);
      setOrder(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке заказа');
      console.error('Error loading order:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  if (loading) {
    return <div className="loading">Загрузка заказа...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!order) {
    return <div className="error">Заказ не найден</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Детали заказа {order.orderNumber}</h2>
      </div>

      <div className="card">
        <div className="order-details">
          <div className="detail-section">
            <h3>Информация об отправителе</h3>
            <div className="form-group">
              <label>Город:</label>
              <div className="form-control readonly">{order.senderCity}</div>
            </div>
            <div className="form-group">
              <label>Адрес:</label>
              <div className="form-control readonly">{order.senderAddress}</div>
            </div>
          </div>

          <div className="detail-section">
            <h3>Информация о получателе</h3>
            <div className="form-group">
              <label>Город:</label>
              <div className="form-control readonly">{order.receiverCity}</div>
            </div>
            <div className="form-group">
              <label>Адрес:</label>
              <div className="form-control readonly">{order.receiverAddress}</div>
            </div>
          </div>
        </div>

        <div className="order-info">
          <div className="form-group">
            <label>Вес груза:</label>
            <div className="form-control readonly">{order.weight} кг</div>
          </div>
          <div className="form-group">
            <label>Дата забора:</label>
            <div className="form-control readonly">{formatDate(order.pickupDate)}</div>
          </div>
          <div className="form-group">
            <label>Дата создания:</label>
            <div className="form-control readonly">{formatDate(order.createdAt)}</div>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/" className="btn btn-secondary">
            Назад к списку
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail; 