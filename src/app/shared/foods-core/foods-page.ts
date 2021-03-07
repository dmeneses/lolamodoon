import { Food } from "../models/food";

export interface FoodsPage {

   loading: boolean;
   foods: Food[];
   formStatus: string;
   filter?: {
      name: string
   };

   totalFoods: number;
}