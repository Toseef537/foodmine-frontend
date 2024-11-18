import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { IFood } from 'src/app/core/models/food';
import { CartService } from 'src/app/core/services/website/cart.service';
import { HomeService } from 'src/app/core/services/website/home.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, NotFoundComponent],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent {
  food!: IFood;
  id!: number;
  ref: DynamicDialogRef | undefined;
  // Injecting Dependencies 
  #homeService: HomeService = inject(HomeService);
  #cartService: CartService = inject(CartService);

  // Getting Item By ID 
  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((param) => {
      this.id = param['id'];
      if (this.id) {
        this.#homeService.getFoodById(this.id).subscribe((item) => {
          this.food = item;
          console.log('id in constructor', this.food.id);


        })
      }
    })
  }

  /**
   * Add Item To Cart 
   */
  addToCart() {
    this.#cartService.addToCart(this.food);

  }
}
