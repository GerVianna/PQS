class OrderItem {
    orderItemId;
    description;
    quantity;
    unitPrice;

    constructor(orderItemId, description, unitPrice, quantity) {
        this.orderItemId = orderItemId;
        this.description = description;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
    }

}

module.exports = OrderItem;

