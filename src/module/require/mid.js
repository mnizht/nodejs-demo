var counter = require('./counter.js');

function count(){
    console.log('mid :'+counter.count());

}
exports.count = count;