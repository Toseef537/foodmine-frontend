import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { IFood, ITag } from 'src/app/core/models/food';
import { UserService } from 'src/app/core/services/user.service';
import { HomeService } from 'src/app/core/services/website/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'website-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgFor, RouterLink, SearchComponent, RouterLinkActive, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  foodItems!: IFood[];
  tags: ITag[] = [];
  searchValue: any;
  #homeService: HomeService = inject(HomeService);
  #router: Router = inject(Router);
  #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  #userService: UserService = inject(UserService);
  isAuth = this.#userService.currentUser?.token;
  subscription!: Subscription;

  /**
   * Getting All Food Items
   */
  constructor(activatedRoute: ActivatedRoute) {
    // this.#homeService.getAllTag().subscribe((tags) => {
    //   this.tags = tags;
    // })
    // activatedRoute.params.subscribe((param) => {
    //   if (param['searchTerm']) {
    //     this.#homeService.getFoodBySearchTerm(param['searchTerm']).subscribe((items) => {
    //       this.foodItems = items;
    //     });

    //   } else if (param['tag']) {
    //     this.#homeService.getFoodByTag(param['tag']).subscribe((items) => {
    //       this.foodItems = items;
    //     })
    //   }
    //   else {
    //     if(this.isAuth){
    //       activatedRoute.data.subscribe((res)=>{
    //         console.log('data from resolvers',res);
    //         this.foodItems=res['homeData'].homeData;
    //       })
    //     }else{
    //       this.#homeService.getAllFoodItems().subscribe((foods)=>{
    //         this.foodItems=foods;
    //       })
    //     }
    //     this.#homeService.getAllFoodItems().subscribe((foods) => {
    //       this.foodItems = foods;
    //     })
    //   }
    // })
  }

  ngOnInit() {
    this.subscription = this.#activatedRoute.data.subscribe({
      next: ({ homeData }) => {
        this.foodItems = homeData.foodItems;
        this.tags = homeData.tags;
      },
      error: (err) => {
        console.error('Error loading home data:', err);
      }
    });
  }

  /**
    * Getting Searched Food Items
    */

  search(searchValue: string) {
    this.#router.navigate(['/search/' + searchValue])
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
