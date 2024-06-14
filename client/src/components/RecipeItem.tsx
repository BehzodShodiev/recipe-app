import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Recipe } from "../interfaces";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { PURE_API_URL } from "../constants";
interface RecipeItemProps {
  recipe: Recipe;
}
const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const goToRecipe = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  return (
    <Card className="max-w-xs rounded overflow-hidden shadow-lg">
      <CardMedia
        component="img"
        height="140"
        image={`${PURE_API_URL}${recipe.image}`}
        alt="Recipe Image"
        className="h-48"
      />
      <CardContent className="p-4">
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="!font-bold !text-black !text-base"
        >
          {recipe.name}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className="!mt-2 !text-sm"
        >
          Preparation time: <AccessTimeIcon /> {recipe.cookingTime} minutes
        </Typography>
      </CardContent>
      <Button
        className="w-full !bg-blue-400 !font-semibold !text-white !normal-case !rounded-none"
        onClick={goToRecipe}
      >
        See the recipe
      </Button>
    </Card>
  );
};
export default RecipeItem;
