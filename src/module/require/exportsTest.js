var a = 0;

function count(){
    console.log('exports count:' + (++a));
}
exports.count2 = count;