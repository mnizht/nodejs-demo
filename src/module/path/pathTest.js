var cache = {};

function store(key,value) {
  cache[path.normalize(key)] = value;
}

store('foo/bar',1);
store('foo//baz//../bar',2);
console.log(cache);

path.join('src/','baz/','../bar');

path.extname('src/module/hello.js'); // => ".js"

/**
 * path.normalize 将传入的路径转换为标准路径，除了解析路径中的.与..外，还能去掉多余的斜杠。
 * path.join 将传入的多个路径拼接为标准路径。
 * path.extname 当我们需要根据不同文件扩展名做不同操作时，该方法就很好用。
 * 标准化之后的路径里的斜杠在windows系统里是\,在linux系统里是/。如果要保证任何系统下都使用/作为路径分隔符的话，
 * 需要用.replace(/\\/g, '/') 再替换一下。*/
