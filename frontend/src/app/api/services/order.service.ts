import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrderInfo} from '../models/orderInfo';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
}
