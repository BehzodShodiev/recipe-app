import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRecipesApi,
  addNewRecipeApi,
  editRecipeApi,
  deleteRecipeApi,
  getRecipeByIdApi,
} from "../../api/recipeApi";
import { Recipe } from "../../interfaces";

export const getRecipesAsync = createAsyncThunk(
  "recipes/getRecipesAsync",
  async (_, thunkAPI) => {
    try {
      const response = await getRecipesApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getRecipeByIdAsync = createAsyncThunk<Recipe, number>(
  "recipes/getRecipeByIdAsync",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getRecipeByIdApi(id);      
      return response;
    } catch (err) {
      return rejectWithValue("Failed to fetch recipe");
    }
  }
);

export const addNewRecipeAsync = createAsyncThunk(
  "recipes/addNewRecipeAsync",
  async (recipe: FormData, thunkAPI) => {
    try {
      const response = await addNewRecipeApi(recipe);
      console.log("RESP: ", response);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editRecipeAsync = createAsyncThunk(
  "recipes/editRecipeAsync",
  async (recipe: FormData, thunkAPI) => {
    try {
      const response = await editRecipeApi(recipe);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteRecipeAsync = createAsyncThunk(
  "recipes/deleteRecipeAsync",
  async (id: number, thunkAPI) => {
    try {
      await deleteRecipeApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
