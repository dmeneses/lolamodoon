import { Food } from "./food";

export interface Diet {
  dietId?: string;
  patientId: string;
  dietSections: DietSection[];
}

export interface DietSection {
  name: string;
  foods: Food[];
}