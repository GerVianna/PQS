import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../../api/services/order.service';
import {OrderInfo} from '../../../../api/models/orderInfo';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  loading: boolean;
  ordersInfo: Array<OrderInfo>;
  status: string;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.status = '0';
    this.loading = true;
    // Obtengo ordenes pendientes
    this.orderService.getPendingOrders()
      .then((result) => {
          this.ordersInfo = result;
          this.loading = false;
      });
  }

  // Mediante los cambios en el select, actualizo la tabla de ordenes
  updateOrders($event: string): void {
    this.loading = true;
    switch ($event) {
      case '0':
        this.orderService.getPendingOrders()
          .then((result) => {
            this.ordersInfo = result;
            this.loading = false;
          });
        break;
      case '1':
        this.orderService.getApprovedOrders()
          .then((result) => {
            this.ordersInfo = result;
            this.loading = false;
          });
        break;
      case '-1':
        this.orderService.getRejectedOrders()
          .then((result) => {
            this.ordersInfo = result;
            this.loading = false;
          });
    }
  }

  // Al hacer click sobre el id de orden, envio la informacion obtenida de esa orden.
  sendOrderInfo(order: OrderInfo): void {
    this.orderService.sendOrderInfo(order);
  }

}
