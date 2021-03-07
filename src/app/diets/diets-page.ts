import { Diet } from "../shared/models/diet";

export interface DietsPage {

   loading: boolean;
   diets: Diet[];
   formStatus: string;
   filter?: {
      name: string
   };

   totalDiets: number;
}