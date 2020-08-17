export class OrderItem
{
  orderItemId: number;
  itemDescription: string;
  unitPrice: number;
  quantity: number;

  constructor(orderItemId?: number, itemDescription?: string, unitPrice?: number, quantity?: number) {
    this.orderItemId = orderItemId;
    this.itemDescription = itemDescription;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
