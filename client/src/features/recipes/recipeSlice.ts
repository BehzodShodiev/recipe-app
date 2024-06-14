import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
    addRecipeSuccess: boolean;
    searchText: string 
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
    addRecipeSuccess: false,
    searchText: "" 
};

const recipeSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setSearchText: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },
        resetAddRecipeSuccess: (state) => {
            state.addRecipeSuccess = false;
        },
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
                state.addRecipeSuccess = false;
            })
            .addCase(addNewRecipeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes.push(action.payload);
                state.addRecipeSuccess = true;
            })
            .addCase(addNewRecipeAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add recipe";
                state.addRecipeSuccess = false;
            })
            .addCase(editRecipeAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.addRecipeSuccess = false;
            })
            .addCase(editRecipeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.addRecipeSuccess = true;
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
                state.addRecipeSuccess = false;
            })
            .addCase(deleteRecipeAsync.pending, (state) => {
                state.loading = true;
                state.addRecipeSuccess = false;
                state.error = null;
            })
            .addCase(deleteRecipeAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.addRecipeSuccess = true;
                state.recipes = state.recipes.filter((r) => r.id !== action.payload);
            })
            .addCase(deleteRecipeAsync.rejected, (state, action) => {
                state.loading = false;
                state.addRecipeSuccess = false;
                state.error = action.error.message || "Failed to delete recipe";
            });
    },
});
export const { resetAddRecipeSuccess, setSearchText } = recipeSlice.actions;
export default recipeSlice.reducer;
