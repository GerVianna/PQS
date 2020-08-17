import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [HomeComponent],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    RouterModule
  ]
})
export class HomeModule { }
