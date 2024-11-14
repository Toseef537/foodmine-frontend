import { Component, inject } from '@angular/core';
import { CommonModule, NgFor, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';
import { NotFoundComponent } from 'src/app/common/components/not-found/not-found.component';
import { IFood, ITag } from 'src/app/core/models/food';
import { UserService } from 'src/app/core/services/user.service';
import { HomeService } from 'src/app/core/services/website/home.service';

@Component({
  selector: 'website-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgFor, RouterLink, SearchComponent, RouterLinkActive, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  foodItems!: IFood[];
  tags: ITag[] = [];
  searchValue: any;
  #homeService: HomeService = inject(HomeService);
  #router: Router = inject(Router);
  #userService: UserService = inject(UserService);
  isAuth = this.#userService.currentUser()?.token;

  /**
   * Getting All Food Items
   */
  constructor(activatedRoute: ActivatedRoute) {
    this.#homeService.getAllTag().subscribe((tags) => {
      this.tags = tags;
    })
    activatedRoute.params.subscribe((param) => {
      if (param['searchTerm']) {
        this.#homeService.getFoodBySearchTerm(param['searchTerm']).subscribe((items) => {
          this.foodItems = items;
        });

      } else if (param['tag']) {
        this.#homeService.getFoodByTag(param['tag']).subscribe((items) => {
          this.foodItems = items;
        })
      }
      else {
        // if(this.isAuth){
        //   activatedRoute.data.subscribe((res)=>{
        //     console.log('data from resolvers',res);
        //     this.foodItems=res['homeData'].homeData;
        //   })
        // }else{
        //   this.#homeService.getAllFoodItems().subscribe((foods)=>{
        //     this.foodItems=foods;
        //   })
        // }
        this.#homeService.getAllFoodItems().subscribe((foods) => {
          this.foodItems = foods;
        })
      }
    })
  }

  /**
    * Getting Searched Food Items
    */

  search(searchValue: string) {
    this.#router.navigate(['/search/' + searchValue])
  }
















  items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' }
  ];

  draggedItem: any;

  onDragStart(event: DragEvent, item: any) {
    this.draggedItem = item;
    event.dataTransfer?.setData('text/plain', JSON.stringify(item));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow dropping
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain');
    if (data) {
      const droppedItem = JSON.parse(data);
      console.log('Dropped Item:', droppedItem);
      // Handle the dropped item here (e.g., add to a list, remove from original position, etc.)
    }
    this.draggedItem = null; // Clear the reference after drop
  }
}
