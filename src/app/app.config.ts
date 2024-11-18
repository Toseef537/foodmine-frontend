import { ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { DialogService} from 'primeng/dynamicdialog';
export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            newestOnTop: false
        }),
        DialogService,
    ]
};
