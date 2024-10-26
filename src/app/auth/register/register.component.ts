import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';
import { UserService } from 'src/app/common/services/user.service';
import { IUserLogin, IUserRegister } from 'src/app/shared/interfaces/user';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';

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
    console.log(this.signupForm.value);

    const formValue = this.signupForm.value;
    const user: IUserRegister = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      address: formValue.address
    };
    this.#userService.userSignup(user).subscribe((res) => {
      console.log('res from server', res);
      this.#router.navigateByUrl(this.returnurl)

    })


  }
}
