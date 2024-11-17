import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';
import { HomeService } from 'src/app/core/services/website/home.service';

export const homeResolver: ResolveFn<any> = (route, state) => {
 const homeService:HomeService= inject(HomeService);
 return forkJoin({foodItems:homeService.getAllFoodItems(),tags:homeService.getAllTag()}) 


};
