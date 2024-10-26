import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LOGIN_URL, SIGNUP_URL } from 'src/app/constants/urls';
import { IUserLogin, IUserRegister } from 'src/app/shared/interfaces/user';
import { Cart } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http: HttpClient = inject(HttpClient);
  #toastrService: ToastrService = inject(ToastrService);
  #router:Router=inject(Router)
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  userObservable!: Observable<User>;
  constructor() {
    this.userObservable = this.userSubject.asObservable();
  }

get currentUser():User{
  return this.userSubject.value;
}

  /**
  * 
  * signup
  * 
  */

  userSignup(userRegister: IUserRegister): Observable<User> {
    console.log('service',userRegister);
    
    return this.#http.post<User>(SIGNUP_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.#toastrService.success(`Welcome to FoodMine ${user.name}`, 'Register Successfull')
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
      tap(
        {
          next: (user: User) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.#toastrService.success(`Welcome to FoodMine ${user.name}`, "Login Successfull")
          },
          error: (errorResponse) => {
            this.#toastrService.error(errorResponse.error, "Login Failed")
          }
        }
      )
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
