import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './modules/home/components/home/home.component';
import {OrdersModule} from "./modules/orders/orders.module";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'orders',
    loadChildren: () => OrdersModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
