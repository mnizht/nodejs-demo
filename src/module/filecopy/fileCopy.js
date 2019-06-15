var fs = require('fs');

function copySmall(src,dst) {
  fs.writeFileSync(dst,fs.readFileSync(src));
}

function copyBig(src,dst) {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
  copySmall(argv[0],argv[1]);
}

main(process.argv.slice(2));

/**
 * 以上程序使用 fs.readFileSync 从源路径读取文件内容，并使用 fs.writeFileSync 将文件内容写入目标路径
 * process 是一个全局变量，可通过 process.argv 获取命令行参数。由于argv[0] 固定等于NodeJS执行的绝对路径，
 * argv[1]固定等于主模块的绝对路径，一次第一个命令行参数从argv[2] 这个位置开始。
 * $ node src/module/filecopy/fileCopy.js 'src/module/hello.js' 'src/module/filecopy/hello.js'
 */
