let demonSlayerbutton = document.querySelector("#fetchButtonDemonSlayer");
let zenQuotesbutton  = document.querySelector("#fetchButtonZenQuotes");

demonSlayerbutton.addEventListener("click", fetchDemonSlayerCharacters);
zenQuotesbutton.addEventListener("click", fetchZenQuotes);

async function fetchDemonSlayerCharacters() {
    let demonSlayerResponse = await fetch("https://www.demonslayer-api.com/api/v1/characters");
    let demonSlayerData = await demonSlayerResponse.json();
    console.log(demonSlayerData);

    let demonSlayerInfo = document.createElement("img");
    demonSlayerInfo.width = 200;
    demonSlayerInfo.src = demonSlayerData.content[0].img;
    document.querySelector("#characterContainer").appendChild(demonSlayerInfo);
}

async function fetchZenQuotes() {
    let response = await fetch("https://zenquotes.io/api/random");
    let data = await response.json();
    console.log(data);

    let quoteElement = document.createElement("p");
    quoteElement.textContent = `"${data[0].q}" — ${data[0].a}`;
    document.querySelector("#quoteContainer").appendChild(quoteElement);
}
