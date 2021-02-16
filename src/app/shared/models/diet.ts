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
  calories: number;
  servingSize: number;
  servingSizeUnit: string;
}