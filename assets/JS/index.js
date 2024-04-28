import {
  fetchSearchApi,
  fetchDescriptionApi,
  mealsCategory,
  oneCategoryPage,
  AllArea,
  OneAreaPage,
  allIngredients,
  oneIngredientPage,
} from "./api.js";

// & HTML ELEMENTS
const closeOpen = $(".close-open");
const aside = $("aside");
const loadingScreen = document.querySelector(".loading");
// & Variables
const nameRegex = /^[a-z ,.'-]+$/i;
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const nameInput = document.querySelector(".name-input");
const emailInput = document.querySelector(".email-input");
const phoneInput = document.querySelector(".phone-input");
const ageInput = document.querySelector(".age-input");
const passwordInput = document.querySelector(".password-input");
const repasswordInput = document.querySelector(".repassword-input");

// & Functions
export function closeSideBar() {
  $(closeOpen).addClass("fa-bars");
  $(closeOpen).removeClass("fa-xmark");
  aside.animate({ left: "-250" }, 500);
  $("aside ul li").animate({ bottom: "-100%" }, 800);
}
function openSideBar() {
  $(closeOpen).removeClass("fa-bars");
  $(closeOpen).addClass("fa-xmark");
  aside.animate({ left: "0" }, 500);
}

function animateList() {
  $("aside ul li:nth-child(1)").animate({ bottom: "0" }, function () {
    $("aside ul li:nth-child(2)").animate({ bottom: "0" }, 150, function () {
      $("aside ul li:nth-child(3)").animate({ bottom: "0" }, 120, function () {
        $("aside ul li:nth-child(4)").animate(
          { bottom: "0" },
          100,
          function () {
            $("aside ul li:nth-child(5)").animate({ bottom: "0" }, 80);
          }
        );
      });
    });
  });
}
export function showLoadingScreen() {
  loadingScreen.classList.remove("d-none");
  loadingScreen.classList.add("d-flex");
}
export function hideLoadingScreen() {
  loadingScreen.classList.remove("d-flex");
  loadingScreen.classList.add("d-none");
}

function validateName() {
  if (nameRegex.test(nameInput.value)) {
    nameInput.nextElementSibling.classList.add("d-none");
    return true;
  } else if (nameInput.value == "") {
    nameInput.nextElementSibling.classList.add("d-none");
    return false;
  } else {
    nameInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function validateEmail() {
  if (emailRegex.test(emailInput.value)) {
    emailInput.nextElementSibling.classList.add("d-none");
    return true;
  } else if (emailInput.value == "") {
    emailInput.nextElementSibling.classList.add("d-none");
    return false;
  } else {
    emailInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function validatePhone() {
  if (phoneRegex.test(phoneInput.value)) {
    phoneInput.nextElementSibling.classList.add("d-none");
    return true;
  } else if (phoneInput.value == "") {
    phoneInput.nextElementSibling.classList.add("d-none");
    return false;
  } else {
    phoneInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function validateAge() {
  if (ageInput.value < 1) {
    ageInput.nextElementSibling.classList.remove("d-none");
    return false;
  } else if (ageInput.value == "") {
    ageInput.nextElementSibling.classList.add("d-none");
    return false;
  } else {
    ageInput.nextElementSibling.classList.add("d-none");
    return true;
  }
}
function validatePassword() {
  if (passwordRegex.test(passwordInput.value)) {
    passwordInput.nextElementSibling.classList.add("d-none");
    return true;
  } else if (passwordInput.value == "") {
    passwordInput.nextElementSibling.classList.add("d-none");
    return false;
  } else {
    passwordInput.nextElementSibling.classList.remove("d-none");
    return false;
  }
}

function validateRepassword() {
  if (repasswordInput.value != passwordInput.value) {
    repasswordInput.nextElementSibling.classList.remove("d-none");
    return false;
  } else {
    repasswordInput.nextElementSibling.classList.add("d-none");
    return true;
  }
}
// & Events
// Slider
$(closeOpen).on("click", function () {
  if (closeOpen.hasClass("fa-bars")) {
    openSideBar();
    animateList();
  } else {
    closeSideBar();
  }
});

fetchSearchApi(" ");

//  All Events Below Belongs to Validation process
nameInput.addEventListener("input", function () {
  ShowButton();
  validateName();
});

emailInput.addEventListener("input", function () {
  validateEmail();
  ShowButton();
});

phoneInput.addEventListener("input", function () {
  validatePhone();
  ShowButton();
});

ageInput.addEventListener("input", function () {
  validateAge();
  ShowButton();
});

passwordInput.addEventListener("input", function () {
  validatePassword();
  ShowButton();
});

repasswordInput.addEventListener("input", function () {
  validateRepassword();
  ShowButton();
});

// a function to check all validations together
function ShowButton() {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateAge() &&
    validatePassword() &&
    validateRepassword()
  ) {
    document.querySelector(".submit-btn").removeAttribute("disabled");
  } else {
    document.querySelector(".submit-btn").setAttribute("disabled", true);
  }
}

ShowButton();
