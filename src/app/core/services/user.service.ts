import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject,  Observable, tap } from 'rxjs';
import { SIGNUP_URL, LOGIN_URL } from 'src/app/common/constants/urls';
import { IUserRegister, IUserLogin } from '../interfaces/user';
import { User } from '../models/user';
const USER_KEY = 'user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  #http: HttpClient = inject(HttpClient);
  #router: Router = inject(Router);

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage);
  userObservable: Observable<User> = this.userSubject.asObservable();


  //---------------------------------------------------Get Methods--------------------------------------------//

  get currentUser(): any {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
  }

  get isVerified() {
    const user = this.currentUser;
    return user?.token ? true : false;
  }

  get getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  //---------------------------------------------------Public Methods--------------------------------------------//

  /*
  * signup
  */

  userSignup(userRegister: IUserRegister): Observable<User> {
    return this.#http.post<User>(SIGNUP_URL, userRegister).pipe(
      tap((user) => {
        this.userSubject.next(user);
        this.setUserToLocalStorage(user);
      }),
    )
  }

  /*
   * login
   */
  login(user: IUserLogin): Observable<User> {
    return this.#http.post<User>(LOGIN_URL, user).pipe(
      tap((user: User) => {
        this.userSubject.next(user);
        this.setUserToLocalStorage(user);
      })
    );
  }

  /*
  * logout
  */
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('Cart');
    this.#router.navigateByUrl('/');
  }

  /*
   * Saving user to local storage
   */
  setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }


}
