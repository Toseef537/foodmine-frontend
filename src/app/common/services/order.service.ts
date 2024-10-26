import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_ALL_ORDERS_URL, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL } from 'src/app/constants/urls';
import { Order } from 'src/app/shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  #http = inject(HttpClient);
  constructor() { }

  createOrder(order: Order){
    console.log('order is',order);
    return this.#http.post<Order>(ORDER_CREATE_URL, order)
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.#http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  getAllOrders(){
   return this.#http.get<Order[]>(GET_ALL_ORDERS_URL);
  }
}
