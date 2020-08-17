import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderItem} from "../../../../api/models/orderItem";
import {OrderService} from "../../../../api/services/order.service";
import {OrderInfo} from "../../../../api/models/orderInfo";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderItems: Array<OrderItem>;
  orderInfo: OrderInfo;
  constructor(private activatedRouteService: ActivatedRoute,
              private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(order => this.orderInfo = order);
    this.activatedRouteService.params.subscribe( params => {
      this.orderService.getOrder(params.id)
        .then((result) => {
          this.orderItems = result;
        });
    });
  }

  ngOnInit(): void {
  }

  approve(orderId: number): void {
    this.orderService.approveOrder(orderId)
      .then((result) => {
        this.orderInfo.status = 1;
      });
  }

  reject(orderId: number): void {
    this.orderService.rejectOrder(orderId)
      .then((result) => {
        this.orderInfo.status = -1;
      });
  }
}
