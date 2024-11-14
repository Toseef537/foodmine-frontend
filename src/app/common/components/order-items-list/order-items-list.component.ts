import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Order } from 'src/app/core/models/order';

@Component({
  selector: 'order-items-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.scss']
})
export class OrderItemsListComponent {
  @Input()
  order!:Order;
  constructor() { }
}
