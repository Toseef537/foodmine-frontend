import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading!: boolean;
  constructor(private loadingService: LoadingService) {
    // Subscribe to the loading service to get the current loading state
    this.loadingService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
