// create variables (single values) and
// tensors like so
const x = tf.variable(tf.scalar(4.12));
const ys = tf.tensor([2, 2, 2, 2, 2], [5, 1]);

// maths operations between tensors.
// this multiplies each value in the ys tensor by 2
const res = ys.mul(x).mean();
res.print();

const optimiser = tf.train.sgd(0.001);
console.log(x.dataSync());
optimiser.minimize(() => {
  return ys
    .mul(x)
    .square()
    .mean()
});
console.log(x.dataSync());

console.log(res);
console.log(res.dataSync());