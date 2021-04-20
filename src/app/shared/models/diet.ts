import { Food } from "./food";

export interface Diet {
  id?: string;
  name: string;
  patientsIds: string[];
  dietSections: DietSection[];
  createdDate?: Date;
  updatedDate?: Date;
  notes: DietNote[]
}

export interface DietNote {
  note: string;
  createdDate?: Date;
  updatedDate?: Date;
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
  servingSize: number;
  servingSizeUnit: string;
}