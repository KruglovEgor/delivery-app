import axios from 'axios';
import { Order, CreateOrderDto } from './types';

const API_BASE_URL = 'http://localhost:5131/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const ordersApi = {
  // Получить все заказы
  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  // Получить заказ по ID
  getById: async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  // Создать новый заказ
  create: async (order: CreateOrderDto): Promise<Order> => {
    const response = await api.post<Order>('/orders', order);
    return response.data;
  },
}; 