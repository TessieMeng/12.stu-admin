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
















// 5.4 crypto加密算法模块
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

// AES:对称加密算法
const crypto = require('crypto')

function aesEncrypt(data, key){
    const cipher = crypto.createCipher('aes192', key)
    var crypted = cipher.update(data, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
}

function aesDecrypt(encrypted, key){
    const decipher = crypto.createDecipher('aes192', key)
    var decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
}

var data = 'Hello, this is a secret message!'
var key = 'password!'
var encrypted = aesEncrypt(data, key)
var decrypted = aesDecrypt(encrypted, key)
console.log('plain text: ' + data);
console.log('Encrypted text: ' + encrypted)
console.log('Decrypted text: ' + decrypted)


// DH算法（Diffie-Hellman）
// 小明创建DH
const crypto = require('crypto')
var ming = crypto.createDiffieHellman(512)
var ming_keys = ming.generateKeys();
var prime = ming.getPrime()
var generator = ming.getGenerator()
// 把prime和generator发给小红
console.log('prime:' + prime.toString('hex'))
console.log('generator' + generator.toString('hex'))
// 小红用拿到的prime和generator创建自己的DH
var hong = crypto.createDiffieHellman(prime, generator)
var hong_keys = hong.generateKeys();

// 小明和小红收到对方的keys，计算自己的密钥
var ming_secret = ming.computeSecret(hong_keys)
var hong_secret = hong.computeSecret(ming_keys)

console.log('secret of ming:' + ming_secret.toString('hex'))
console.log('secret of hong:' + hong_secret.toString('hex'))


// RSA 算法：非对称加密算法
// 由一个私钥和公钥构成的密钥对，通过私钥加密，公钥解密，或公钥加密，私钥解密
// 公钥可以公开，私钥必须保密
// 首先，在命令行执行以下命令生成一个RSA密钥对
openssl genrsa -aes256 -out rsa-key.pem 2048
// 生成了加密的rsa-key.pem文件
// 第二步，导出原始的私钥
openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
// 第三步，导出原始的公钥
openssl rsa -in rsa-key.pem -outform PEM -out rsa-pub.pem
// 使用私钥加密公钥解密
const
    fs = require('fs')
    crypto = require('crypto')
// 从文件加载key
function loadKey(file){
    return fs.readFileSync(file, 'utf8')
}
let 
    prvKey = loadKey('./rsa-prv.pem')
    pubKey = loadKey('./rsa-pub.pem')
    message = 'Hello, world!'
// 私钥加密
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf-8'))
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'))
// 公钥解密
let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv)
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'))
// 公钥加密
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf-8'))
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'))
// 私钥解密
let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub)
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'))

// 如果我们的message很长，如1M, 这样就会data too large for key size错误，这是因为RSA加密的原始
// 信息长度必须小于Key。一般情况下，RSA并不适合加密大数据，而是先生成一个随机的AES密码，用AES加密
// 原始信息，然后用RSA加密AES口令。这样传给对方的密文分为两部分：1.AES加密的密文 2.RSA加密的AES口令
// 对方先用RSA先解密出AES口令，再用AES解密密文，获得明文






