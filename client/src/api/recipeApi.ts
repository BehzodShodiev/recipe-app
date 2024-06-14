import axios from "axios";
import { Recipe } from "../interfaces";

const API_URL = "https://recipe-amoo8u2pr-behzods-projects-4907afc4.vercel.app/api/recipes";

export const getRecipesApi = async (): Promise<Recipe[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRecipeByIdApi = async (id: number): Promise<Recipe> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addNewRecipeApi = async (
  recipeData: FormData
): Promise<Recipe> => {
  const response = await axios.post(`${API_URL}/add`, recipeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const editRecipeApi = async (recipeData: FormData): Promise<Recipe> => {
  const response = await axios.put(
    `${API_URL}/edit/${recipeData.get("id")}`,
    recipeData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteRecipeApi = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
