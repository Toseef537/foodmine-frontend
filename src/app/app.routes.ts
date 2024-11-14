import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './common/components/page-not-found/page-not-found.component';
import { dashboardGuard } from './core/guards/dashboard.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'website'
        },
        children: [
            { path: '', loadChildren: () => import('./modules/website/website.routes') },
            { path: 'auth', loadChildren: () => import('./modules/auth/auth.routes') }

        ]
    },
    {
        path: 'dashboard',
        canActivate: [dashboardGuard],
        component: LayoutComponent,
        data: {
            layout: 'dashboard'
        },
        children: [
            { path: '', loadChildren: () => import('./modules/dashboard/dashboard.routes') },
        ]

    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
