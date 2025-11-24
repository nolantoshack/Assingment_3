// --- IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config(); // Load environment variables

// Import Routes
const recipeRoutes = require('./routes/recipes');

const app = express();

// --- DATABASE CONNECTION ---
// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// --- MIDDLEWARE ---
// Set EJS as the view engine for templating
app.set('view engine', 'ejs');
// Allow serving static files (css, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));
// Method override allows us to use PUT and DELETE in HTML forms
app.use(methodOverride('_method'));

// --- ROUTES ---

// 1. Landing Page (Splash Page)
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome' });
});

// 2. Use Recipe Routes for anything starting with /recipes
app.use('/recipes', recipeRoutes);

// --- SERVER START ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});