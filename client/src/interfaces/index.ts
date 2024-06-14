export interface Ingredient {
  name: string;
}

export interface Recipe {
  id?: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  image: File | null;
  cookingTime: number;
}
