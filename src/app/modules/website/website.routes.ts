import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { FoodDetailComponent } from "./pages/food-detail/food-detail.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { AuthGuard } from "src/app/auth/guards/auth.guard";
import { PaymentPageComponent } from "./pages/payment-page/payment-page.component";

export default [
    {
        path: 'home', loadChildren: () => import('./pages/home/home.routes')
    },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'food/:id', component: FoodDetailComponent },
    { path: 'tag/:tag', component: HomeComponent },
    { path: 'cart-page', loadChildren: () => import('./pages/cart-page/cart-page.routes') },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] }


] as Routes