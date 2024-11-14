import { CartItem } from "./items";

export class Cart {
    id!:string;
    items: CartItem[] = [];
    totalPrice: number = 0;
    totalCount: number = 0;
}