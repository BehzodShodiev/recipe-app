import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { AppDispatch, RootState } from "../store";
import {
  deleteRecipeAsync,
  getRecipeByIdAsync,
} from "../features/recipes/recipeThunks";
import { PURE_API_URL } from "../constants";
import Layout from "../components/Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { resetAddRecipeSuccess } from "../features/recipes/recipeSlice";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { recipe, loading, error, addRecipeSuccess } = useSelector(
    (state: RootState) => state.recipes
  );
  const editRecipe = () => {
    navigate(`/recipe/edit/${id}`);
  };
  const deleteRecipe = () => {
    dispatch(deleteRecipeAsync(Number(id)));
  };

  useEffect(() => {
    console.log("jkjkjjkkj",addRecipeSuccess);
    
    if (addRecipeSuccess) {
      dispatch(resetAddRecipeSuccess());
      navigate("/");
    }
  }, [addRecipeSuccess, dispatch, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(getRecipeByIdAsync(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error loading recipe: {error}</p>;

  return (
    <Layout isShowSearch={false}>
      <Box className="relative">
        <EditIcon
          onClick={editRecipe}
          className="absolute top-0 right-10 text-blue-500 cursor-pointer"
        />
        <DeleteIcon
          onClick={deleteRecipe}
          className="absolute top-0 right-0 text-red-500 cursor-pointer"
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img
              src={`${PURE_API_URL}${recipe.image}`}
              alt={recipe.name}
              className="max-w-full max-h-[40vh] bg-cover m-auto"
            />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h4">{recipe.name}</Typography>
            <Typography variant="h6" className="!mt-6">
              Description:{" "}
            </Typography>
            <Typography paragraph className="!mt-4">
              {recipe.description}
            </Typography>
            <Typography variant="h6">Ingredients: </Typography>
            <List sx={{ listStyleType: "disc" }} className="!ps-5">
              {recipe.ingredients.map((ingredient, index) => (
                <ListItem key={index} sx={{ display: "list-item" }}>
                  <ListItemText primary={ingredient.name} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">Cooking Time:</Typography>
            <Typography paragraph className="!mt-4">
              {recipe.cookingTime} minutes
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default RecipeDetail;
