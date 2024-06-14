import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getRecipesAsync } from "../features/recipes/recipeThunks";
import RecipeItem from "../components/RecipeItem";
import { CircularProgress, CssBaseline, Grid } from "@mui/material";
import Layout from "../components/Layout";

const RecipeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, error } = useSelector(
    (state: RootState) => state.recipes
  );
  useEffect(() => {
    dispatch(getRecipesAsync());
  }, [dispatch]);
  
  if (loading) return <CircularProgress />;

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <CssBaseline />
      <Layout>
        <Grid container spacing={3}>
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe.id}>
              <RecipeItem recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      </Layout>
    </>
  );
};
export default RecipeList;
