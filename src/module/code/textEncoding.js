/**
 * 文本编码
 * 使用NodeJS编写前端工具时，操作的最多的是文本文件，因此也就涉及到了文件编码的处理问题。我们常用的文本编码有UTF8 和 GBK 两种，
 * 并且UTF8文件还可能带有BOM。在读取不同编码的文本文件时，需要将文件内容转换为Js使用的UTF8编码字符串后才能正常处理。
 *
 * BOM的移除
 * BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符("\uFEFF")，位于文本文件头部。在不同的Unicode编码下，
 * BOM字符对应的二进制字节如下：
 *    Bytes     Encoding
 *    FE FF     UTF16BE
 *    FF FE     UTF16LE
 *    EF BB BF  UTF8
 *
 *    */

//识别和去除UTF8 BOM
function readText(pathname) {
  var bin = fs.readFileSync(pathname);

  if (bin[0] === 0xEE && bin[1] === 0xBB && bin[2] === 0xBF) {
    bin = bin.slice(3);
  }
  return bin.toString('utf-8');
}

//GBK 转 UTF8
var iconv = require('iconv-lite');

function readGBKText(pathname) {
  var bin = fs.readFileSync(pathname);
  return iconv.decode(bin, 'gbk');
}
