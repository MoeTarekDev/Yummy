import {
  fetchDescriptionApi,
  fetchSearchApi,
  fetchSearchApiByLetter,
  mealsCategory,
  oneCategoryPage,
  AllArea,
  OneAreaPage,
  allIngredients,
  oneIngredientPage,
} from "./api.js";
import { closeSideBar } from "./index.js";
// & HTML ELEMENTS
const searchBtn = document.querySelector(".search-btn");
const categoriesBtn = document.querySelector(".categories-btn");
const areaBtn = document.querySelector(".area-btn");
const ingredientsBtn = document.querySelector(".ingredients-btn");
const contactBtn = document.querySelector(".contact-btn");
const searchForm = document.querySelector(".search-page-form");
const searchByName = document.querySelector(".search-by-name ");
const searchByLetter = document.querySelector(".search-by-letter ");
const containerUp = document.querySelector(".container-up");
const containerBelow = document.querySelector(".container-below");
const containerDown = document.querySelector(".container-down");

// & Variables
let mealId;
let ingredientArr = [];
let strMeasure = [];
let mergedArray = [];

// &Functions

// Shows default Home Page
export function displayData(data) {
  containerBelow.innerHTML = `<div class="row gy-3"></div>`;
  for (let meal of data) {
    containerBelow.querySelector(".row").innerHTML += `
        <div class="col-md-3" meal-id="${meal.idMeal}">
          <div class="meal position-relative rounded rounded-3">
            <img
              class="rounded rounded-3"
              src="${meal.strMealThumb}"
              alt="meal image"
            />
            <div
              class="doll-parent position-absolute ps-2 fs-4 fw-bold rounded rounded-3"
            >
              <p class="doll mb-0">${meal.strMeal}</p>
            </div>
          </div>
        </div>
    `;
  }
}

// Show description page for a certain meal
export function showDescription(data) {
  searchForm.classList.add("d-none");

  for (var i = 0; i < 20; i++) {
    ingredientArr.push(data.meals[0][`strIngredient${i}`]);
  }

  for (var i = 0; i < 20; i++) {
    strMeasure.push(data.meals[0][`strMeasure${i}`]);
  }

  for (let i = 0; i < ingredientArr.length; i++) {
    mergedArray.push(`${strMeasure[i]}${ingredientArr[i]}`);
  }

  let mergedArraySet = new Set(mergedArray);
  mergedArraySet.delete(" ");
  mergedArraySet.delete("undefinedundefined");
  let myFinalIngredientArr = Array.from(mergedArraySet);

  let tagsArr = [];

  if (data.meals[0].strTags) {
    tagsArr = data.meals[0].strTags.split(",");
  } else {
    tagsArr = ["No tags available"];
  }

  containerBelow.innerHTML = "";
  containerUp.querySelector(
    ".description-parent"
  ).innerHTML = `<div class="row description min-vh-100 text-white">
      <div class="col-md-4">
        <div class="rounded rounded-3">
          <img
            class="w-100 rounded rounded-3"
            src="${data.meals[0].strMealThumb}"
            alt="dish image"
          />
          <h1 class="h3">${data.meals[0].strMeal}</h1>
        </div>
      </div>
      <div class="col-md-8">
        <div>
          <h2>Instructions</h2>
          <p>
            ${data.meals[0].strInstructions}
          </p>
          <p class="h3 fw-bold">Area : ${data.meals[0].strArea}</p>
          <p class="h3 fw-bold">Category : ${data.meals[0].strCategory}</p>
          <div>
            <p class="h3 fw-bold">Recipes :</p>
            <ul class=" ingredients-parent d-flex flex-wrap ps-0 gap-3">
            ${myFinalIngredientArr
              .map(
                (ingredient) => ` <li class="mb-0 alert alert-info px-2 py-1">
            <span>${ingredient}</span>
            </li>`
              )
              .join("")}
            </ul>
          </div>
          <div>
            <p>Tags :</p>
            <ul class=" tags-parent d-flex flex-wrap ps-0 gap-3">
            ${tagsArr
              .map(
                (tag) =>
                  `<li class="mb-0 alert alert-danger px-2 py-1">${tag}</li>`
              )
              .join("")}
            </ul>
            <ul class="d-flex flex-wrap ps-0 gap-3">
              <a class="btn btn-success" href="${
                data.meals[0].strSource
              }" target="_blank">
                source
              </a>
              <a  class="btn btn-danger" href="${
                data.meals[0].strYoutube
              }" target="_blank">Youtube
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>`;
}

