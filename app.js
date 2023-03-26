// Create Dino Constructor
function DinoContructor(species, weight, height, diet,
  imageUrl, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.imageUrl = imageUrl;
  this.fact = fact
}

DinoContructor.prototype.generateFacts = function () {
  let index = Math.floor(Math.random() * 10) % this.fact.length;
  return this.fact[index];
}

//Load Dino from dino.json "./dino.json"
let dinos = [];
const getDataJson = async () => {
  const jsonData = await fetch("./dino.json");
  dinos = jsonData.Dinos.map(value => {
    new DinoContructor(value.species, value.weight, value.height, value.imageUrl, value.fact)
  })
};

// Create Human Object
function HumanContructor(name, height, weight, diet) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.diet = diet;
}

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
document.getElementById("btn").addEventListener("onClick", function () {
  const humanObj = getHumanData();
  dinos.forEach(dino => {
    dino.compareWeight(humanObj.weight);
    dino.compareHeight(humanObj.height);
    dino.compareDiet(humanObj.diet);
  });
  document.getElementById("dino-compare").style.display = "none";

  for (let dinoIndex in dinos) {
    let dino = dinos[dinoIndex];
    let fact = dino.generateFacts();

    if (dino.weight < 1) {
      fact = "We have all birds are dinosaurs";
    }

    let gridData = addTitleToDom(dino.species, dino.image, dino.fact);
    document.getElementById("grid").appendChild(gridData);

    if (dinoIndex === 4) {
      let humanTitleDiv = addTitleToDom(humanObj.species, humanObj.imageUrl);

      document.getElementById("grid").appendChild(humanTitleDiv);
    }
  }
  document.getElementById("dino-compare").style.display = "none";
})


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
// Generate Tiles for each Dino in Array


// Remove form from screen