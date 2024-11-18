import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';
import { Router, RouterLink } from '@angular/router';
import { MapComponent } from 'src/app/common/components/map/map.component';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, InputContainerComponent, ReactiveFormsModule, RouterLink, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm!: FormGroup;
  order: Order = new Order();

  // Injecting Dependencies 
  #userService = inject(UserService);
  #cartService = inject(CartService);
  #toastrService = inject(ToastrService);
  #orderService = inject(OrderService);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  // Grouping Form Controls 
  constructor() {
    let { name, address } = this.#userService.currentUser;
    this.checkoutForm = this.#fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }

  // Updating Order Object 
  ngOnInit(): void {
    const cart = this.#cartService.currentcart;
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  // Getting Form Control According to Parameters
  private fc(control: string): FormControl {
    return this.checkoutForm.get(control) as FormControl;
  }


  /**
   * Create Order
   */
  createOrder() {
    if (this.checkoutForm.invalid) {
      this.#toastrService.warning('Please fill the inputs', 'Invalid Inputs')
      return;
    }
    this.order.name = this.checkoutForm.value.name;
    this.order.address = this.checkoutForm.value.address;
    this.#orderService.createOrder(this.order).subscribe({
      next: () => {
        this.#router.navigateByUrl('/');
      },
      error: (errorResponse) => {
        this.#toastrService.error(errorResponse.error, 'Cart');
      }
    })
  }


}
