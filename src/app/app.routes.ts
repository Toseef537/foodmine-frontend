import { Routes } from '@angular/router';;
import { HomeComponent } from './modules/website/pages/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { dashboardGuard } from './auth/guards/dashboard.guard';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'website'
        },
        children: [
            { path: '', loadChildren: () => import('./modules/website/website.routes') }
        ]


    },
    {
        path: 'dashboard',
        canActivate:[dashboardGuard],
        component: LayoutComponent,
        data: {
            layout: 'dashboard'
        },
        children: [
            { path: '', loadChildren: () => import('./modules/dashboard/dashboard.routes') },
          ]

    },
    {
        path:'**',
        component:PageNotFoundComponent
    }
];
