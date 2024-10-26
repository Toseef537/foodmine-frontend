import { Routes } from "@angular/router";
import { OrdersPageComponent } from "./orders-page/orders-page.component";

export default [
    {
        path: '', loadChildren: () => import('./home/dashboard-home.routes')
    },
    {
        path:'orders',
        component:OrdersPageComponent
    }

] as Routes