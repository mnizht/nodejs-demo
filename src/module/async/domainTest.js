/**
 * NodeJS提供了domain模块，可以简化异步代码的异常处理。在介绍该模块之前，我们需要首先理解“域”的概念。简单讲，一个域就是一个Js运行
 * 环境，在一个运行环境中，如果一个异常没有被捕获，将作为一个全局异常被抛出。NodeJS通过process对象提供了捕获全局异常的方法，*/
process.on('uncaughtException', function (err) {
  console.log('Error: %s', err.message);
});

setTimeout(function (fn) {
  fn();
});
//Error: fn is not a function

/**
 * 虽然全局异常有个地方可以捕获了，但是对于大多数异常，我们希望尽早捕获，并根据结果决定代码的执行路径。我们用一下http服务器代码作为例子*/

function async(request, callback) {
  // Do something.
  asyncA(request, function (err, data) {
    if (err) {
      callback(err);
    } else {
      // Do something
      asyncB(request, function (err, data) {
        if (err) {
          callback(err);
        } else {
          // Do something
          asyncC(request, function (err, data) {
            if (err) {
              callback(err);
            } else {
              // Do something
              callback(null, data);
            }
          });
        }
      });
    }
  });
}

http.createServer(function (request, response) {
  async(request, function (err, data) {
    if (err) {
      response.writeHead(500);
      response.end();
    } else {
      response.writeHead(200);
      response.end(data);
    }
  });
});
/**
 * 以上代码将请求对象交给异步函数处理后，再根据处理结果返回响应。这里采用了使用回调函数传递异常的方案，因此async函数内部如果再多几个
 * 异步函数调用的话，代码就变成上边这副鬼样子了。为了让代码好看点，我们可以在每处理一个请求时，使用domain模块创建一个子域（JS子运行环境）。
 * 在子域内运行的代码可以随意抛出异常，而这些异常可以通过子域对象的error事件统一捕获。于是以上代码可以做如下改造*/


var http = require('http');

function async(request, callback) {
  //do something
  asyncA(request, function (data) {
    //do something
    asyncB(request, function (data) {
      //do something
      asyncC(request, function (data) {
        //do something
        callback(data);
      });
    });
  });
}

var domain = require('domain');
http.createServer(function (request, response) {
  var d = domain.create();
  d.on('error', function () {
    response.writeHead(500);
    response.end();
  });

  d.run(function () {
    async(request, function (data) {
      response.writeHead(200);
      response.end(data);
    });
  });

});

/**
 * 可以看出，我们使用.create方法创建了一个子域对象，并通过.run方法进入需要在子域中运行的代码的入口点。而位于子域中的异步函数回调函数
 * 由于不再需要捕获异常，代码一下子瘦身很多。*/

/**
 * 陷阱
 * 无论是通过process对象的uncaughtException事件捕获到全局异常，还是通过子域对象的error事件捕获到子域异常，在NodeJS官方文档里都强烈
 * 建议处理完异常后立即重启程序，而不是让程序继续运行。按照官方文档的说法，发生异常后的程序处于一个不确定的运行状态，如果不立即退出，
 * 程序可能会发生严重内存泄漏，也可能表现的很奇怪。
 * 但这里需要澄清一些事实。JS本身的throw..try..catch异常处理机制不会导致内存泄漏，也不会让程序的执行结果出乎预料，但NodeJS并不是
 * 纯粹的js。NodeJS里大量的API内部是用C/C++ 实现的，因此NodeJs程序的运行过程中，代码的执行路径穿梭于JS引擎的内部和外部，而Js的
 * 异常抛出机制可能会打断正常的代码执行流程，导致C/C++ 部分代码表现异常，进而导致内存泄漏等问题。
 * 因此，使用uncaughtException或domain捕获异常，代码执行路径里涉及到了C/C++ 部分代码时，如果不能确定是否会导致内存泄漏等问题时，
 * 最好在处理完异常后重启程序比较妥当。而使用try语句捕获异常时一般捕获到的都是JS本身异常，不用担心上述问题。*/
