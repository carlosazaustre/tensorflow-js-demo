let LOSS = 0;

// This will store mouse x,y points that have been scaled from 0->1
let Xs = [];
let Ys = [];

// Play arround with these numbers to see what happens
let A = -0.4;
let C = 200;

// Calculate Y from X
const getY = x => A * x + C;

// this scales a value from 0 to max to 0 to 1
const norm = (x, max) => map(x, 0, max, 0, 1);
const normX = x => norm(x, windowWidth);
const normY = y => norm(y, windowHeight);

// this scales a value from 0 to 1 to 0 to max
const denorm = (x, max) => map(x, 0, 1, 0, max);
const denormX = x => denorm(x, windowWidth);
const denormY = y => denorm(y, windowHeight);

function mouseClicked() {
  console.log('mouseClicked');
  console.log(mouseX, mouseY);
  // normalize the coordinates to the current window
  Xs.push(normX(mouseX));
  Ys.push(normY(mouseY));

  // calculate the loss across all points
  loss();
}

// The loss is calculated as the mean squared difference
// between the Y value of the mouse clicks and the actual
// Y value from the line.
// The closer the mouse clicks are to the line the lower 
// the value of the loss!
function loss() {
  let squaredDiff = 0;

  // for each point the user clicked
  for (let i = 0; i < Xs.length; i++) {
    // Get the normalised value of x and y for the click
    let x = Xs[i];
    let y = Ys[i];
    // Then use the equation of the line to get
    // a value for y of the line
    let predictedY = normY(getY(denormX(x)));

    // For each mouse click, the x of the mouse click
    // and the x of the line is going to be the same.
    // What is different is the y of the mouse click
    // and the y of the line. We figure out the squared
    // distance between those.
    squaredDiff += Math.pow(predictedY - y, 2);
  }
  let mean = (LOSS = squaredDiff / Xs.length);
  console.log('Loss', LOSS);
}

// this is only called once
function setup() {
  console.log('setupCalled');
  createCanvas(windowWidth, windowHeight);
}

function drawPoints() {
  noStroke();
  fill(51);
  for (let i = 0; i < Xs.length; i++) {
    let x = denormX(Xs[i]);
    let y = denormY(Ys[i]);
    ellipse(x, y, 10);
  }
  noFill();
}

function drawLine() {
  stroke(51);
  const x1 = 0;
  const y1 = getY(x1);
  const x2 = windowWidth;
  const y2 = getY(x2);

  line(x1,y1, x2, y2);
  noStroke();
}

function drawLoss() {
  noStroke();
  fill(0);
  textSize(20);
  textFont('monospace');
  text(LOSS.toFixed(5), 15, windowHeight - 20);
  noFill();
}

// this is called many times and draws the page
function draw() {
  console.log('drawCalled');
  background(255);
  drawLine();
  drawPoints();
  drawLoss();
}
