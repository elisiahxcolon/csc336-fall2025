// original bob https://openprocessing.org/sketch/2710379
function setup() {
  createCanvas(1500, 500);
  background(0); 

  pizzaMaker();     
  cheesePizza();    
  pepperoniPizza(); 

  drawBob(); // bob on the far right
}

function draw() {}

// pizza functions
function pizzaMaker() {
  fill(222, 184, 135); // crust
  ellipse(200, 200, 300, 300);

  fill(255, 69, 0); // sauce
  ellipse(200, 200, 260, 260);

  fill(255, 230, 100); // cheese
  ellipse(200, 200, 240, 240);

  fill(150, 0, 0); // pepperoni
  ellipse(150, 150, 40, 40);
  ellipse(250, 150, 40, 40);
  ellipse(200, 200, 40, 40);
  ellipse(150, 250, 40, 40);
  ellipse(250, 250, 40, 40);
}

function cheesePizza() {
  fill(222, 184, 135); // crust
  ellipse(600, 200, 300, 300);

  fill(255, 69, 0); // sauce
  ellipse(600, 200, 260, 260);

  fill(255, 230, 100); // cheese
  ellipse(600, 200, 240, 240);
}

function pepperoniPizza() {
  fill(222, 184, 135); // crust
  ellipse(1000, 200, 300, 300);

  fill(255, 69, 0); // sauce
  ellipse(1000, 200, 260, 260);

  fill(255, 230, 100); // cheese
  ellipse(1000, 200, 240, 240);

  fill(150, 0, 0); // pepperoni
  ellipse(950, 150, 40, 40);
  ellipse(1050, 150, 40, 40);
  ellipse(1000, 200, 40, 40);
  ellipse(950, 250, 40, 40);
  ellipse(1050, 250, 40, 40);
}

function drawBob() {
  noStroke();
  // face/head
  fill("tan"); 
  rect(1320, 100, 155, 155);

  // hair
  fill("black"); 
  rect(1320, 30, 155, 70);

  // mouth
  fill("black"); 
  ellipse(1398, 200, 50);

  // singular tooth
  fill("white"); 
  rect(1388, 176, 20, 25);

  // eyes (L)
  fill("white"); 
  circle(1345, 150, 50);

  // pupil (L)
  fill("black"); 
  circle(1345, 150, 10);

  // eyes (R)
  fill("white"); 
  circle(1450, 150, 50);

  // pupil (R)
  fill("black"); 
  circle(1450, 150, 10);

  // left arm 
  fill("white"); 
  rect(1300, 255, 100, 50);

  // left hand
  fill("tan"); 
  rect(1300, 350, 50, 50);

  // right arm
  fill("white"); 
  rect(1450, 255, 100, 50);

  // right hand 
  fill("tan"); 
  rect(1495, 345, 55, 50);

  // body or shirt
  fill("white"); 
  rect(1320, 255, 155, 145);

  // pants 
  fill("blue"); 
  rect(1320, 400, 155, 100);
}

