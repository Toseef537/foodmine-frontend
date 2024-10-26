import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputContainerComponent } from '../../components/input-container/input-container.component';
import { FoodService } from '../../services/food.service';
import { DialogRef } from '@angular/cdk/dialog';
import { HomeService } from '../../services/website/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-food',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputContainerComponent],
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent implements OnInit {
  addFoodForm!: FormGroup;
  #fb = inject(FormBuilder);
  #dialogRef = inject(DialogRef)
  #foodService = inject(FoodService);
  #homeService = inject(HomeService);
  #toastrService=inject(ToastrService);

  ngOnInit(): void {
    this.addFoodForm = this.#fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      cookTime: ['', Validators.required],
      tag: ['', Validators.required],
      imgUrl: ['', Validators.required],


    })
  }

  getFormControl(control: string): FormControl {
    return this.addFoodForm.get(`${control}`) as FormControl;
  }

  addFood() {
    if (this.addFoodForm.invalid) {
      this.addFoodForm.markAllAsTouched();
      return;
    }
    this.#foodService.addFood(this.addFoodForm.value).subscribe((res) => {
      console.log('add food response', res);
      if (res) {
        this.#homeService.getAllFoodItems().subscribe();
        this.#toastrService.success('Food Added Successfull!');
        this.addFoodForm.reset();
        this.closeDialog();
      }

    })

  }

  closeDialog() {
    this.#dialogRef.close('Pizza!');
  }

}
