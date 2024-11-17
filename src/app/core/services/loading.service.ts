import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private activeRequests = 0; // Counter to track active HTTP requests
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  /**
   * Observable to track loading state
   */
  get isLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  /**
   * Show Loading Method
   * Increments the activeRequests counter and triggers the loading spinner if not already visible.
   */
  showLoading(): void {
    this.activeRequests++;
    if (!this.isLoadingSubject.value) {
      this.isLoadingSubject.next(true);
    }
  }

  /**
   * Hide Loading Method
   * Decrements the activeRequests counter and hides the spinner when no requests are active.
   */
  hideLoading(): void {
    this.activeRequests = Math.max(this.activeRequests - 1, 0); // Prevent negative count
    if (this.activeRequests === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}

