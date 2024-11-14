import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { SIGNUP_URL, LOGIN_URL } from 'src/app/common/constants/urls';
import { IUserRegister, IUserLogin } from '../interfaces/user';
import { User } from '../models/user';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http: HttpClient = inject(HttpClient);
  #toastrService: ToastrService = inject(ToastrService);
  #router: Router = inject(Router)
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  userObservable: Observable<User> = this.userSubject.asObservable();
  constructor() {
  }

  currentUser(): any {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  /**
  * 
  * signup
  * 
  */

  userSignup(userRegister: IUserRegister): Observable<User> {
    console.log('service', userRegister);

    return this.#http.post<User>(SIGNUP_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.#toastrService.success(`Welcome to FoodMine ${user.name}`, 'Register Successfull');
        },
        error: (errorResponse) => {
          this.#toastrService.error(errorResponse.errors, 'Register Failed')
        }
      })
    )
  }

  /**
   * 
   * login
   * 
   */
  login(user: IUserLogin): Observable<User> {
    return this.#http.post<User>(LOGIN_URL, user).pipe(
      tap((user: User) => {
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.#toastrService.success(`Welcome to FoodMine ${user.name}`, "Login Successfull");
        this.#router.navigateByUrl('/dashboard');
      }),
      catchError((errorResponse) => {
        this.#toastrService.error(errorResponse.error, "Invalid Login Credentials");
        return throwError(() => new Error(errorResponse.error));
      })
    );
  }

  /**
 * 
 * logout
 * 
 */
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('Cart');
    this.#router.navigateByUrl('/');
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }
}
