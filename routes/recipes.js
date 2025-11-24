const express = require('express');
const router = express.Router();
const Recipe = require('../Models/Recipe');

// --- INDEX ROUTE ---
// GET /recipes
router.get('/', async (req, res) => {
    try {
        // Find all recipes in the DB
        const recipes = await Recipe.find({});
        res.render('recipes/index', { recipes: recipes, title: 'Recipe Directory' });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching recipes");
    }
});

// --- NEW ROUTE ---
// GET /recipes/new
router.get('/new', (req, res) => {
    res.render('recipes/new', { title: 'Add New Recipe' });
});

// --- CREATE ROUTE  ---
// POST /recipes
router.post('/', async (req, res) => {
    try {
        // Create new recipe using form data
        await Recipe.create(req.body.recipe);
        res.redirect('/recipes');
    } catch (err) {
        console.log(err);
        res.render('recipes/new', { title: 'Add New Recipe' });
    }
});

// --- SHOW ROUTE  ---
// GET /recipes/:id
router.get('/:id', async (req, res) => {
    try {
        // Find recipe by ID provided in URL
        const foundRecipe = await Recipe.findById(req.params.id);
        res.render('recipes/show', { recipe: foundRecipe, title: foundRecipe.title });
    } catch (err) {
        res.redirect('/recipes');
    }
});

// --- EDIT ROUTE ---
// GET /recipes/:id/edit
router.get('/:id/edit', async (req, res) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id);
        res.render('recipes/edit', { recipe: foundRecipe, title: 'Edit Recipe' });
    } catch (err) {
        res.redirect('/recipes');
    }
});

// --- UPDATE ROUTE  ---
// PUT /recipes/:id
router.put('/:id', async (req, res) => {
    try {
        // Find by ID and update with new data
        await Recipe.findByIdAndUpdate(req.params.id, req.body.recipe);
        res.redirect('/recipes/' + req.params.id);
    } catch (err) {
        res.redirect('/recipes');
    }
});

// --- DELETE ROUTE ---
// DELETE /recipes/:id
router.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/recipes');
    } catch (err) {
        res.redirect('/recipes');
    }
});

module.exports = router;