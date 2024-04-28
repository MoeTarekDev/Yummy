import {
  displayData,
  showDescription,
  showCategory,
  showOneMealCategory,
  showAreaPage,
  showOneAreaPage,
  showIngredients,
  showOneIngredientPage,
} from "./display.js";

import { showLoadingScreen, hideLoadingScreen } from "./index.js";
// Search Api by Name

export async function fetchSearchApi(mealName) {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
  );
  let data = await response.json();
  displayData(data.meals);
  hideLoadingScreen();
}
// Search Api by 1st  letter
export async function fetchSearchApiByLetter(letter) {
  showLoadingScreen();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let data = await response.json();
  displayData(data.meals);
  hideLoadingScreen();
}
// Meal Description Api
export async function fetchDescriptionApi(mealId) {
  showLoadingScreen();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await response.json();
  showDescription(data);
  hideLoadingScreen();
}

// Meals Categories Api
export async function mealsCategory() {
  showLoadingScreen();
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  let data = await response.json();
  showCategory(data.categories);
  hideLoadingScreen();
}
// Api to show a Single food Category Page
export async function oneCategoryPage(categoryName) {
  showLoadingScreen();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let data = await response.json();
  showOneMealCategory(data.meals);
  hideLoadingScreen();
}
// Api to Show All Area Page
export async function AllArea() {
  showLoadingScreen();

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let data = await response.json();
  showAreaPage(data.meals);
  hideLoadingScreen();
}
// Api to Show Page of a Single Area
export async function OneAreaPage(areaName) {
  showLoadingScreen();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let data = await response.json();
  showOneAreaPage(data.meals);
  hideLoadingScreen();
}
// Api to Show a Page of All Ingredients(max of 20)
export async function allIngredients() {
  showLoadingScreen();

  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  let data = await response.json();
  showIngredients(data.meals);
  hideLoadingScreen();
}
// Api to Show a page of a selected ingredient
export async function oneIngredientPage(ingredientName) {
  showLoadingScreen();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );

  let data = await response.json();
  showOneIngredientPage(data.meals);
  hideLoadingScreen();
}
