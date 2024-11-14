import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgOptimizedImage } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { AddFoodComponent } from 'src/app/common/modals/add-food/add-food.component';
import { ToastrService } from 'ngx-toastr';
import { UpdateFoodComponent } from 'src/app/common/modals/update-food/update-food.component';
import { Observable } from 'rxjs';
import { IFood } from 'src/app/core/models/food';
import { FoodService } from 'src/app/core/services/food.service';
import { HomeService } from 'src/app/core/services/website/home.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  foodItems: IFood[]=[];
  #foodItem!: Observable<IFood>;
  #homeService = inject(HomeService);
  #foodService = inject(FoodService);
  #dialog = inject(Dialog)
  #toastrService = inject(ToastrService);
  ngOnInit(): void {
    this.#homeService.homePageData$.subscribe((foods) => {
      this.foodItems = foods;
      console.log('dashboard foods', foods);

    })
    this.#homeService.getAllFoodItems().subscribe();
  }

  addFood() {
    this.#dialog.open(AddFoodComponent, {
      height: '400px',
      width: '500px',
    })
  }

  deleteFood(id: string) {
    this.#foodService.deleteFood(id).subscribe((deletedFood) => {
      if (deletedFood) {
        this.#toastrService.success('Food Deleted Successfully', 'Deleted');
        this.#homeService.getAllFoodItems().subscribe();
      }
    })
  }

  updateFood(foodId: string) {

    this.#dialog.open(UpdateFoodComponent, {
      height: '400px',
      width: '500px',
      data: { id: foodId }

    })
  }

}
