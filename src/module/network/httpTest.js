/**
 * NodeJS 本来的用途是编写高性能的Web服务器。我们首先在这里重复一下官方文档里的例子，使用NodeJS内置的http模块简单实现
 * 一个HTTP服务器
 */
var http = require('http');

http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text-plain'});
  response.end('Hello World\n');
}).listen(8124);

/**
 * http 模块提供两种使用方式：
 * 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应
 * 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应
 *
 * 作为服务端时，首先需要使用.createServer方法创建一个服务器，然后调用.listen方法监听端口。之后，每当来了一个客户端请求，
 * 创建服务器时传入的回调函数就被调用一次。可以看出，这是一种事件机制。
 * */
