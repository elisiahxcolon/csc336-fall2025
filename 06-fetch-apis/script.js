let demonSlayerButton = document.querySelector("#fetchDemonSlayer");

let characterDiv = document.querySelector("#character");

let timeBeforeRequest;

demonSlayerButton.addEventListener("click", e => fetchAndDisplayDemonSlayerCharacters());

async function fetchAndDisplayDemonSlayerCharacters() {
    timeBeforeRequest = Date.now();

    // cors workaround explanation:
    // some apis do not allow requests from browsers directly.
    // browsers block these requests if the server does not send
    // "access-control-allow-origin". this is called a cors error.
    // allorigins fetches the data for us and returns it with the proper headers.
    // this lets our browser code read the data safely.

    // original api url
    const apiURL = "https://www.demonslayer-api.com/api/v1/characters";
    // proxy url using allorigins
    const proxyURL = "https://api.allorigins.win/raw?url=" + encodeURIComponent(apiURL);

    // fetch data from the proxy url
    let response = await fetch(proxyURL);
    let data = await response.json();

    let timePassed = Date.now() - timeBeforeRequest;
    console.log(`it took ${timePassed} ms for the request.`);
    console.log(data);

    characterDiv.innerHTML = "";

    let container = document.createElement("div");
    container.id = "characterContainer"; 
    characterDiv.appendChild(container);

    data.content.forEach(character => {
        let charCard = document.createElement("div");
        charCard.classList.add("character-card");
        
        
        // create the character image
        let img = document.createElement("img");
        img.src = character.img;
        img.alt = character.name;
        img.width = 200;

        // create the character name
        let name = document.createElement("h3");
        name.textContent = character.name;

        // create the character description
        let desc = document.createElement("p");
        desc.textContent = character.description;

        // create the character quote
        let quote = document.createElement("blockquote");
        quote.textContent = `"${character.quote}"`;
        // add all elements to the card
        charCard.appendChild(img);
        charCard.appendChild(name);
        charCard.appendChild(desc);
        charCard.appendChild(quote);

        // add the card to the container
        container.appendChild(charCard);
    });
}
