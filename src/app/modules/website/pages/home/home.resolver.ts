import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';
import { HomeService } from 'src/app/core/services/website/home.service';

export const homeResolver: ResolveFn<any> = (route, state) => {
 const homeService:HomeService= inject(HomeService);
 const cartService:CartService=inject(CartService);
 const userService:UserService=inject(UserService);
 const isAuth=userService.currentUser()?.token;
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
