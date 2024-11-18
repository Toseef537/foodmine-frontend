import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { AddFoodComponent } from 'src/app/common/modals/add-food/add-food.component';
import { UpdateFoodComponent } from 'src/app/common/modals/update-food/update-food.component';
import { IFood } from 'src/app/core/models/food';
import { FoodService } from 'src/app/core/services/food.service';
import { HomeService } from 'src/app/core/services/website/home.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatDialogModule, ConfirmPopupModule, ButtonModule, ToastModule, RippleModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class DashboardHomeComponent implements OnInit {
  foodItems: IFood[] = [];
  // Injecting Dependencies
  #homeService = inject(HomeService);
  #foodService = inject(FoodService);
  #primeConfirmationService = inject(ConfirmationService);
  #primeMessageService = inject(MessageService);
  #dialog = inject(Dialog)

  // Getting Items Data 
  ngOnInit(): void {
    this.#homeService.homePageData$.subscribe((foods) => {
      this.foodItems = foods;
    })
    this.#homeService.getAllFoodItems().subscribe();
  }


  /**
   *  Add Item 
  */
  addFood() {
    this.#dialog.open(AddFoodComponent, {
      height: '400px',
      width: '500px',
    })
  }


  /**
   * Delete Item
   */
  deleteFood(id: string) {
    this.#foodService.deleteFood(id).subscribe({
      next: () => {
        this.#homeService.getAllFoodItems().subscribe();
      },
      error: (errorResponse) => {
        console.log(errorResponse);

      }
    })
  }

  /**
   * Update Item
   */
  updateFood(foodId: string) {
    this.#dialog.open(UpdateFoodComponent, {
      height: '400px',
      width: '500px',
      data: { id: foodId }

    })
  }

  /**
   * Confirm Item Delete Action
   */
  confirmDelete(event: Event, productId: any): void {
    this.#primeConfirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this product?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteFood(productId);
        this.#primeMessageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: `Product deleted successfully.`,
        });
      },
      reject: () => {
        this.#primeMessageService.add({
          severity: 'error',
          summary: 'Cancelled',
          detail: 'Product deletion cancelled.',
        });
      },
    });
  }

}
