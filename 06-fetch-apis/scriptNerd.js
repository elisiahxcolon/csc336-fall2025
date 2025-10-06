let button = document.querySelector("#fetchNerdJoke");
button.addEventListener("click", e => getAndDisplayNerdJoke());

let timeBeforeRequest;

async function getAndDisplayNerdJoke() {
    timeBeforeRequest = Date.now();

    let response = await fetch("https://geek-jokes.sameerkumar.website/api?format=json");
    let data = await response.json();

    let timePassed = Date.now() - timeBeforeRequest;
    console.log(`It took ${timePassed} ms for the request.`);
    console.log(data);

    let jokeDiv = document.querySelector("#joke");
    jokeDiv.textContent = data.joke;
}
