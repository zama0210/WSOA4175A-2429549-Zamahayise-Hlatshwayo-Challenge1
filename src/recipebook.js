import React, { useState } from "react";

// Import the images
import LambCurry from "./images/Lamb_Curry.jpeg";
import VegetablePotstickers from "./images/Vegetable_Potstickers.jpeg";
import KetoBreakfastBowl from "./images/Keto_Breakfast_Bowl.jpeg";
import SpicyChickenMayoTramezzini from "./images/Spicy_Chicken_Mayo_Tramezzini.jpeg";
import KoreanBeefBulgogi from "./images/Bulgogi.jpeg";
import EggsBenedict from "./images/Eggs_Benedict.jpeg";
import SeafoodPasta from "./images/Seafood_Pasta.jpeg";
import ChocolateBrownies from "./images/Chocolate_Brownies.jpeg";
import HashBrowns from "./images/Hashbrowns.jpeg";
import AmericanPancakes from "./images/American_Pancakes.jpeg";
import SoyGarlicFriedChicken from "./images/Soy_Garlic_Fried_Chicken.jpeg";

const recipesData = [
  {
    id: 1,
    name: "Lamb Curry",
    type: "lamb",
    cookingTime: "1 hour 40 minutes",
    serving: "6",
    image: LambCurry,
  },
  {
    id: 2,
    name: "Vegetable Potstickers",
    type: "vegetarian",
    cookingTime: "40 minutes",
    serving: "6",
    image: VegetablePotstickers,
  },
  {
    id: 3,
    name: "Keto Breakfast Bowl",
    type: "keto",
    cookingTime: "15 minutes",
    serving: "1",
    image: KetoBreakfastBowl,
  },
  {
    id: 4,
    name: "Spicy Chicken Mayo Tramezzini",
    type: "chicken",
    cookingTime: "40 minutes",
    serving: "1",
    image: SpicyChickenMayoTramezzini,
  },
  {
    id: 5,
    name: "Korean Beef Bulgogi",
    type: "beef",
    cookingTime: "3 hours",
    serving: "6",
    image: KoreanBeefBulgogi,
  },
  {
    id: 6,
    name: "Eggs Benedict",
    type: "breakfast",
    cookingTime: "30 minutes",
    serving: "4",
    image: EggsBenedict,
  },
  {
    id: 8,
    name: "Seafood Pasta",
    type: "seafood",
    cookingTime: "40 minutes",
    serving: "4",
    image: SeafoodPasta,
  },
  {
    id: 9,
    name: "Chocolate Brownies",
    type: "dessert",
    cookingTime: "35 minutes",
    serving: "12",
    image: ChocolateBrownies,
  },
  {
    id: 10,
    name: "Hash Browns",
    type: "breakfast",
    cookingTime: "35 minutes",
    serving: "4",
    image: HashBrowns,
  },
  {
    id: 11,
    name: "Pancakes",
    type: "dessert",
    cookingTime: "35 minutes",
    serving: "10",
    image: AmericanPancakes,
  },
  {
    id: 12,
    name: "Soy Garlic Fried Chicken (닭강정)",
    type: "chicken",
    cookingTime: "40 minutes",
    serving: "6",
    image: SoyGarlicFriedChicken,
  },
];

//Displays individual recipe details that will be on the card
const Recipe = ({ recipe, toggleFavorite }) => (
  <div className="recipe-box">
    <div className="recipe-image">
      <img className="recipe-img" src={recipe.image} alt={recipe.name} />
    </div>

    <div className="recipe-details">
      <h2 className="recipe-title">{recipe.name}</h2>
      <p className="recipe-category">
        <strong>Type:</strong> {recipe.type}
      </p>
      <p>
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </p>
      <p>
        <strong>Serving:</strong> {recipe.serving}
      </p>
      <button onClick={() => toggleFavorite(recipe.id)}>
        {recipe.favorite ? "Unfavourite" : "Favourite"}
      </button>
    </div>
  </div>
);

//Displays a list of recipes
const RecipeList = ({ recipes, toggleFavorite }) => (
  <div className="recipe-list">
    {recipes.map((recipe) => (
      <Recipe key={recipe.id} recipe={recipe} toggleFavorite={toggleFavorite} />
    ))}
  </div>
);

const Filter = ({ onChange }) => (
  <div className="filter-container">
    <div className="filter-label">Filter by:</div>
    <select onChange={onChange} className="filter-select">
      <option value="">All</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="lamb">Lamb</option>
      <option value="chicken">Chicken</option>
      <option value="beef">Beef</option>
      <option value="breakfast">Breakfast</option>
      <option value="seafood">Seafood</option>
      <option value="dessert">Dessert</option>
    </select>
  </div>
);

const Search = ({ onChange }) => (
  <div className="search-container">
    <div className="search-label">Search:</div>
    <input type="text" onChange={onChange} className="search-input" />
  </div>
);

// Main RecipeBook component
const RecipeBook = () => {
  const [filter, setFilter] = useState(""); // State for filtering recipes
  const [search, setSearch] = useState(""); // State for searching recipes
  const [recipes, setRecipes] = useState(recipesData); // State for storing recipes
  const [showingFavorites, setShowingFavorites] = useState(false); // State for storing recipes

  // Filter recipes based on type, search query, and showing favorites
  const filteredRecipes = recipes.filter((recipe) => {
    if (filter && recipe.type !== filter) return false; //If a filter is applied and the recipe type doesn't match the filter, exclude it
    if (search && !recipe.name.toLowerCase().includes(search.toLowerCase()))
      return false; //If a search query is provided and the recipe name doesn't contain the search query, exclude it

    if (showingFavorites && !recipe.favorite) return false;
    return true; // If the recipe passes all conditions, include it in the filtered recipes list
  });

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const toggleFavorite = (id) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
  };

  const showFavorites = () => {
    setFilter("");
    setShowingFavorites(true);
  };

  const resetFilter = () => {
    setShowingFavorites(false);
    setFilter("");
    setSearch("");
  };

  return (
    <div>
      <div className="hero-section">
        <h1>Recipe Book</h1>
      </div>
      <div className="filter-container">
        <Filter onChange={handleFilterChange} />
        <Search onChange={handleSearchChange} />
        {!showingFavorites && (
          <button onClick={showFavorites} className="favorite-button">
            Show Favourites
          </button>
        )}
        {showingFavorites && (
          <button onClick={resetFilter} className="favorite-button">
            Show All Recipes
          </button>
        )}
      </div>
      <RecipeList recipes={filteredRecipes} toggleFavorite={toggleFavorite} />
    </div>
  );
};

/*onChange: This is an event handler commonly used with form elements like <input> and <select>. It fires whenever the value of the input or select element changes.
handleFilterChange: This is a function passed as a prop to the <Filter> component. It is triggered when the user selects a different option in the filter dropdown menu.
handleSearchChange: Similar to handleFilterChange, this function is passed as a prop to the <Search> component and is triggered when the user types into the search input field. */
export default RecipeBook;
