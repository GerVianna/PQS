export class OrderInfo
{
  orderId: number;
  status: number;
  orderDescription: string;
  createdOn: string;
  authDate: string;
  total: number;
  qItems: number;

  constructor(orderId?: number, status?: number, orderDescription?: string, createdOn?: string, authdate?: string,
              total?: number, qItems?: number) {
    this.orderId = orderId;
    this.status = status;
    this.orderDescription = orderDescription;
    this.createdOn = createdOn;
    this.authDate = authdate;
    this.total = total;
    this.qItems = qItems;
  }
}
