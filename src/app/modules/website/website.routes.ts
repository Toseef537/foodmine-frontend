import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { FoodDetailComponent } from "./pages/food-detail/food-detail.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { PaymentPageComponent } from "./pages/payment-page/payment-page.component";
import { homeResolver } from "./pages/home/home.resolver";
import { AuthGuard } from "src/app/core/guards/auth.guard";

export default [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component:HomeComponent,
        title: 'Home | Food Mine',
        resolve: {
            homeData: homeResolver
        }
    },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'food/:id', component: FoodDetailComponent },
    { path: 'tag/:tag', component: HomeComponent },
    { path: 'cart-page',component: CartPageComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] }
] as Routes