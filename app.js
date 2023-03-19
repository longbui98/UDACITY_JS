    // Create Dino Constructor
    function DinoContructor(species, weight, height, diet,
         where, when, fact){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact
    }

    //Load Dino from dino.json "./dino.json"
    // Create Dino Objects
    const dinoArr = [];
    const getDataJson = () => {
    return fetch("./dino.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
          return data.Dinos.map((dino) =>
            dinoArr.push(
              new DinoContructor(
              dino.species,
              dino.weight,
              dino.height,
              dino.diet,
              dino.where,
              dino.when,
              dino.fact
            )
          )
        );
      })
      .then(() => console.log(dinoArr))
      .catch((error) => {
        console.log(error);
    });
  };
  getDataJson();

    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
    // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
