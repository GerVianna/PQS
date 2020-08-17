import {OrderItem} from "./orderItem";

export class Order
{
  orderId: number;
  status: number;
  orderDescription: string;
  createdOn: string;
  authDate: string;
  total: number;
  orderItem: Array<OrderItem>;

  constructor(orderId?: number, status?: number, orderDescription?: string, createdOn?: string, authdate?: string,
              total?: number, items?: Array<OrderItem>) {
    this.orderId = orderId;
    this.status = status;
    this.orderDescription = orderDescription;
    this.createdOn = createdOn;
    this.authDate = authdate;
    this.total = total;
    this.orderItem = items;
  }
}
