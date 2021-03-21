
export interface Food {
  id?: string;
  name: string;
  description?: string;
  type: string;
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

export class FoodCreator {
  static createFoodFromFormValue({ id, carbohydrate, description, fat, fiber, name, protein, servingSize, servingSizeUnit, type }): Food {
    return {
      id,
      name: name?.charAt(0).toUpperCase() + name.slice(1),
      description,
      protein: +protein,
      carbohydrate: +carbohydrate,
      fat: +fat,
      fiber: +fiber,
      servingSize: +servingSize,
      servingSizeUnit,
      type
    };
  }
}
