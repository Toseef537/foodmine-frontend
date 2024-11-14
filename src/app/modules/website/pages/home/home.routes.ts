import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { homeResolver } from "./home.resolver";

export default [
    {
        path: '', component: HomeComponent,
        title: 'Home | Food Mine',
        resolve: {
            homeData: homeResolver
        }
    },



] as Routes