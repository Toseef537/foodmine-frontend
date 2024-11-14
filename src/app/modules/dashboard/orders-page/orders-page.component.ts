import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderDetailComponent } from 'src/app/common/modals/order-detail/order-detail.component';
import { Order } from 'src/app/core/models/order';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage,MatDialogModule],
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent {
  #orderService: OrderService = inject(OrderService);
  #dialog:Dialog = inject(Dialog)

  orders:Order[] = [];

  constructor() { }

  ngOnInit(): void {
    this.#orderService.getAllOrders().subscribe((allOrders)=>{
      this.orders=allOrders;
    });
  }


  viewOrderDetails(order:Order): void {
    this.#dialog.open(OrderDetailComponent, {
      height: '500px',
      width: '1000px',
      data:{
        order:order
      }
    })
  }

  cancelOrder(ordre: Order): void {
    // Implement logic to cancel an order
  }

  addOrder(): void {
    // Implement logic to add a new order
  }
}
