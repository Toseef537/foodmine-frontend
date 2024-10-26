import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from 'src/app/common/services/user.service';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);

  if (userService.currentUser.isAdmin) return true;
  router.navigateByUrl('/login')
  return false;
};
