var http = require('http');
/**
 * 客户端模式工作时，为了发送客户端HTTP请求，我们需要指定目标服务器的位置并发送请求头和请求体*/

// var options = {
//   hostname: 'www.example.com',
//   port: 80,
//   path: '/upload',
//   method: 'POST',
//   header: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// };
//
// var request = http.request(options, function (response) {
// });
//
// request.write('Hello World');
// request.end();

/**
 * 可以看到，.request方法创建了一个客户端，并指定请求目标和请求头数据。之后，就可以把request对象当做一个只写数据流来写入请求体数据
 * 和结束请求。另外，由于HTTP请求中GET请求最常见，并且不需要请求体，因此http模块也提供了一下便捷的API*/

http.get('http://www.zhuht.xyz', function (response) {
  var body = [];

  console.log(response.statusCode);
  console.log(response.headers);

  response.on('data', function (chunk) {
    body.push(chunk);
  });

  response.on('end', function () {
    body = Buffer.concat(body);
    console.log(body.toString());
  });
});

/**
 * 在客户端模式下，发起一个HTTPS客户端请求与http模块几乎相同*/
var options = {
  hostname:'www.example.com',
  port:443,
  path:'/',
  method:'GET',
  // rejectUnauthorized:false
};
var request = https.request(options,function (response) {

});
request.end();
/**
 * 但如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下https模块会拒绝连接，提示说证书安全问题。
 * 在options里加入rejectUnauthorized：false字段可以禁用对证书有效性的检查，从而允许https模块请求开发环境下使用自制证书的HTTPS服务器*/
