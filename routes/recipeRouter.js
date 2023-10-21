const express = require("express");
const RecipeModel = require("../models/recipeModel");
const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    const Recipe = await RecipeModel.find({ authorID: req.body.authorID });
    res.status(200).send(Recipe);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

recipeRouter.post("/create", async (req, res) => {
  const { image, title, authorID } = req.body;
  try {
    const recipe = new RecipeModel(req.body);
    const savedRecipe = await recipe.save();

    res.status(200).send(savedRecipe);
    // res.status(200).send({"msg":"Recipe  gets added to favourite"})
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

module.exports = recipeRouter;
