import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';
import { UserService } from 'src/app/core/services/user.service';
import { PasswordMatchValidator } from 'src/app/core/validators/password_match_validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputContainerComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm!: FormGroup;
  #fb: FormBuilder = inject(FormBuilder);
  #userService: UserService = inject(UserService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #router: Router = inject(Router);
  #toastrService: ToastrService = inject(ToastrService);


  returnurl: string = '';
  isSubmitted: boolean = false;
  ngOnInit(): void {
    this.signupForm = this.#fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required]

    }, {
      Validators: PasswordMatchValidator('password', 'confirmPassword')
    })
    this.returnurl = this.#activatedRoute.snapshot.queryParams['returnurl'];
  }

  getFormControl(control: string): FormControl {
    return this.signupForm.get(`${control}`) as FormControl;
  }

  /**
   * User Login
   */
  register() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return;
    }
    this.#userService.userSignup(this.signupForm.value).subscribe({
      next: (res) => {
        this.#router.navigateByUrl(this.returnurl);
        this.#toastrService.success(`Welcome to FoodMine ${res.name}`, 'Register Successfull');
      },
      error: (errorResponse) => {
        this.#toastrService.error(errorResponse.error, "Something went wrong");
      }
    }
    )
  }
}
