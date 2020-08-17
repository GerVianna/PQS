class OrderInfo {
    orderId;
    status;
    orderDescription;
    createdOn;
    authDate;
    total;
    qItems;

    constructor(orderId, status, number, orderDescription, createdOn, authdate,
                total, qItems) {
        this.orderId = orderId;
        this.status = status;
        this.orderDescription = orderDescription;
        this.createdOn = createdOn;
        this.authDate = authdate;
        this.total = total;
        this.qItems = qItems;
    }

}

module.exports = OrderInfo;

