import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from 'src/app/shared/models/order';
import { RouterLink } from '@angular/router';

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