// Show all food categories
export function showCategory(data) {
  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-3 "></div`;
  for (var i = 0; i < data.length; i++) {
    let categoryDescription = data[i].strCategoryDescription.split(" ");
    categoryDescription = categoryDescription.splice(0, 12).join(" ");
    containerBelow.querySelector(".row").innerHTML += `
    <div class="col-md-3">
      <div class="single-category rounded rounded-3" category-name="${data[i].strCategory}">
        <img
          class="w-100 rounded rounded-3"
          src="${data[i].strCategoryThumb}"
          alt="food category image"
        />
        <div class="rounded rounded-3 p-2">
          <h3 class="doll-second">${data[i].strCategory}</h3>
          <p class="mb-0 fw-semibold doll-second">
          ${categoryDescription}
          </p>
        </div>
      </div>
    </div>
  `;
  }
}
// Show a page of one food category
export function showOneMealCategory(data) {
  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-3"></div>`;
  for (let meal of data) {
    containerBelow.querySelector(".row").innerHTML += `
        <div class="col-md-3" meal-id="${meal.idMeal}">
          <div class="meal position-relative rounded rounded-3">
            <img
              class="rounded rounded-3"
              src="${meal.strMealThumb}"
              alt="meal image"
            />
            <div
              class="doll-parent position-absolute ps-2 fs-4 fw-bold rounded rounded-3"
            >
              <p class="doll mb-0">${meal.strMeal}</p>
            </div>
          </div>
        </div>
    `;
  }
}
// Show food area page
export function showAreaPage(data) {
  console.log(data);
  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-3 "></div`;
  for (var i = 0; i < data.length; i++) {
    containerBelow.querySelector(
      ".row"
    ).innerHTML += `    <div class="col-md-3 ">
    <div class="text-white single-area text-center" area-name="${data[i].strArea}">
      <i class=" doll-third fa-solid fa-house-laptop fa-4x"></i>
      <p class=" doll-third mb-0 fw-bold">${data[i].strArea}</p>
    </div>
  </div>`;
  }
}
// Show a selected food area page
export function showOneAreaPage(data) {
  console.log(data);
  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-3"></div>`;
  for (let meal of data) {
    containerBelow.querySelector(".row").innerHTML += `
        <div class="col-md-3" meal-id="${meal.idMeal}">
          <div class="meal position-relative rounded rounded-3">
            <img
              class="rounded rounded-3"
              src="${meal.strMealThumb}"
              alt="meal image"
            />
            <div
              class="doll-parent position-absolute ps-2 fs-4 fw-bold rounded rounded-3"
            >
              <p class="doll mb-0">${meal.strMeal}</p>
            </div>
          </div>
        </div>
    `;
  }
}
// Show Ingredients Page
export function showIngredients(data) {
  let dataModified = data.splice(0, 20);

  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-4"></div`;
  for (var i = 0; i < dataModified.length; i++) {
    let dataDescription = dataModified[i].strDescription
      .split(" ")
      .splice(0, 15)
      .join(" ");
    containerBelow.querySelector(".row").innerHTML += ` <div class="col-md-3">
    <div
      class="one-ingredient doll-four text-white d-flex flex-column align-items-center text-center" ingredient-name="${dataModified[i].strIngredient}"
    >
      <i class="fa-solid fa-drumstick-bite fa-4x doll-four"></i>
      <h3 class="h4 doll-four">${dataModified[i].strIngredient}</h3>
      <p class="mb-0 fs-6 doll-four">
     ${dataDescription}
      </p>
    </div>
  </div>`;
  }
}
// Show a selected food ingredient page
export function showOneIngredientPage(data) {
  containerBelow.innerHTML = "";
  containerBelow.innerHTML = `<div class="row gy-3"></div>`;
  for (let meal of data) {
    containerBelow.querySelector(".row").innerHTML += `
    <div class="col-md-3" meal-id="${meal.idMeal}">
      <div class="meal position-relative rounded rounded-3">
        <img
          class="rounded rounded-3"
          src="${meal.strMealThumb}"
          alt="meal image"
        />
        <div
          class="doll-parent position-absolute ps-2 fs-4 fw-bold rounded rounded-3"
        >
          <p class="doll mb-0">${meal.strMeal}</p>
        </div>
      </div>
    </div>
`;
  }
}

