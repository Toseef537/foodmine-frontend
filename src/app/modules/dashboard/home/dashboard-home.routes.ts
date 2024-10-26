import { Route, Routes } from "@angular/router";
import { DashboardHomeComponent } from "./home.component";
import { dashboardHomeResolver } from "./dashboard-home.resolver";

export default [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        component: DashboardHomeComponent,
        resolve: {
            dashboardHomeResolver
        }
    }

] as Routes