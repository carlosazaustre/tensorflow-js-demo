let Xs = [];
let Ys = [];
let A = 0.5;
let C = 150;
const getY = x => A * x + C;


// this scales a value from 0 to max to 0 to 1
const norm = (x, max) => map(x, 0, max, 0, 1);
const normX = x => norm(x, windowWidth);
const normY = y => norm(y, windowHeight);

// this scales a value from 0 to 1 to 0 to max
const denorm = (x, max) => map(x, 0, 1, 0, max);
const denormX = x => denorm(x, windowWidth);
const denormY = y => denorm(y, windowHeight);

// this is only called once
function setup() {
  console.log('setupCalled');
  createCanvas(windowWidth, windowHeight);
}

// this is called many times and draws the page
function draw() {
  console.log('drawCalled');
  const x1 = 0;
  const y1 = getY(x1);

  const x2 = windowWidth;
  const y2 = getY(x2);

  stroke(51);
  strokeWeight(1);
  line(x1, y1, x2, y2);
}

function mouseClicked() {
  console.log('mouseClicked');
  console.log(mouseX, mouseY);
  // normalize the coordinates to the current window
  Xs.push(normX(mouseX));
  Ys.push(normY(mouseY));
  // Print a ellipse for each mouse click on the X Y of the mouse click event
  ellipse(mouseX, mouseY, 10)
  console.log(Xs, Ys);
}