// function showContact() {
//   containerBelow.innerHTML = "";
//   containerBelow.innerHTML = ` <form class="row gy-3 justify-content-center">
//   <div class="col-md-6">
//     <input
//       class="name-input form-control w-100"
//       type="text"
//       placeholder="Enter Your Name"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Special characters and numbers not allowed
//     </div>
//   </div>
//   <div class="col-md-6">
//     <input
//       class="email-input form-control w-100"
//       type="email"
//       placeholder="Enter Your Email"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Email not valid *exemple@yyy.zzz
//     </div>
//   </div>
//   <div class="col-md-6">
//     <input
//       class="phone-input form-control w-100"
//       type="text"
//       placeholder="Enter Your Phone"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Enter valid Phone Number
//     </div>
//   </div>
//   <div class="col-md-6">
//     <input
//       class="age-input form-control w-100"
//       type="number"
//       placeholder="Enter Your Age"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Enter valid age
//     </div>
//   </div>
//   <div class="col-md-6">
//     <input
//       class="password-input form-control w-100"
//       type="password"
//       placeholder="Enter Your Password"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Enter valid password *Minimum eight characters, at least one
//       letter and one number:*
//     </div>
//   </div>
//   <div class="col-md-6">
//     <input
//       class="repassword-input form-control w-100"
//       type="password"
//       placeholder="Repassword"
//     />
//     <div
//       class="d-none alert alert-danger mt-3 mb-0 text-center"
//       role="alert"
//     >
//       Enter valid repassword
//     </div>
//   </div>
//   <button
//     disabled
//     type="button"
//     class="submit-btn btn btn-outline-danger"
//   >
//     Submit
//   </button>
// </form>`;
// }
// & Events
// Send The meal Id to the api Function
containerBelow.addEventListener("click", async function (e) {
  if (
    e.target.classList.contains("doll") ||
    e.target.classList.contains("doll-parent")
  ) {
    const mId =
      e.target.parentElement.parentElement.getAttribute("meal-id") ||
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "meal-id"
      );
    mealId = mId;
    await fetchDescriptionApi(mealId);
  }
});
// Show the form in the search page
searchBtn.addEventListener("click", function () {
  searchForm.classList.remove("d-none");
  containerDown.classList.add("d-none");
  containerBelow.innerHTML = "";
  containerUp.querySelector(".description-parent").innerHTML = "";
  closeSideBar();
});
// Event to show meals by name
searchByName.addEventListener("keyup", function () {
  fetchSearchApi(searchByName.value);
});
// Event to show meals by first letter
searchByLetter.addEventListener("keyup", function () {
  fetchSearchApiByLetter(searchByLetter.value);
});
// Show Categories Page
categoriesBtn.addEventListener("click", function () {
  searchForm.classList.add("d-none");
  containerDown.classList.add("d-none");
  containerUp.querySelector(".description-parent").innerHTML = "";

  mealsCategory();
  closeSideBar();
});

// Send category Name to oneCategoryPage Api
containerBelow.addEventListener("click", function (e) {
  if (e.target.classList.contains("doll-second")) {
    let categoryName =
      e.target.parentElement.parentElement.getAttribute("category-name") ||
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "category-name"
      );
    oneCategoryPage(categoryName);
  }
});
// Show All Area Page
areaBtn.addEventListener("click", function () {
  searchForm.classList.add("d-none");
  containerDown.classList.add("d-none");
  containerUp.querySelector(".description-parent").innerHTML = "";
  closeSideBar();
  AllArea();
});
// Export Area Name to The Api
containerBelow.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("single-area") ||
    e.target.classList.contains("doll-third")
  ) {
    let areaName =
      e.target.getAttribute("area-name") ||
      e.target.parentElement.getAttribute("area-name");
    OneAreaPage(areaName);
  }
});
// Show Ingredients Page
ingredientsBtn.addEventListener("click", function () {
  searchForm.classList.add("d-none");
  containerDown.classList.add("d-none");
  containerUp.querySelector(".description-parent").innerHTML = "";
  allIngredients();
  closeSideBar();
});

// Exporting Ingredient Name to the Api
containerBelow.addEventListener("click", function (e) {
  if (e.target.classList.contains("doll-four")) {
    let ingredientName =
      e.target.getAttribute("ingredient-name") ||
      e.target.parentElement.getAttribute("ingredient-name");
    oneIngredientPage(ingredientName);
  }
});

// Show Contact Us Page
contactBtn.addEventListener("click", function () {
  searchForm.classList.add("d-none");
  containerBelow.innerHTML = "";
  containerUp.querySelector(".description-parent").innerHTML = "";
  closeSideBar();
  containerDown.classList.remove("d-none");
});
