
export interface Food {
  id?: string;
  name: string;
  description?: string;
  protein: number;
  carbohydrate: number;
  fat: number;
  fiber: number;
  servingSize: number;
  servingSizeUnit: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  updatedBy?: string;
}
