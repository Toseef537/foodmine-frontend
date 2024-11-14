import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { CartService } from 'src/app/core/services/website/cart.service';

@Component({
  selector: 'website-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatMenuModule, MatIconModule,NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  totalCount: number = 0;
  user!: User;
  #cartService: CartService = inject(CartService);
  #userService: UserService = inject(UserService);
  constructor() {
    this.#cartService.getCartObservable().subscribe((res) => {
      this.totalCount = res.totalCount;
    })
    this.#userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })

  }
 get isAuth(){
  return this.user.token;
 }

  logout(){
    this.#userService.logout();
  }
}
