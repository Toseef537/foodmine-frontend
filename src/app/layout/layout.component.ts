import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HomeComponent } from 'src/app/modules/website/pages/home/home.component';
import { LoadingComponent } from 'src/app/common/components/loading/loading.component';
import { LoadingService } from 'src/app/common/services/loading.service';
import { WebsiteComponent } from './layouts/website/website.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

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
  constructor() {
    this.#LoadingService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    })
  }
  ngOnInit(): void {
    this.#activatedRoute.data.subscribe((data) => {
      this.layout = data['layout'];
    })
  }
}
