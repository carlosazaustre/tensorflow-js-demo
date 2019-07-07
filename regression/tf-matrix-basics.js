// Tensorflow Matrix basics
var a = tf.tensor([1, 2, 3]); // 1-dimensional array
console.log(a.rank); // 1 => 1 dimension
console.log(a.shape); // 3 => 3 values
a.print();

// Can use type to make it clearer 
var a = tf.tensor1d([1, 2, 3]); // 1-dimensional array
console.log(a.rank);
console.log(a.shape);
a.print();

// Add a value to make it work
var a = tf.tensor([[1, 2], [3, 4]]);
console.log(a.rank);
console.log(a.shape);
a.print();

// You can provide a flat array, following the shape
// flat array = [1,2,3,4]
// shape = [2,2] = 2x2
var a = tf.tensor([1, 2, 3, 4], [2, 2]);
console.log(a.rank);
console.log(a.shape);
a.print();

// QUIZ: Make a rank 1 tensor of 4,5,6, 
// then a rank 2 tensor of [4], [5], [6],
// then a rank 3 tensor of [[4]], [[5]], [[6]]
var a = tf.tensor([4, 5, 6]);
// var a = tf.tensor1d([4, 5, 6]);
// var a = tf.tensor([4, 5, 6], [3]);
console.log(a.rank);
console.log(a.shape);
a.print();
var b = tf.tensor([[4], [5], [6]]);
// var b = tf.tensor([4, 5, 6], [3, 1]);
console.log(b.rank);
console.log(b.shape);
b.print();
var c = tf.tensor([[[4]], [[5]], [[6]]]);
// var c = tf.tensor([4, 5, 6], [3, 1, 1]);
console.log(c.rank);
console.log(c.shape);
c.print();

// Transpose Matrix
var b = b.transpose();
b.print();
console.log(b.rank)
console.log(b.shape)

// Add
var a = tf.tensor([3, 8, 4, 6], [2, 2]);
var b = tf.tensor([[4, 0], [1, -9]]);
a.add(b).print();
var c = tf.tensor(4);
a.add(c).print();
// Substration
a.sub(b).print();
// Multiplication
b.mul(2).print();

var a = tf.tensor([[1, 2], [3, 4]]);
var b = tf.tensor([[2, 3], [4, 5]]);
a.mul(b).print();