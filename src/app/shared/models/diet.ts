import { Food } from "./food";

export interface Diet {
  dietId?: string;
  name: string;
  patientsIds: string[];
  dietSections: DietSection[];
}

export interface DietSection {
  name: string;
  foods: DietFood[];
}

export interface DietFood {
  food?: Food;
  protein?: number;
  carbohydrate?: number;
  fat?: number;
  fiber?: number;
  calories?: number;
  foodType?: string;
  servingSize: number;
  servingSizeUnit: string;
}