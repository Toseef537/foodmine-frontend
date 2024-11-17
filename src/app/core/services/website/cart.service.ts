import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ADD_TO_CART_URL, GET_CART_URL, DELETE_CART_ITEM_URL } from 'src/app/common/constants/urls';
import { Cart } from '../../models/cart';
import { IFood } from '../../models/food';
import { CartItem } from '../../models/items';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart!: Cart;
  cartSubject: BehaviorSubject<any> = new BehaviorSubject(this.cart);
  #http: HttpClient = inject(HttpClient);
  #userService: UserService = inject(UserService);

  constructor() {
    this.cart = this.getCartFromLocalStorage();
    // console.log('cart subject',this.cartSubject.value);

    this.cartSubject.next(this.cart);
  }


  //-------------------------------------------------------- Getters --------------------------------------//
  get isVerified() {
    return this.#userService.isVerified;
  }


  /**
* Getting  Cart as an observable
*/
  get getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }


  /**
   * Getting  Cart
   */
  get currentcart(): Cart {
    return this.cartSubject.value;
  }

  //-------------------------------------------------------- Private Methods --------------------------------------//

  /**
     * Saving Cart data to local storage
     */

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItems) => prevSum + currentItems.quantity, 0);

    this.cartSubject.next(this.cart);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
  }

  /**
   * Getting Cart data t=from local storage
   */
  private getCartFromLocalStorage(): Cart {
    if (this.isVerified) {
      return this.getCartItem();
    }
    let cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }


  //-------------------------------------------------------- Public Methods --------------------------------------//
  /**
 * Adding Food to cart
 */
  addToCart(food: IFood): void {
    // const foodAlreadyInCart = this.cart.items.filter((item) => item.food.id === food.id);
    // if (foodAlreadyInCart.length > 0) return;
    // this.cart.items.push(new CartItem(food));
    // if (this.#userService.isVerified) {
    //   this.#http.post<Cart>(ADD_TO_CART_URL, this.cart).subscribe();
    // }
    // this.setCartToLocalStorage();
    this.cart?.items.push(new CartItem(food));
    if (this.isVerified) {
      console.log('called');

      this.#http.post<Cart>(ADD_TO_CART_URL, this.cart).subscribe({
        next: (res: any) => {
          console.log('res from add to cart', res);
          this.cartSubject.next(res);
        },
        error: (errorResponse: Error) => {
          console.log('error', errorResponse);
        }
      });
      return;
    } else {
      this.setCartToLocalStorage();
    }
  }

  /**
  * Getting Current Cart From Backend
  */
  getCartItem(): any {
    if (this.isVerified) {
      this.#http.get<Cart>(GET_CART_URL).subscribe((cart) => {
        this.cart = cart;
        this.cartSubject.next(cart);
      })
      return this.cartSubject.value;
    } else {
      return this.getCartFromLocalStorage();
    }
  }

  /**
   * Sync Local Cart to Backend
   */
  syncLocalCartToBackend() {
    const localCart = this.getCartFromLocalStorage();
    if (localCart.items.length) {
      this.#http.post<Cart>(ADD_TO_CART_URL, localCart).subscribe({
        next: (res: any) => {
          this.cartSubject.next(this.getCartFromLocalStorage());
          this.clearCart();
        },
        error: (errorResponse: Error) => {
          console.log('error', errorResponse);
        }
      });
    }
  }


  /**
   *  Remove Item From Cart
   */
  removeFromCart(foodId: any, cartId: any): void {
    if (this.isVerified) {
      this.#http.delete<Cart>(`${DELETE_CART_ITEM_URL}/${foodId}/${cartId}`).subscribe((res) => {
        // this.cart.items = res.items;
        this.cartSubject.next(res)
      });
      return;
    }
    const filteredCart = this.cart.items.filter((item) => {
      item.food !== foodId
    })


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
  * Clearing cart data from local storage
  */
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();

  }
}
