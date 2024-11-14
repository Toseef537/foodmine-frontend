import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FOODS_URL, FOODS_BY_SEARCH_URL, FOODS_BY_ID_URL, FOODS_TAGS_URL, FOODS_BY_TAG_URL } from 'src/app/common/constants/urls';
import { IFood, ITag } from '../../models/food';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  #homePageData: BehaviorSubject<IFood[]> = new BehaviorSubject<IFood[]>([]);
  #http: HttpClient = inject(HttpClient)
  constructor() { }

  /**
   *  Getter Method For Food Items
   * */

  get homePageData$(): Observable<IFood[]> {
    return this.#homePageData.asObservable();
  }

  /**
   * Getting All Food Items
   */
  getAllFoodItems(): Observable<IFood[]> {
    return this.#http.get<IFood[]>(FOODS_URL).pipe(
      tap((data) => {
        this.#homePageData.next(data)
      })
    )
  }

  /**
   * Getting Food Items According To Search Terms
   */
  getFoodBySearchTerm(searchTerm: string) {
    return this.#http.get<IFood[]>(FOODS_BY_SEARCH_URL + searchTerm).pipe(
      map((items) => {
        this.#homePageData.next(items);
        return items;
      }
      )
    )
  }


  /**
   * Getting Food Item By ID
   */
  getFoodById(id: any): Observable<any> {
    return this.#http.get<IFood>(FOODS_BY_ID_URL + id)

  }

  /**
 * Getting All Tags
 */
  getAllTag(): Observable<ITag[]> {
    return this.#http.get<ITag[]>(FOODS_TAGS_URL);
  }

  /**
  * Getting Food Items By Tag
  */
  getFoodByTag(tag: string): Observable<IFood[]> {
    return tag === 'all' ? this.getAllFoodItems() : this.#http.get<IFood[]>(FOODS_BY_TAG_URL + tag).pipe(
      map((items) => {
        this.#homePageData.next(items);
        return items;

      }
      )
    )
  }


 


}


