import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { Cart } from 'src/app/core/models/cart';
import { CartItem } from 'src/app/core/models/items';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NotFoundComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  #userService: UserService = inject(UserService);
  #cartService: CartService = inject(CartService);
  #router: Router = inject(Router);

  constructor() {
    // #cartService.loadCartFromBackend().subscribe();

  }
  ngOnInit(): void {
    this.#cartService.loadCartFromBackend().subscribe()
    this.cart = this.#cartService.currentcart;
    console.log('cart items in cart ts file', this.cart);

  }


  removeFromCart(cartItem: CartItem) {
    this.#cartService.removeFromCart(cartItem.food.id, this.cart.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    let quantity = parseInt(quantityInString);
    console.log('cartItem', quantity);
    this.#cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
