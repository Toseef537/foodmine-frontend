import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  /**
   * Intercepts HTTP requests to show and hide the loading spinner.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Trigger loading spinner before the request starts
    this.loadingService.showLoading();

    return next.handle(req).pipe(
      // Hide spinner when the request is finalized (completed or errored)
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
