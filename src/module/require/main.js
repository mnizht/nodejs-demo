var counter1 = require('./counter');
var counter2 = require('./counter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());

var mid = require('./mid');
mid.count();

var te = require('./exportsTest');
te.count2();