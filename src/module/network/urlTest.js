//使用.parse方法来将一个URL字符串转化为url对象
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
/* =>
{ protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
*/

//传给.parse方法的不一定要是一个完整的url，例如在HTTP服务器回调函数中，request.url不包含协议头和域名，但同样可以用.parse方法解析。
http.createServer(function (request, response) {
  var tmp = request.url; // => "/foo/bar?a=b"
  url.parse(tmp);
  /* =>
  { protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?a=b',
    query: 'a=b',
    pathname: '/foo/bar',
    path: '/foo/bar?a=b',
    href: '/foo/bar?a=b' }
  */
}).listen(80);

/**
 * .parse方法还支持第二个和第三个布尔类型可选参数。第二个参数等于true时，该方法返回的url对象中，query字段不再是一个字符串，而是
 * 一个经过querystring模块转化后的参数对象。第三个参数等于true时，该方法可以正确解析不带协议头的url。
 * 反过来，format方法允许将一个url对象转换为url字符串*/
url.format({
  protcool: 'http:',
  host: 'www.example.com',
  pathname: '/p/a/t/h',
  search: 'query=string'
});
/* =>
*http://www.example.com/p/a/t/h?query=string'
*/

//另外，.resolve方法可以用于拼接url
url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
* http://www.example.com/baz
*/
