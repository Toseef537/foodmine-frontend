import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  get isLoading(){
    return this.isLoadingSubject.asObservable();
  }

  /**
   * Show Loading Method
   */
  showLoading() {
    this.isLoadingSubject.next(true);
  }

  /**
   * Hide Loading Method
   */

  hideLoading() {
    this.isLoadingSubject.next(false);
  }
}
