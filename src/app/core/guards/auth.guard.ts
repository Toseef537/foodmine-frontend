import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  if (userService.isVerified) return true;
  router.navigate(['/auth/login'], { queryParams: { returnurl: state.url } })
  return false;
};
