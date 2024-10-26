import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';
import { IUserLogin } from 'src/app/shared/interfaces/user';
import { InputContainerComponent } from 'src/app/common/components/input-container/input-container.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,InputContainerComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  #fb: FormBuilder = inject(FormBuilder);
  #userService: UserService = inject(UserService);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #router: Router = inject(Router);
  returnurl: string = '';
  isSubmitted: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.#fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  //  this.returnurl= this.#activatedRoute.snapshot.queryParams['returnurl'];
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

    // Getting Login Credentials 
    const user: IUserLogin = {
      email: this.getFormControl('email').value,
      password: this.getFormControl('password').value
    };
    this.#userService.login(user).subscribe((res) => {
      console.log('res from server', res);
      if(res.isAdmin){
        this.#router.navigateByUrl('/dashboard');
        return;
      }
      this.#router.navigateByUrl(this.returnurl)

    })


  }
}
