const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const recipes = [];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", (req, res) => {
  res.json(recipes);
});

router.get("/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send("Recipe not found");
  res.json(recipe);
});

router.post("/add", upload.single("image"), (req, res) => {
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

router.put("/edit/:id", upload.single("image"), (req, res) => {
  const { name, description, ingredients, cookingTime } = req.body;
  const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
  if (!recipe) return res.status(404).send("Recipe not found");

  recipe.name = name;
  recipe.description = description;
  recipe.ingredients = JSON.parse(ingredients);
  recipe.cookingTime = cookingTime;
  if (req.file) {
    if (recipe.image) {
      fs.unlinkSync(recipe.image);
    }
    recipe.image = req.file.path;
  }

  res.json(recipe);
});

router.delete("/:id", (req, res) => {
  const recipeIndex = recipes.findIndex(
    (r) => r.id === parseInt(req.params.id)
  );
  if (recipeIndex === -1) return res.status(404).send("Recipe not found");

  const [deletedRecipe] = recipes.splice(recipeIndex, 1);
  if (deletedRecipe.image) {
    fs.unlinkSync(deletedRecipe.image);
  }

  res.json(deletedRecipe);
});

module.exports = router;
