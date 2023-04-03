const { human } = require("i/lib/inflections");

// Create Dino Constructor
function DinoContructor(species, weight, height, diet) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

DinoContructor.prototype.generateFacts = function () {
  let index = Math.floor(Math.random() * 10) % this.fact.length;
  return this.fact[index];
}

//Load Dino from dino.json "./dino.json"
const getDinoDataJson = async () => {
  const jsonData = await fetch("./dino.json");
  const dinos = jsonData.Dinos.map(value => {
    return new DinoContructor(value.species, value.weight, value.height, value.diet, value.imagesUrl);
  })
  generateAndDisplayTitle(dinos);
};

// Create Human Object
function HumanContructor(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

//Create Dino Object
let dino = new DinoContructor();

// Use IIFE to get human data from form         
const getHumanData = (function () {
  return function () {
    const name = document.getElementById("name").value;
    const weight = document.getElementById("weight").value * 0.453;
    const height = document.getElementById("feet").value * 30.48 + document.getElementById("inches").value * 2.54;
    const diet = document.getElementById("diet").value.toLowerCase();

    return new HumanContructor(name, weight, height, diet);
  }
})();

const human = getHumanData();
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
DinoContructor.prototype.compareWeight = (weight) => {
  if (this.weight > weight) {
    this.fact = `${this.species} is heavier than ${weight} is ${this.weight} - ${weight}`;
    return fact;
  } else if (this.weight < weight) {
    this.fact = `${this.species} is ligher than ${weight} is ${weight} - ${this.weight}`;
    return fact;
  } else {
    this.fact = `${this.species} is equal than ${weight}`;
    return fact;
  }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoContructor.prototype.compareHeight = (height) => {
  if (dino.height > height) {
    this.fact = `${this.species} is taller than ${height} is ${this.height} - ${height}`;
    return fact;
  } else if (this.height < height) {
    this.fact = `${this.species} is shorer than ${height} is ${height} - ${this.height}`;
    return fact;
  } else {
    this.fact = `${this.species} is equal than ${height}`;
    return fact;
  }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
DinoContructor.prototype.compareDiet = (diet) => {
  if (this.diet === diet) {
    this.fact = `${this.species} has diet like human`;
    return fact;
  } else {
    this.fact = `${this.species} is diet different than human`;
    return fact;
  }
}

// On button click, prepare and display infographic
const generateAndDisplayTitle = (dinosArray) => {
  let updateDinoArray = [];
  const fixedArray = [1, 1, 1, 0, 0, 0, 0];

  shuffle(fixedArray);

  let getPigeonIndex = dinosArray.findIndex(index => index.species === 'Piegon');
  fixedArray.splice(getPigeonIndex, 0, 0);

  dinosArray.forEach((dinoData, index) => {
    dino.species = dinoData.species;
    dino.height = dino.height;
    dino.weight = dinoData.weight;
    dino.diet = dinoData.diet;
    dino.imagesUrl = dinoData.imagesUrl;
    //Check whether we get to the index that we use three methods that we created above
    if (fixedArray[index]) {
      let generateRandomNumber = Math.floor(Math.random() * 3) + 1;
      if (dinoData instanceof HumanContructor) {
        generateRandomNumber = -1;
      }
      switch (generateRandomNumber) {
        case 1:
          dino.compareHeight(dinoData.height);
          break;
        case 2:
          dino.compareWeight(dinoData.weight);
          break;
        case 3:
          dino.compareDiet(dinoData.diet);
          break;
        default:
          break;
      }
    } else {
      dino.fact = dinoData.fact;
    }
    updateDinoArray.push(JSON.parse(JSON.stringify(dino)));
  })
  //Append human data into the middle of the grid
  updateDinoArray.splice(4, 0, human);
  updateDinoArray.forEach((updateGrid) => {
    addTitleToDom(updateGrid.species, updateGrid.imagesUrl, updateGrid.facts);
  })
}

//Algorithm for shuffling array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

// Add tiles to DOM
const addTitleToDom = function (species, imagesUrl, facts) {
  let gridItemDiv = document.createElement("div");
  gridItemDiv.className = "grid-item";

  let speciesDiv = document.createElement("h2");
  speciesDiv.innerText = species;
  gridItemDiv.appendChild(speciesDiv);

  let imagesUrlDiv = document.createElement("img");
  imagesUrlDiv.src = imagesUrl;
  gridItemDiv.appendChild(imagesUrlDiv);

  //We do not need to add facts if grid is Human
  if (facts) {
    let factsDiv = document.createElement("p");
    factsDiv.innerText = facts;
    gridItemDiv.appendChild(factsDiv);
  }

  return gridItemDiv;
}
// Remove form from screen
function removeForm() {
  const form = document.querySelector('#dino-compare');
  form.style.display = "none";
}
// Function to get data from dino.json, human data and remove form when user click
function compare() {

  getDinoDataJson();

  getHumanData;

  removeForm();
}

const compare_button = document.querySelector('#btn');
compare_button.addEventListener('click', compare); 