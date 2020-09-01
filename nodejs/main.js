/**
 * require：引入模块
 * 要引用模块module_name暴露的变量ref，用var ref = require('module_name')
 */
var greet = require('./hello')
var s = 'Michael'
greet(s)
// 如果写成这样
var greet = require('hello')
// node会以此在内置模块、全局模块、当前模块下查找hello.js








/**
 * 5 基本模块
 */
// global
// 在浏览器上全局模块时window，在nodejs里时global
global.console

// process
// nodejs的进程模块，他是global的属性，可以拿到很多有用信息
process === global.process // 返回true
process.version
process.platform
process.arch
process.cwd() //当前工作目录
// nodejs是事件机制，会每隔一定的时间轮询所有事件看有没有发生，发生时会调用相应的响应函数执行
// 当没有任何响应函数绑定到事件上时，nodejs就会完成工作，退出
// 以当前时间为参照，下一次的事件轮询也是一个事件，叫nextTick
// 为下一次事件轮询事件绑定回调函数
process.nextTick(function(){
    console.log('nextTick callback!')
})
// 绑定好后，在nodejs下一次的事件轮询发生时，就会调用回调
console.log('nextTick was set')

// 判断js的执行环境
if(typeof(window) === 'undefined'){
    console.log('nodejs')
}else{
    console.log('browser')
}








// 5.1 fs模块
// fs是文件系统模块，负责读写文件
// fs提供了异步和同步的读写方法
// 异步读文件
var fs = require('fs')
fs.readFile('sample.txt', 'utf-8', function(err, data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
// 读取二进制文件
// 不传入文件编码时，data将返回一个Buffer对象。
// 在nodejs中，buffer对象就是一个包含零个或任意字节的数组
var fs = require('fs')
fs.readFile('sample.png', function(err, data){
    if(err){
        console.log(err)
    }else{
        console.log(data);
        console.log(data.length + 'bytes')
    }
})
// buffer对象可以和string作转换，例如，把一个buffer对象转换成string
var text = data.toString('utf-8')
console.log(text)
// 或者把一个String转化为Buffer
var buf = Buffer.from(text, 'utf-8')
console.log(buf)

// 同步读文件
var fs = require('fs')
var data = fs.readFileSync('sample.txt', 'utf-8')
console.log(data)

// 如果同步读取文件发生错误，则要用try...catch捕获错误：
try{
    var data = fs.readFileSync('sample.txt', 'utf-8')
    console.log(data)
} catch (err){
    // 出错了
}

// 写文件
// 异步
var fs = require('fs')
var data = 'Hello, Node.js'
// 如果data时String，默认按utf-8编码写入，如果是Buffer，则写入二进制文件
fs.writeFile('output.txt', data, function(err){
    if(err){
        console.log(err)
    }else{
        console.log('ok');
    }
})
// 同步
var fs = require('fs')
var data = 'Hello, Node.js'
// 如果data时String，默认按utf-8编码写入，如果是Buffer，则写入二进制文件
fs.writeFileSync('output.txt', data)

// stat: 读取文件的信息
var fs = require('fs')
fs.stat('sample.txt', function (err, stat){
    if(err){
        console.log(err)
    }else{
        console.log('isFile: ' + stat.isFile());
        console.log('isDir: ' + stat.isDirectory());
        if(stat.isFile()){
            console.log('size: ' + stat.size);
            console.log('birth time: ' + stat.birthtime)
            console.log('modified time: ' + stat.time)
        }
    }
})

// 同步还是异步
// 在服务器运行时，由于nodejs是单线程的,所以不能同步，因为这样就会卡死，导致服务器不能做其他的响应
// 在服务器开启或结束时，需要导入或写入某些配置时，用同步











// 5.2 stream
'use strict'

var fs = require('fs')
// 打开一个读取流
var rs = fs.createReadStream('sample.txt', 'utf-8')
// 数据就绪事件
// data事件可能有多次
rs.on('data', function(chunk){
    console.log('DATA: ')
    console.log(chunk)
})
// 流结束事件
rs.on('end', function(){
    console.log('END: ')
})
// 错误事件
rs.on('error', function(err){
    console.log('ERROR: ' + err)
})

// 打开一个写入流
var ws1 = fs.createWriteStream('output1.txt', 'utf-8')
ws1.write('使用Stream写入文本数据...\n')
ws1.write('END')
ws1.end()

var ws2 = fs.createWriteStream('output1.txt')
ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'))
ws2.write(new Buffer('END', 'utf-8'))
ws2.end()
// 所有可以读取数据的流都继承自stream.Readable
// 所有可以写入数据的流都继承自stream.Writable

// pipe管道
'use strict'
var fs = require('fs')
var rs = fs.createReadStream('sample.txt')
var ws = fs.createWriteStream('copied.txt')
rs.pipe(ws)
// 默认情况下，当Readable流数据读取完毕，end事件触发后，将自动关闭Writable流。
// 如果不希望自动关闭，则
readable.pipe(writable, {end: false})













// 5.3 http模块
// 要开发HTTP服务器程序，从头处理TCP连接，解析HTTP是不现实的。这些工作实际上已经由
// Nodejs自带的http模块完成了
// 应用程序不直接和http协议打交道，而是操作http模块提供的 request 和 response 对象
// request：封装了http请求
// response：封装了http响应
var http = require('http')
var server = http.createServer(function (request, response) {
    // 获得HTTP请求的method和url
    console.log(request.method + ":" + request.url)
    // 将HTTP响应200写入response，同时设置Content-type:text/html
    response.writeHead(200, {'Content-Type': 'text/html'})
    // 将HTTP响应的HTML内容写入response
    response.end('<h1>Hello world</h1>')
})
server.listen(8080)
console.log('Server is running at http://127.0.0.1:8080/')
server.close()


// url模块
var url = require('url')
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))
// path模块
var path = require('path')
var workDir = path.resolve('.') // 获取绝对路径
var filePath = path.join(workDir, 'pub', 'index.html')


// 实现一个文件服务器
var 
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http');
var root = path.resolve(process.argv[2] || '.')
console.log('static root dir: ' + root)
var server = http.createServer(function (request, response){
    var pathname = url.parse(request.url).pathname
    var filepath = path.join(root, pathname)
    fs.stat(filepath, function(err, stats){
        if (!err && stats.isFile()){
            console.log('200' + request.url)
            response.writeHead(200)
            // 因为response本身是一个writable,所以可以直接接在pipe上
            fs.createReadStream(filepath, 'utf-8').pipe(response)
        }else{
            console.log('404' + request.url)
            response.writeHead(404)
            Response.end('404 Not Found')
        }
    })
})
server.listen(8080)
















// 5.4 crypto模块
// MD5和SHA1
// MD5是一种hash算法，用于给任意数据一个签名，签名用16进制字符串表示
const crypto = require('crypto')
const hash = crypto.createHash('md5')
hash.update('hello world!')
hash.update('hello world!')
console.log(hash.digest('hex'))
// 如果要用sha1方法加密，传入sha1即可，其他操作一样
// 还可以使用sha256和sha512方法

// Hmac
const crypto = require('crypto')
const hmac = crypto.createHmac('sha256', 'secret-key')
hmac.update('hello, world')
hmac.update('hello, nodejs')
console.log(hmac.digest('hex'))
