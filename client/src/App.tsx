import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateRecipe from './pages/CreateRecipe';
import NotFound from './pages/NotFound';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';
const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/add" element={<CreateRecipe />} />
        <Route path="/recipe/edit/:id" element={<EditRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
