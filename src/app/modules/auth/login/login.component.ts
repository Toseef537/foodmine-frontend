import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/website/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, InputContainerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  #fb: FormBuilder = inject(FormBuilder);
  #userService: UserService = inject(UserService);
  #cartService: CartService = inject(CartService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #router: Router = inject(Router);
  #toastrService: ToastrService = inject(ToastrService);
  returnurl: string = '';
  isSubmitted: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.returnurl = this.#activatedRoute.snapshot.queryParams['returnurl'];
  }

  getFormControl(control: string): FormControl {
    return this.loginForm.get(`${control}`) as FormControl;
  }

  /**
   * User Login
   */
  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return;
    }
    this.#userService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.#router.navigateByUrl('/dashboard');
        this.#cartService.syncLocalCartToBackend();
      },
      error: (errorResponse) => {
        this.#toastrService.error(errorResponse.error, "Invalid Login Credentials");
      }
    });
  }
}
