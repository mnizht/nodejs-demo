/**
 * https模块与http模块极为类似，区别在于https模块需要额外处理SSL证书*/
//在服务端模式下，创建一个https服务器的示例如下
var options = {
  key:fs.readFileSync('./ssl/default.key'),
  cert:fs.readFileSync('./ssl/default.cer')
};

var server = https.createServer(options,function(request,response){
  //...
});

/**
 * 可以看到，与创建HTTP服务器相比，多了一个options对象，通过key和cert字段指定了HTTP服务器使用的私钥和公钥*/

/**
 * NodeJS支持SNI技术，可以根据HTTPS客户端请求使用的域名动态使用不同的证书，因此同一个HTTPS服务器可以使用多个域名
 * 提供服务。可以使用以下方法为HTTPS服务器添加多组证书。*/
server.addContext('foo.com',{
  key:fs.readFileSync('./ssl/foo.com.key'),
  cert:fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com',{
  key:fs.readFileSync('./ssl/bar.com.key'),
  cert:fs.readFileSync('./ssl/bar.com.cer')
});
