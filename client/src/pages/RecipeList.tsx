import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { getRecipesAsync } from "../features/recipes/recipeThunks";
import RecipeItem from "../components/RecipeItem";
import { Box, CircularProgress, CssBaseline, Grid, Typography } from "@mui/material";
import Layout from "../components/Layout";

const RecipeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { recipes, loading, error, searchText } = useSelector(
    (state: RootState) => state.recipes
  );
  const filteredRecipeList = [...recipes].filter((recipe) =>
    recipe.name.toLowerCase().includes(searchText.toLowerCase())
  );
  useEffect(() => {
    dispatch(getRecipesAsync());
  }, [dispatch]);

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <CssBaseline />
      <Layout>
        {loading ? (
          <Box className="!w-full !flex justify-center">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredRecipeList.map((recipe) => (
              <Grid item xs={12} sm={6} md={3} key={recipe.id}>
                <RecipeItem recipe={recipe} />
              </Grid>
            ))}
            {filteredRecipeList.length == 0 && (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="!mt-10 !text-base !text-center !w-full"
              >
                No recipe found...
              </Typography>
            )}
          </Grid>
        )}
      </Layout>
    </>
  );
};
export default RecipeList;
