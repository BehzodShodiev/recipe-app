import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces";
import {
  addNewRecipeAsync,
  deleteRecipeAsync,
  editRecipeAsync,
  getRecipeByIdAsync,
  getRecipesAsync,
} from "./recipeThunks";

interface RecipesState {
  recipes: Recipe[];
  recipe: Recipe,
  loading: boolean;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  recipe: {
    name: "",
    description: "",
    ingredients: [],
    image: null,
    cookingTime: 0
  },
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getRecipesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      })
      .addCase(getRecipeByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.recipe = action.payload;
      })
      .addCase(getRecipeByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipe";
      })
      .addCase(addNewRecipeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewRecipeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
      })
      .addCase(addNewRecipeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add recipe";
      })
      .addCase(editRecipeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRecipeAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
      })
      .addCase(editRecipeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit recipe";
      })
      .addCase(deleteRecipeAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecipeAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      })
      .addCase(deleteRecipeAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete recipe";
      });
  },
});

export default recipeSlice.reducer;
