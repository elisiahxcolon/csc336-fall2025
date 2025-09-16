window.alert("Hello! Welcome to our wedding website!gimme money!");

function invertColors() {
    const body = document.body;
    const buttons = document.querySelectorAll("button"); 
    const links = document.querySelectorAll("a");         
    const paragraphs = document.querySelectorAll("p");    

    if (body.dataset.inverted === "true") {
        body.style.backgroundImage = "url('background.jpg')";
        body.style.backgroundSize = "cover";
        body.style.backgroundRepeat = "no-repeat";
        body.style.backgroundAttachment = "fixed";
        body.style.backgroundColor = "";
        body.style.color = "";

        buttons.forEach(btn => {
            btn.style.backgroundColor = "";
            btn.style.color = "";
            btn.style.border = "";
            if (btn.id === "IC") btn.innerText = "Invert Colors";
            if (btn.id === "chc") btn.innerText = "Change Highlight Color";
            if (btn.id === "H") btn.innerText = "Heart!";
        });

        body.dataset.inverted = "false";

        links.forEach(link => link.style.color = "");

        paragraphs.forEach(p => {
            p.style.backgroundColor = "";
            p.style.color = "";
        });

    } else {
        body.style.backgroundImage = "none";   
        body.style.backgroundColor = "black";  
        body.style.color = "white";            

        buttons.forEach(btn => {
            btn.style.backgroundColor = "black";
            btn.style.color = "white";
            btn.style.border = "2px solid white";
            if (btn.id === "IC") btn.innerText = "Colors Inverted!";
        });

        body.dataset.inverted = "true";

        links.forEach(link => link.style.color = "white");

        paragraphs.forEach(p => {
            p.style.backgroundColor = "black";
            p.style.color = "white";
        });
    }
}


function changeHighlightColor() {
    const body = document.body;

    if (body.dataset.hoverRed === "true") {
        body.classList.remove("hover-red");
        body.dataset.hoverRed = "false";
    } else {
        body.classList.add("hover-red");
        body.dataset.hoverRed = "true";
    }
}

function heart() {
    const elem = document.getElementById("H");
    if (elem.dataset.toggled === "true") {
        elem.style.backgroundColor = "";
        elem.style.color = "";
        elem.style.border = "";
        elem.innerText = "Heart!";
        elem.dataset.toggled = "false";
    } else {
        elem.style.backgroundColor = "red";
        elem.style.color = "white";
        elem.style.border = "2px solid white";
        elem.innerText = "❤️";
        elem.dataset.toggled = "true";
    }
}
function spawnHeart() {
    const heart = document.createElement("span");
    heart.innerText = "❤️";                     
    heart.style.position = "absolute";          
    heart.style.fontSize = "30px";              
    heart.style.userSelect = "none";            
    heart.style.pointerEvents = "none";        

    const maxX = window.innerWidth - 30;       
    const maxY = window.innerHeight - 30;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    heart.style.left = x + "px";
    heart.style.top = y + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 3000);
}

document.getElementById("H").addEventListener("click", () => {
    heart();       
    spawnHeart();  
});

document.getElementById("IC").addEventListener("click", invertColors);
document.getElementById("chc").addEventListener("click", changeHighlightColor);
document.getElementById("H").addEventListener("click", heart);
