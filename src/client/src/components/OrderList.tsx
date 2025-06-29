import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Order } from '../types';
import { ordersApi } from '../api';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке заказов');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Загрузка заказов...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h2>Список заказов</h2>
        <Link to="/create" className="btn btn-primary">
          Создать заказ
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="card">
          <p>Заказов пока нет. <Link to="/create">Создать первый заказ</Link></p>
        </div>
      ) : (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Номер заказа</th>
                <th>Город отправителя</th>
                <th>Город получателя</th>
                <th>Вес (кг)</th>
                <th>Дата забора</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderNumber}</td>
                  <td>{order.senderCity}</td>
                  <td>{order.receiverCity}</td>
                  <td>{order.weight}</td>
                  <td>{formatDate(order.pickupDate)}</td>
                  <td>
                    <Link to={`/order/${order.id}`} className="btn btn-primary">
                      Просмотр
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList; 