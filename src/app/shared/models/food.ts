
export interface Food {
  foodId?: string;
  name: string;
  description?: string;
  protein: number;
  carbohydrate: number;
  fat: number;
  fiber: number;
  calories: number;
  servingSize: number;
  servingSizeUnit: string;
}