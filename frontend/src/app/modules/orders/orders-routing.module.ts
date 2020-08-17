import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from './components/orders/orders.component';
import {OrderDetailComponent} from './components/order-detail/order-detail.component';


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: ':id',
    component: OrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
