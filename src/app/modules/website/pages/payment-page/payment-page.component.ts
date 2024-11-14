import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderItemsListComponent } from 'src/app/common/components/order-items-list/order-items-list.component';
import { MapComponent } from 'src/app/common/components/map/map.component';
import { PaypalButtonComponent } from 'src/app/common/components/paypal-button/paypal-button.component';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [CommonModule,OrderItemsListComponent,MapComponent,PaypalButtonComponent],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.scss']
})
export class PaymentPageComponent {
  order: Order = new Order();
  constructor(orderService: OrderService, router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        router.navigateByUrl('/chekcout');
      }
    })

  }
}
