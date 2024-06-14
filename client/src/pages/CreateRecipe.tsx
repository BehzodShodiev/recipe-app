import React from "react";
import { useDispatch } from "react-redux";
import { Recipe } from "../interfaces";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { addNewRecipeAsync } from "../features/recipes/recipeThunks";
import { AppDispatch } from "../store";
import Layout from "../components/Layout";
import { Container, Typography } from "@mui/material";

const CreateRecipe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: Recipe = {
    name: "",
    description: "",
    ingredients: [{ name: "" }],
    image: null,
    cookingTime: 0,
  };

  const handleSubmit = (values: Recipe) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image as File);
    }
    formData.append("cookingTime", values.cookingTime.toString());
    formData.append("ingredients", JSON.stringify(values.ingredients));

    dispatch(addNewRecipeAsync(formData));
    navigate('/');
  };

  return (
    <Layout isShowSearch={false}>
      <Container>
        <Typography component="h1" variant="h5" className="text-center !mb-4">
          Add Recipe
        </Typography>
        <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} />
      </Container>
    </Layout>
  );
};

export default CreateRecipe;
