import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { IFood } from 'src/app/core/models/food';
import { HomeService } from 'src/app/core/services/website/home.service';

export const dashboardHomeResolver: ResolveFn<IFood[]> = (route, state) => {
  return inject(HomeService).getAllFoodItems();

};
