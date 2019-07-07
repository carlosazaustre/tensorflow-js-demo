// create variables (single values) and
// tensors like so
const x = tf.variable(tf.scalar(4.12));
const ys = tf.tensor([2, 2, 2, 2, 2], [5, 1]);

// maths operations between tensors.
// this multiplies each value in the ys tensor by 2
const res = ys.mul(x).mean();
res.print();

// Learnin rate is important. 
// small: (0.00001) slow rate and accurate
// large: (0.5) you maybe wrong.
const optimiser = tf.train.sgd(0.005);
console.log(x.dataSync());

tf.tidy(() => { // to avoid memory leaks
  for (let i = 0; i < 1000; i++) {
    optimiser.minimize(() => {
      return ys
        .mul(x)
        .square()
        .mean()
    });
    console.log(x.dataSync());
  }
});

console.log(res);
console.log(res.dataSync());