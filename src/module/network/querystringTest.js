/**
 * querystring 模块用于实现url参数字符串与参数对象的相互转换*/
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
* { foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
* 'foo=bar&baz=qux&baz=quux&corge='
*/
