let a = 100;

console.log(module.exports); //print:{}
console.log(exports);//print:{}

exports.a = 200;

exports = 'other area';
console.log(module.exports);//print:{ a: 200}
console.log(exports);//print:other area
exports.a = 300;
console.log(module.exports);