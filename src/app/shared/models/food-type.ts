export enum FoodType {
  protein = 'protein',
  carbohydrate = 'carbohydrate',
  fat = 'fat',
  vegetable = 'vegetable',
}

export const FoodTypeTranslationMap = {
  [FoodType.protein]: 'Proteína',
  [FoodType.carbohydrate]: 'Carbohidrato',
  [FoodType.fat]: 'Grasa',
  [FoodType.vegetable]: 'Verduras',
}