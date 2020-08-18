import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NzButtonModule} from 'ng-zorro-antd';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    RouterModule
  ]
})
export class HomeModule { }
