import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { Cart } from 'src/app/core/models/cart';
import { CartItem } from 'src/app/core/models/items';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NotFoundComponent, MultiSelectModule, FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  #cartService: CartService = inject(CartService);
  cities!: any[];
  selectedCities!: any[];

  // Getting Cart Data 
  ngOnInit(): void {
    this.#cartService.getCartItem();
    this.#cartService.getCartObservable.subscribe((cart) => {
      this.cart = cart;
    })
  }

  /**
   * Remove Item From Cart
   */
  removeFromCart(cartItem: CartItem) {
    this.#cartService.removeFromCart(cartItem.food.id, this.cart.id);
  }

  /**
   * Change Quantity of Item
   */
  changeQuantity(cartItem: CartItem, quantityInString: string) {
    let quantity = parseInt(quantityInString);
    console.log('cartItem', quantity);
    this.#cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
