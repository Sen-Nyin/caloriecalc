"use strict";

const calcButton = document.getElementById("calculate");
const inputs = document.querySelectorAll(".user-data__input");
const defaultMessage = document.querySelector(".default-message");
const resultsContainer = document.querySelector(".results-container");

const personData = {
  gender: null,
  age: null,
  weight: null,
  height: null,
  activity: null,
  goal: null,
  meals: null,
  basal: null,
  targetCalorie: null,
  targetProtein: null,
  targetCarb: null,
  targetFat: null,
  calcBasal: function () {
    let genderDiff = this.gender === "male" ? 5 : -1.61;
    let calcWeight = this.weight * 10;
    let calcHeight = this.height * 6.25;
    let calcAge = this.age * 5;
    this.basal = Math.ceil(calcWeight + calcHeight - calcAge + genderDiff);
  },
  calcTargetCalorie: function () {
    if (this.goal === "weightLoss") {
      // (Basal * activity) - (basal * activity * goal)
      this.targetCalorie = this.basal * activityLevel[this.activity];
      this.targetCalorie = Math.ceil(
        this.targetCalorie - this.targetCalorie * goalMacro[this.goal]
      );
    } else {
      this.targetCalorie = Math.ceil(
        this.basal * activityLevel[this.activity] + goalMacro[this.goal]
      );
    }
  },
  calcMacro: function () {
    this.targetProtein = Math.ceil(
      (this.targetCalorie * (this.goal === "weightLoss" ? 0.4 : 0.3)) / 4
    );
    this.targetCarb = Math.ceil((this.targetCalorie * 0.4) / 4);
    this.targetFat = Math.ceil(
      (this.targetCalorie * (this.goal === "weightLoss" ? 0.2 : 0.3)) / 4
    );
  },
};

const activityLevel = {
  inactive: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  extraActive: 1.9,
};

const goalMacro = {
  weightLoss: 0.2,
  weightGain: 500,
  weightMaintain: 0,
};

const calorieMacro = {
  fat: 9,
  protein: 4,
  carb: 4,
};

const calculate = () => {
  personData.calcBasal();
  personData.calcTargetCalorie();
  personData.calcMacro();
  console.log(
    "Basal Metabolic Rate: ",
    personData.basal,
    "Daily calorie target: ",
    personData.targetCalorie,
    "Daily Protein: ",
    personData.targetProtein,
    "Daily Carbs: ",
    personData.targetCarb,
    "Daily Fat: ",
    personData.targetFat
  );
};

const applyResults = () => {
  const basalText = document.getElementById("basal");
  const calorieText = document.getElementById("calorie-target");
  const dailyProtein = document.getElementById("protein-daily");
  const dailyCarbs = document.getElementById("carbs-daily");
  const dailyFats = document.getElementById("fats-daily");
  const proteinMeal = document.getElementById("protein-meal");
  const carbMeal = document.getElementById("carbs-meal");
  const fatMeal = document.getElementById("fats-meal");

  basalText.textContent = personData.basal;
  calorieText.textContent = personData.targetCalorie;
  dailyProtein.textContent = personData.targetProtein;
  dailyCarbs.textContent = personData.targetCarb;
  dailyFats.textContent = personData.targetFat;
  proteinMeal.textContent = personData.targetProtein / personData.meals;
  carbMeal.textContent = personData.targetCarb / personData.meals;
  fatMeal.textContent = personData.targetFat / personData.meals;

  resultsContainer.classList.remove("hidden");
  defaultMessage.classList.add("hidden");
};

const evaluate = () => {
  const errorMessage = document.querySelector(".error");
  let invalidInput = 0;
  for (let input of inputs) {
    console.log("Checking valid");
    if (!input.value || (input.tagName === "INPUT" && input.value < 0)) {
      invalidInput++;
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  }
  if (invalidInput > 0) {
    errorMessage.classList.remove("hidden");
    defaultMessage.classList.add("hidden");
    resultsContainer.classList.add("hidden");
    return true;
  } else {
    if (!errorMessage.classList.contains("hidden"))
      errorMessage.classList.add("hidden");
    return false;
  }
};

const getInputs = () => {
  for (let input of inputs) {
    personData[input.id] = input.value;
    console.log(input.tagName);
    input.classList.remove("invalid");
  }
};

calcButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (!evaluate()) {
    getInputs();
    calculate();
    applyResults();
  }
});
