const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// In-memory storage for recipes
const recipes = [];

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all recipes
router.get("/", (req, res) => {
  res.json(recipes);
});

// Get a single recipe by ID
router.get("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send("Recipe not found");
  res.json(recipe);
});

// Add a new recipe
router.post("/add", upload.single("image"), (req, res) => {
    console.log(req, res);
  const { name, description, ingredients, cookingTime } = req.body;
  const image = req.file ? req.file.path : null;
  const newRecipe = {
    id: recipes.length + 1,
    name,
    description,
    ingredients: JSON.parse(ingredients),
    image,
    cookingTime,
  };
  recipes.push(newRecipe);
  res.status(201).json(newRecipe);
});

// Edit a recipe
router.put("/edit/:id", upload.single("image"), (req, res) => {
  const { name, description, ingredients, cookingTime } = req.body;
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send("Recipe not found");

  recipe.name = name;
  recipe.description = description;
  recipe.ingredients = JSON.parse(ingredients);
  recipe.cookingTime = cookingTime;
  if (req.file) {
    // Delete the old image if exists
    if (recipe.image) {
      fs.unlinkSync(recipe.image);
    }
    recipe.image = req.file.path;
  }

  res.json(recipe);
});

// Delete a recipe
router.delete("/:id", (req, res) => {
  const recipeIndex = recipes.findIndex(
    (r) => r.id === parseInt(req.params.id)
  );
  if (recipeIndex === -1) return res.status(404).send("Recipe not found");

  const [deletedRecipe] = recipes.splice(recipeIndex, 1);
  // Delete the image if exists
  if (deletedRecipe.image) {
    fs.unlinkSync(deletedRecipe.image);
  }

  res.json(deletedRecipe);
});

module.exports = router;
