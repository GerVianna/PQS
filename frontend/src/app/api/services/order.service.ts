import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrderInfo} from '../models/orderInfo';
import {OrderItem} from "../models/orderItem";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private sendOrder = new BehaviorSubject(new OrderInfo());
  currentOrder = this.sendOrder.asObservable();
  constructor(private http: HttpClient) { }

  async getPendingOrders(): Promise<Array<OrderInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/pending', httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getApprovedOrders(): Promise<Array<OrderInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/approved', httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getRejectedOrders(): Promise<Array<OrderInfo>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/rejected', httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getOrder(orderId: number): Promise<Array<OrderItem>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Array<OrderItem> = null;
    await this.http.get(environment.backendUrl + '/api/orders/' + orderId, httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async approveOrder(orderId: number): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Object = null;
    await this.http.post(environment.backendUrl + '/api/orders', {id: orderId} , httpOptions)
      .toPromise()
      .then((result: Object) => {
        res = result;
      });
    return res;
  }

  async rejectOrder(orderId: number): Promise<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
      })
    };
    let res: Object = null;
    await this.http.delete(environment.backendUrl + '/api/orders/' + orderId, httpOptions)
      .toPromise()
      .then((result: Object) => {
        res = result;
      });
    return res;
  }

  sendOrderInfo(orderInfo: OrderInfo): void {
    this.sendOrder.next(orderInfo);
  }

}
