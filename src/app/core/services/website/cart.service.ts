import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ADD_TO_CART_URL, GET_CART_URL, DELETE_CART_ITEM_URL } from 'src/app/common/constants/urls';
import { Cart } from '../../models/cart';
import { IFood } from '../../models/food';
import { CartItem } from '../../models/items';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Cart = this.getCartFromLocalStorage();
  cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  #http: HttpClient = inject(HttpClient);
  constructor() {
    // this.loadCartFromBackend();
  }

  /**
 * Adding Food to cart
 */
  addToCart(food: IFood): void {
    const foodAlreadyInCart = this.cart.items.filter((item) => item.food.id === food.id);
    if (foodAlreadyInCart.length > 0) return;
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
    this.#http.post<Cart>(ADD_TO_CART_URL, this.cart).subscribe();
  }

  /**
  * Getting Current Cart From Backend
  */

  loadCartFromBackend(): Observable<Cart> {
    return this.#http.get<Cart>(GET_CART_URL).pipe(
      tap((currentCart) => {
        this.cart = currentCart;
        this.cartSubject.next(currentCart);
        console.log('cart from backend', this.cartSubject.value);
        this.setCartToLocalStorage();
      })
    )
  }

  removeFromCart(foodId: any, cartId: any): void {
    this.#http.delete<Cart>(`${DELETE_CART_ITEM_URL}/${foodId}/${cartId}`).subscribe((res) => {
      console.log('res from delete api', res);
      this.cart.items = res.items;
      this.setCartToLocalStorage();
    });

  }

  /**
  * Changing quantity of food added to cart
  */
  changeQuantity(foodId: any, quantity: number) {
    console.log('cartItem', quantity);
    let cartItem = this.cart.items.find((item) => {
      return item.food.id === foodId
    });
    console.log('finded cartItem', cartItem);

    if (!cartItem) return;
    else {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
    }
    this.setCartToLocalStorage();
    console.log('cart after quantity change', this.cart);

  }

  /**
  * Clearing cart from loacl storage and service
  */
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();

  }

  /**
 * Getting  Cart as an observable
 */
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }


  /**
   * Getting  Cart
   */
  get currentcart(): Cart {
    return this.cartSubject.value;
  }

  /**
   * Saving Cart data to local storage
   */

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  /**
   * Getting Cart data t=from local storage
   */
  private getCartFromLocalStorage(): Cart {
    let cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
