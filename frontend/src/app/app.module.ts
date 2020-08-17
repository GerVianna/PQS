import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HomeModule} from './modules/home/home.module';
import {AppRoutingModule} from './app.routing-module';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
