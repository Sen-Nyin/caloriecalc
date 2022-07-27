"use strict";

const calcButton = document.getElementById("calculate");
const inputs = document.querySelectorAll(".user-data__input");

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
    if (this.goal === "weightLoss") {
      this.targetProtein = Math.ceil((this.targetCalorie * 0.4) / 4);
      this.targetCarb = Math.ceil((this.targetCalorie * 0.4) / 4);
      this.targetFat = Math.ceil((this.targetCalorie * 0.2) / 9);
    } else {
      this.targetProtein = Math.ceil((this.targetCalorie * 0.3) / 4);
      this.targetCarb = Math.ceil((this.targetCalorie * 0.4) / 4);
      this.targetFat = Math.ceil((this.targetCalorie * 0.3) / 9);
    }
  },
  allvalid: true,
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

const getInputs = () => {
  for (let input of inputs) {
    if (!input.value) {
      input.classList.toggle("invalid");
      personData.allvalid = false;
    } else {
      personData[input.id] = input.value;
    }
  }
};

calcButton.addEventListener("click", (e) => {
  e.preventDefault();
  getInputs();
  if (personData.allvalid) {
    calculate();
  }
});
