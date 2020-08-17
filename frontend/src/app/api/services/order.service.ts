import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {OrderInfo} from '../models/orderInfo';
import {OrderItem} from '../models/orderItem';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Configuro BehaviorSubject para enviar orden correspondiente
  private sendOrder = new BehaviorSubject(new OrderInfo());
  currentOrder = this.sendOrder.asObservable();
  // Creo objeto hhtpOptions para las request
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    })
  };
  constructor(private http: HttpClient) { }

  // Funciones del servicio para obtener ordenes, aceptarlas y rechazarlas
  async getPendingOrders(): Promise<Array<OrderInfo>> {
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/pending', this.httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getApprovedOrders(): Promise<Array<OrderInfo>> {
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/approved', this.httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getRejectedOrders(): Promise<Array<OrderInfo>> {
    let res: Array<OrderInfo> = null;
    await this.http.get(environment.backendUrl + '/api/orders/rejected', this.httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async getOrder(orderId: number): Promise<Array<OrderItem>> {
    let res: Array<OrderItem> = null;
    await this.http.get(environment.backendUrl + '/api/orders/' + orderId, this.httpOptions)
      .toPromise()
      .then((result: any) => {
        res = result;
      });
    return res;
  }

  async approveOrder(orderId: number): Promise<Object> {
    let res: Object = null;
    await this.http.post(environment.backendUrl + '/api/orders', {id: orderId} , this.httpOptions)
      .toPromise()
      .then((result: Object) => {
        res = result;
      });
    return res;
  }

  async rejectOrder(orderId: number): Promise<Object> {
    let res: Object = null;
    await this.http.delete(environment.backendUrl + '/api/orders/' + orderId, this.httpOptions)
      .toPromise()
      .then((result: Object) => {
        res = result;
      });
    return res;
  }

  // Funcion para actualizar la orden en el componente order-detail
  sendOrderInfo(orderInfo: OrderInfo): void {
    this.sendOrder.next(orderInfo);
  }

}
