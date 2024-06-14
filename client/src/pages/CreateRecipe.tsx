import React from 'react';
import { useDispatch } from 'react-redux';
// import { addRecipe } from '../features/recipes/recipeThunks';
import { Recipe } from '../interfaces';
import { useNavigate  } from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import { addNewRecipeAsync } from '../features/recipes/recipeThunks';
import { AppDispatch } from '../store';

const CreateRecipe: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: Recipe = {
    name: '',
    description: '',
    ingredients: [{ name: '' }],
    image: null,
    cookingTime: 0,
  };

  const handleSubmit = (values: Recipe) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('image', values.image as File);
    }
    formData.append('cookingTime', values.cookingTime.toString());
    formData.append('ingredients', JSON.stringify(values.ingredients));
    
    dispatch(addNewRecipeAsync(formData));
    navigate('/');
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <RecipeForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRecipe;
