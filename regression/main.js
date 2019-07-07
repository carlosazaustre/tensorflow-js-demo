let LOSS = 0;
let CURRENT_EPOCH = 0;

// This will store mouse x,y points that have been scaled from 0->1
let Xs = [];
let Ys = [];

const MAX_EPOCHS = 300;

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

// -- Tensorflow code -- //
// create variables to store the weights of A and C
const a = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));

// setup the optimizer
const learningRate = 0.5;

// create an optimizer, this will be used to change
// the wights (m and c) to minimise the loss function
const optimizer = tf.train.sgd(learningRate);

// is passed in an array of X values and returns an
// array of predicted Y values based on the current
// values of m and c weights
function predict(x) {
  // y = m * x + b
  return a.mul(x).add(c);
}

function mouseClicked() {
  console.log('mouseClicked', `${mouseX}, ${mouseY}`);
  console.log(mouseX, mouseY);
  // normalize the coordinates to the current window
  Xs.push(normX(mouseX));
  Ys.push(normY(mouseY));

  // everytime we click a mouse we run or this many epochs
  train(MAX_EPOCHS);
}

// The loss is calculated as the mean squared difference
// between the Y value of the mouse clicks and the actual
// Y value from the line.
// The closer the mouse clicks are to the line the lower 
// the value of the loss!
function loss(predictedYs, actualYs) {
  // Mean squared error
  let x = predictedYs
    .sub(actualYs)
    .square()
    .mean()
  LOSS = x.dataSync()[0];

  return x;
}

// pass in the actualXs and the actualYs (from the mouse clicks)
// use the actualXs to calculate the predictedYs
// pass predictedYs and actualYs to the optimizer and
// try to minimize that value
async function train(numIterations = 1) {
  if (Xs.length) {
    for (CURRENT_EPOCH = 0; CURRENT_EPOCH < numIterations; CURRENT_EPOCH++) {
      tf.tidy(() => {
        const actualXs = tf.tensor(Xs, [Xs.length, 1]);
        const actualYs = tf.tensor(Ys, [Ys.length, 1]);

        optimizer.minimize(() => {
          let predictedYs = predict(actualXs);
          return loss(predictedYs, actualYs);
        });

        A = a.dataSync()[0];
        C = c.dataSync()[0];
        console.log(A, C);
      });

      // this let draw something in the page
      // because tf take all the CPU in the browser
      await tf.nextFrame();
    }
  }
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
  const x1 = denormX(0);
  const y1 = denormY(getY(0));
  const x2 = denormX(1);
  const y2 = denormY(getY(1));

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
