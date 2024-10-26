import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_FOOD_URL, DELETE_FOOD_URL, Update_FOOD_URL } from 'src/app/constants/urls';
import { IFood } from 'src/app/shared/models/food';
import { HomeService } from './website/home.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  #http = inject(HttpClient);
  #homeService = inject(HomeService);
  constructor() { }

  addFood(food: IFood): Observable<IFood> {
    return this.#http.post<IFood>(ADD_FOOD_URL, food)
  }

  deleteFood(foodId: string): Observable<IFood> {
    return this.#http.delete<IFood>(`${DELETE_FOOD_URL}/${foodId}`);
  }

  updateFood(foodId:string,food:IFood):Observable<IFood>{
    console.log('food',food);
    return this.#http.put<IFood>(`${Update_FOOD_URL}/${foodId}`,food)
  }
}
