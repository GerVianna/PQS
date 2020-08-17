import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {NzDividerModule, NzListModule, NzSelectModule, NzTableModule} from "ng-zorro-antd";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [OrderDetailComponent, OrdersComponent],
  imports: [
    OrdersRoutingModule,
    CommonModule,
    NzListModule,
    NzTableModule,
    NzDividerModule,
    NzSelectModule,
    FormsModule
  ]
})
export class OrdersModule { }
