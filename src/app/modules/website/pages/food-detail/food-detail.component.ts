import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HomeService } from 'src/app/common/services/website/home.service';
import { IFood } from 'src/app/shared/models/food';
import { CartService } from 'src/app/common/services/website/cart.service';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, NotFoundComponent],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent {
  #homeService: HomeService = inject(HomeService);
  #cartService: CartService = inject(CartService);
  #userService: UserService = inject(UserService)
  #router: Router = inject(Router);
  food!: IFood;
  id!: number;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((param) => {
      this.id = param['id'];

      if (this.id) {
        this.#homeService.getFoodById(this.id).subscribe((item) => {
          this.food = item;

        })
      }
    })
  }

  addToCart() {
    if(this.#userService.currentUser.token){
      this.#cartService.addToCart(this.food);
      this.#router.navigateByUrl('/cart-page');
    }
    this.#router.navigateByUrl('/login')
  }
}
