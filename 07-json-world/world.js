// I made my world GTA5 los santos, while reddit would argue what is a region and what is a city i gave up and made this informal.
import fs from "fs";

let world; 

try {
    let filecontent = fs.readFileSync("world.json", "utf-8");
    world = JSON.parse(filecontent); 
    console.log(world);
} catch(error) {
    console.error("Error reading or parsing world.json:", error);
}

// function to print out towns
function printTowns(world) {
    console.log("Towns in Los Santos:", world.regions[0].towns);
}
printTowns(world);