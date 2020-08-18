import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {OrderItem} from '../../../../api/models/orderItem';
import {OrderService} from '../../../../api/services/order.service';
import {OrderInfo} from '../../../../api/models/orderInfo';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderItems: Array<OrderItem>; // Array con items de la orden
  orderInfo: OrderInfo; // Orden actual
  constructor(private activatedRouteService: ActivatedRoute,
              private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(order => this.orderInfo = order); // obtengo orden
    this.activatedRouteService.params.subscribe( params => { // me subscribo para obtener parametro de id de la url
      this.orderService.getOrder(params.id) // obtengo items de la orden
        .then((result) => {
          this.orderItems = result;
        });
    });
  }

  ngOnInit(): void {
  }

  // aprobar una orden
  approve(orderId: number): void {
    this.orderService.approveOrder(orderId)
      .then((result) => {
        this.orderInfo.status = 1; // actualizo estado de la orden
      });
  }
  // rechazar una orden
  reject(orderId: number): void {
    this.orderService.rejectOrder(orderId)
      .then((result) => {
        this.orderInfo.status = -1; // actualizado estado de la orden
      });
  }
}
