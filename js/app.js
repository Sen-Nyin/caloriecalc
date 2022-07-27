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
    this.basal = calcWeight + calcHeight - calcAge + genderDiff;
  },
  calcTargetCalorie: function () {
    if (this.goal === "weightLoss") {
      // (Basal * activity) - (basal * activity * goal)
      this.targetCalorie = this.basal * activityLevel[this.activity];
      this.targetCalorie =
        this.targetCalorie - this.targetCalorie * goalMacro[this.goal];
    } else {
      this.targetCalorie =
        this.basal * activityLevel[this.activity] + goalMacro[this.goal];
    }
  },
  calcMacro: function () {},
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

const calculate = () => {
  personData.calcBasal();
  personData.calcTargetCalorie();
  console.log("Basal ", personData.basal, "Target ", personData.targetCalorie);
};

const getInputs = () => {
  for (let input of inputs) {
    if (!input.value) {
      input.classList.toggle("invalid");
      personData.allvalid = false;
    } else {
      personData[input.id] = input.value;
      console.log("Logged ", input.id, " as ", input.value);
    }
  }
};

calcButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("getting inputs");
  getInputs();
  console.log(personData);
  if (personData.allvalid) {
    calculate();
  }
});
