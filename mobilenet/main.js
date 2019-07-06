function setup() {
  let video = document.getElementById('video');
  let canvas = document.getElementById('canvas');
  let pre = document.getElementById('predictions');
  let model = null;

  async function startCamera() {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play();

    setInterval(() => takeSnapshot(), 1000);
  }

  function takeSnapshot() {
    let context = canvas.getContext('2d');
    let width = video.videoWidth;
    let height = video.videoHeight;

    if (width && height) {
      // setup canvas with the same dimensions as the video
      canvas.width = width;
      canvas.height = height;

      // make a copy of the current frame in the video on the canvas
      context.drawImage(video, 0, 0, width, height);
      classifyImage();
    }
  }

  async function classifyImage() {
    let predictions = [];
    // Pass the canvas to mobile net and get the predictions
    predictions = await model.classify(canvas);
    displayPredictions(predictions);
  }

  function displayPredictions(predictions) {
    let val = '';
    // Pretty print the predictions and display on the screen
    for (prediction of predictions) {
      let perc = (prediction.probability * 100).toFixed(2);
      val += `${perc}% | ${prediction.className}\n`;
      console.log(val);
    }

    pre.innerHTML = val;
  }

  async function main() {
    // load mobilenet then start the camera
    model = await mobilenet.load();
    await startCamera();
  }

  main();
}