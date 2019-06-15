/**
 * 遍历目录是操作文件时的一个常见需求。*/

/**
 * 递归算法
 * 遍历目录时一般使用递归算法，否则就难以编写出简洁的代码。递归算法与数学归纳法类似，通过不断缩小问题的规模来解决问题。
 * 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能是，需要把递归算法转换为循环算法，
 * 以减少函数调用次数。*/
function factorial(n) {
  if (n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

/**
 * 遍历算法
 * 目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。
 * 先序遍历，意味着首次到达某节点就算遍历完成，而不是最后一次返回某节点才算数。
 * 因此使用这种遍历方式时，下边这棵树的遍历顺序是 A > B > D > E > C > F
 *
 *          A
 *         / \
 *        B   C
 *       / \   \
 *      D   E   F
 * */


/**
 * 同步遍历*/
var fs = require('fs');
var path = require('path');

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);

    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

travel('src/module', function (pathname) {
  console.log(pathname);
});


/**
 * 异步遍历
 * 如果读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。
 * travel函数的异步版本。*/
function travelAsyn(dir, callback, finish) {
  fs.readdir(dir, function (err, files) {
    (function next(i) {
      if (i < files.length) {
        var pathname = path.join(dir, files[i]);

        fs.stat(pathname, function (err, stats) {
          if (stats.isDirectory()) {
            travelAsyn(pathname, callback, function () {
              next(i + 1);
            });
          } else {
            callback(pathname, function () {
              next(i + 1);
            });
          }
        });
      } else {
        finish && finish();
      }
    }(0));
  });
}
