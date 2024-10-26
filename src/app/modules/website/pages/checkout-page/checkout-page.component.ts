import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/common/services/user.service';
import { CartService } from 'src/app/common/services/website/cart.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models/order';
import { ToastrService } from 'ngx-toastr';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';
import { Router, RouterLink } from '@angular/router';
import { MapComponent } from 'src/app/common/components/map/map.component';
import { OrderService } from 'src/app/common/services/order.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, InputContainerComponent, ReactiveFormsModule, RouterLink, MapComponent],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  checkoutForm!: FormGroup;
  #userService = inject(UserService);
  #cartService = inject(CartService);
  #toastrService = inject(ToastrService);
  #orderService = inject(OrderService);
  #router = inject(Router);

  #fb = inject(FormBuilder);
  order: Order = new Order();
  constructor() {
    const cart = this.#cartService.currentcart;
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  ngOnInit(): void {
    let { name, address } = this.#userService.currentUser;
    this.checkoutForm = this.#fb.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    })
  }

  private fc(control: string): FormControl {
    return this.checkoutForm.get(control) as FormControl;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.#toastrService.warning('Please fill the inputs', 'Invalid Inputs')
      return;
    }
    // if (!this.order.addressLatlng) {
    //   this.#toastrService.warning('Please Select Your Location On Map', 'Location')
    //   return;
    // }
    this.order.name = this.checkoutForm.value.name;
    this.order.address = this.checkoutForm.value.address;
    this.#orderService.createOrder(this.order).subscribe({
      next: () => {
        this.#toastrService.success('Your Order is Placed Successfully!')
        this.#router.navigateByUrl('/');
      },
      error: (errorResponse) => {
        this.#toastrService.error(errorResponse.error, 'Cart');
      }
    })
    console.log('value is dfdf', this.checkoutForm.value);

  }


}
