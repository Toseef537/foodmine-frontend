import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { LoadingComponent } from './common/components/loading/loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/loading.service';
import { ScrollTopModule } from 'primeng/scrolltop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,LoadingComponent,ScrollTopModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  #loadingService: LoadingService = inject(LoadingService);
  isLoading$: Observable<boolean>=this.#loadingService.isLoading;
}
