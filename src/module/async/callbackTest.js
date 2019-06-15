/**
 * 在代码中，异步编程的直接体现就是回调。异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。*/
function heavyCompute(n, callback) {
  var count = 0;
  var i, j;
  for (i = n; i > 0; --i) {
    for (j = n; j > 0; --j) {
      count += 1;
    }
  }
  callback(count);
}

heavyCompute(100, function (count) {
  console.log(count);
});

console.log('hello');


/**
 * -----console-------
 * 10000
 * hello
 * 可以看到，以上代码中的回调函数仍然先于后续代码执行。Js本身是单线程运行的，不可能在一段代码还未结束运行时去运行别的代码，一次也就
 * 不存在异步执行的概念。
 * 但是，如果某个函数做的事情是创建一个别的线程或进程，并与JS主线并行的做一些事情，并在事情做完后通知JS主线程，那情况又不一样了
 * */
console.log('--------------------------------------------');
setTimeout(function () {
  console.log('world');
}, 1000);

console.log('hello');
/**
 * 这次可以看到，回调函数后于后续代码执行了。如同上边所说，JS本身是单线程的，无法异步执行，因此我们可以认为setTimeout这类JS规范之外
 * 的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调
 * 函数。除了setTimeout,setInterval这些常见的，这类函数还包括NodeJS提供的诸如fs.readFile之类的异步API。*/

/**
 * 另外，我们依然回到JS是单线程运行的这个事实上，这决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。
 * 也就是说，即使平行线程完成了工作，通知JS主线程执行回调函数，回调函数也要等到JS主线程空闲时才能开始执行。*/

console.log('-----------------------------------');

function heavyCompute2(n) {
  var count = 0,
    i, j;

  for (i = n; i > 0; --i) {
    for (j = n; j > 0; --j) {
      count += 1;
    }
  }
}

var t = new Date();

setTimeout(function () {
  console.log(new Date() - t);
}, 1000);

heavyCompute2(50000);
/**
 * 可以看到，本来应该在一秒后被调用的回调函数，因为JS主线程忙于运行其它代码，实际执行时间被大幅延迟*/
