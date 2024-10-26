import { LatLng } from "leaflet";
import { CartItem } from "./items";

export class Order{
    id!:number;
    items!:CartItem[];
    totalPrice!:number;
    name!:string;
    address!:string;
    addressLatlng?:LatLng;
    paymentId!:string;
    createdAt!:string;
    status!:string;

}