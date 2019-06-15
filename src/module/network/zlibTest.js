/**
 * zlib模块提供了数据压缩和解压功能。当我们处理http请求和响应时，可能需要用到这个模块。*/

//首先我们看一个使用zlib模块压缩http响应体数据的例子。在这个例子中，判断了客户端是否支持gzip，并在支持的情况下使用
//zlib模块返回gzip之后的响应体数据

var http = require('http');
http.createServer(function (request, response) {
  var i = 1024;
  data = '';

  while (i--) {
    data += '.';
  }
  if ((request.headers['accept-encoding'] || '').indexOf('gzip') != -1) {
    zlib.gzip(data, function (err, data) {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Encoding': 'gzip'
      });
      response.end(data);
    });
  } else {
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end(data);
  }
}).listen(80);


/**
 * 接着我们看一个使用zlib模块解压http响应体数据的例子。在这个例子中，判断了服务端响应是否使用gzip压缩，并在压缩的情况下使用zlib
 * 模块解压响应体数据。*/
var options = {
  hostname: 'www.example.com',
  port: 80,
  path: '/',
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip,deflate'
  }
};

http.request(options, function (response) {
  var body = [];

  response.on('data', function (chunk) {
    body.push(chunk);
  });

  response.on('end', function () {
    body = Buffer.concat(body);

    if (response.headers['content-encoding'] === 'gzip') {
      zlib.gunzip(body, function (err, data) {
        console.log(data.toString());
      });
    } else {
      console.log(data.toString());
    }
  });
}).end();
