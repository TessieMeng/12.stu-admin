'use strict'
/**
 * 定义一个hello模块
 * 这个模块想要对外暴露变量，用: module.exports = variable
 */

var s = 'hello';
function greet(name){
    console.log(s + ',' + name + '!');
}
// 把函数greet作为模块的输出暴露出去，这样其他的模块就可以使用greet函数了
module.exports = greet;
