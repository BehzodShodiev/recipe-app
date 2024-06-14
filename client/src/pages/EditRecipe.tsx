import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { CircularProgress, Container, Typography } from "@mui/material";
import { Recipe } from "../interfaces";
import { AppDispatch, RootState } from "../store";
import {
  editRecipeAsync,
  getRecipeByIdAsync,
} from "../features/recipes/recipeThunks";
import Layout from "../components/Layout";

const EditRecipe: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { recipe, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );
  const handleSubmit = (values: Recipe) => {
    const formData = new FormData();
    formData.append("id", id!);
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image as File);
    }
    formData.append("cookingTime", values.cookingTime.toString());
    formData.append("ingredients", JSON.stringify(values.ingredients));

    dispatch(editRecipeAsync(formData));
    navigate("/");
  };
  useEffect(() => {
    dispatch(getRecipeByIdAsync(Number(id)));
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Layout isShowSearch={false}>
      <Container>
        <Typography component="h1" variant="h5" className="text-center !mb-4">
          Edit Recipe
        </Typography>
        <RecipeForm
          initialValues={{
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            image: recipe.image,
            cookingTime: recipe.cookingTime,
          }}
          onSubmit={handleSubmit}
        />
      </Container>
    </Layout>
  );
};

export default EditRecipe;
