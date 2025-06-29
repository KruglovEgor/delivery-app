export interface Order {
  id: number;
  senderCity: string;
  senderAddress: string;
  receiverCity: string;
  receiverAddress: string;
  weight: number;
  pickupDate: string;
  orderNumber: string;
  createdAt: string;
}

export interface CreateOrderDto {
  senderCity: string;
  senderAddress: string;
  receiverCity: string;
  receiverAddress: string;
  weight: number;
  pickupDate: string;
} 