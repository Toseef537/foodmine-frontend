import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/common/services/user.service';
import { CartService } from 'src/app/common/services/website/cart.service';
import { HomeService } from 'src/app/common/services/website/home.service';
import { IFood } from 'src/app/shared/models/food';

export const homeResolver: ResolveFn<any> = (route, state) => {
 const homeService:HomeService= inject(HomeService);
 const cartService:CartService=inject(CartService);
 const userService:UserService=inject(UserService);
 const isAuth=userService.currentUser.token;
//  if(isAuth){
//   return forkJoin({
//     homeData:homeService.getAllFoodItems(),
//     currentCart:cartService.loadCartFromBackend()
//    })
//  }else{
//    return homeService.getAllFoodItems()
//  }
 return homeService.getAllFoodItems()


};
