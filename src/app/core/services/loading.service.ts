import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  get isLoading():Observable<boolean>{
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
