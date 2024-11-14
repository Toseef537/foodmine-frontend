import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { WebsiteComponent } from './layouts/website/website.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoadingService } from '../core/services/loading.service';
import { LoadingComponent } from '../common/components/loading/loading.component';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [CommonModule, LoadingComponent, WebsiteComponent, DashboardComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  layout: string = 'website';
  isLoading!: boolean;
  #LoadingService = inject(LoadingService);
  #activatedRoute = inject(ActivatedRoute);
  // constructor() {
  //   this.#LoadingService.isLoading.subscribe((loading) => {
  //     this.isLoading = loading;
  //   })
  // }
  ngOnInit(): void {
    this.#activatedRoute.data.subscribe((data) => {
      this.layout = data['layout'];
    })
  }
}
