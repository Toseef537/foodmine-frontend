import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../../components/input-container/input-container.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IFood } from 'src/app/core/models/food';
import { FoodService } from 'src/app/core/services/food.service';
import { HomeService } from 'src/app/core/services/website/home.service';
@Component({
  selector: 'app-update-food',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, InputContainerComponent],
  templateUrl: './update-food.component.html',
  styleUrls: ['./update-food.component.scss']
})
export class UpdateFoodComponent {
  updateForm!: FormGroup;
  foodId!: string;
  #fb = inject(FormBuilder);
  #dialogRef = inject(DialogRef)
  #foodServicde = inject(FoodService);
  #homeService = inject(HomeService);
  #toastrService=inject(ToastrService);

  constructor(@Inject(DIALOG_DATA) public data: { id: string }) {
    this.foodId = data.id;
  }
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  //   console.log(data); // Now you can access the data object here
  // }

  ngOnInit(): void {
    this.updateForm = this.#fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      cookTime: ['', Validators.required],
      tag: ['', Validators.required],
      imgUrl: ['', Validators.required],
    })
    this.#homeService.getFoodById(this.data.id).subscribe((res) => {
      console.log('food by id', res);
      this.updateForm.patchValue(res);

    })


    // this.#homeService.getFoodById(this.data.id).subscribe((res)=>{
    //   console.log('food',res);
    // })
  }

  getFormControl(control: string): FormControl {
    return this.updateForm.get(`${control}`) as FormControl;
  }

  updateFood(food:IFood) {
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }
    // const food = this.updateForm.value;
    this.#foodServicde.updateFood(this.foodId, food).subscribe((food) => {
      console.log('updated food', food);
      if(food){
        this.#homeService.getAllFoodItems().subscribe();
        this.#toastrService.success('Food Updated Successfull!','Updated')
        this.closeDialog();

      }
    })


  }

  closeDialog() {
    this.#dialogRef.close('Pizza!');
  }
}
