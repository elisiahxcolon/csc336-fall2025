// Get a reference to the button.
let button = document.querySelector("#callbackDemoButton");

// Example 1. Creating a named function and passing it in to the
// event listener.
//
// function clickEventHappened(e) {
//     getAndDisplayDogImage();
// }
// button.addEventListener("click", clickEventHappened);

// Example 2. Using an anonymous arrow function with the more verbose syntax
// button.addEventListener("click", (e) => { getAndDisplayDogImage() });

// Example 3. Using an anonymous arrow function with the more minimal syntax
button.addEventListener("click", e => getAndDisplayDogImage() );



// Just for fun, we will store the time when the request is made in
// this variable, and then when the request is complete we will print
// out how much time has passed.
let timeBeforeRequest;

/*
// This commented chunk shows one example of how to make a fetch request
// to a server, and how to assign functions to be fulfilled when a request
// is complete.
timeBeforeRequest = Date.now();
let dogRequest = fetch("https://dog.ceo/api/breeds/image/random");
dogRequest
    .then( (dogResponse) => { return dogResponse.json() })
    .then( (dogData) => { 
        let timePassed = Date.now() - timeBeforeRequest;
        console.log(`It took ${timePassed} for the request.`);
        console.log(dogData);
        let dogImageHTML = document.createElement("img");
        dogImageHTML.width = 200;
        dogImageHTML.src = dogData.message;
        document.querySelector("#dogDiv").appendChild(dogImageHTML);
    })
    .catch( () => console.log("something went wrong") );
*/


// This example is exactly the same as the above, but uses the async/await
// keywords (helpful "syntactic sugar") to make it more legible.
async function getAndDisplayDogImage() {
    timeBeforeRequest = Date.now();

    let dogResponse = await fetch("https://dog.ceo/api/breeds/image/random");
    let dogData = await dogResponse.json();

    let timePassed = Date.now() - timeBeforeRequest;
    console.log(`It took ${timePassed} for the request.`);
    console.log(dogData);
    let dogImageHTML = document.createElement("img");
    dogImageHTML.width = 200;
    dogImageHTML.src = dogData.message;
    document.querySelector("#dogDiv").appendChild(dogImageHTML);
}





















// async function getTodo() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//     const data = await response.json();
//     console.log("Data received:", data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// getTodo();
