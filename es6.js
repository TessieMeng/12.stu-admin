// 比较运算符===
// 更严格的比较，会先比较数据类型再比值

// strict模式
// 在同一个页面不同js文件中，如果不用var申明，则i是跨文件的全局变量
// 使用var申明则不是全局变量，要是再当前js文件下定义，则是当前文件下的全局
// 使用'use strict'模式，强制必须通过var申明，不声明就会报错
// 以后全部用strict模式

// 字符串操作方法
toLowerCase()  
toUpperCase()  
indexOf()  
substring()

/* 数组操作方式 */
length 
indexOf 
slice() 
push() 
pop() 
unshift() 
shift() 
sort() 
reverse() 
splice() 
// 不改变原对象，有返回值的方法 
concat() 
join()

// 删除对象的一个属性
delete Object.prot

// 判断属性是否存在，包含继承来的
prop in Obj //返回true或false
// 判断属性是否存在，不包含继承来的
obj.hasOwnProperty(prop)

// 遍历对象的所有属性,包含继承
for(var prop in obj){...}
// 遍历对象的所有属性,不包含继承
for(var prop in obj){if(obj.hasOwnProperty(prop)){...}}

// 遍历array的所有元素,每次获取的循环变量是数组索引，索引是数组的属性
for(var index in arr){arr[index]}
// 当元素为数字时，实际遍历的是字符串


// Map
// 定义
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]])
m.get('Michael')
// map的方法
m.set('Adam', 67)
m.has('Adam')
m.get('Adam')
m.delete('Adam')
m.get('Adam')

//Set
// 定义
var s = new Set(arr)
s.add(4)
s.delete(3)

// iterable类型有：Array Map Set
// 可以通过for...of...来遍历
a = [1,2,3]
m = new Map()
m.set('a',1)
m.set('b',2)
m.set('c',3)
s = new Set()
s.add(1)
s.add(4)
s.add(7)
for (var ele of arr){console.log(ele)}
for (var ele of m){console.log(ele[0] + ':' + ele[1])}
for (var ele of s){console.log(ele)}
// iterable支持forEach()方法,这是一个ES5方法
m.forEach(function(ele, index, map){
    // ele: 元素
    // index：索引 对于array来说，索引是序号，对于map来说索引是key值，set索引和值一致
    // map：本身
    console.log(ele + ', index = ' + index)
})
m.forEach()















/**
 * 函数
 */
// arguments关键字：指向函数调用者传入的所有参数
function fun(){
    console.log(arguments)
    for(var i=0; i < arguments.length; i++){
        console.log('第' + i + '个参数：' + arguments[i])
    }
}
// rest参数
function foo(a, b, ...rest){
    console.log('a =' + a);
    console.log('b =' + b);
    console.log(rest)
}
foo(1,2,3,4,5)
foo(1)

// 块级作用域
for(let i = 0; i < 100; i++){
    console.log(i)
}
console.log(i) //error

// 解构赋值
var [x, y, z] = ['hello', 'js', 'es6']
let [x, [y, z]] = [1, [2, 3]]
let [, , z] = ['htllo', 'js', 'es6']
var p = {name: 'lwd', age: '24', extra: {hobby: 'play', gender: 'male'}}
let {name, extra: {hobby, gender}} = p
// 如果想使变量名不同于属性名
let {name:myname, extra: {hobby: preference, gender: sex}} = p
// 当对象可能不存在该属性名时，使用赋默认值
let {name:myname = 'MrLiu', tel = '13601234567'} = p
// 变量交换
[a, b] = [b, a]
// 快速获取一个对象的属性
var {hostname:domain} = location
function buildDate({year, month, day, hour=0, minite=0, second=0}){
    return new Date(year + '-' + month + '-' + day + ' ' + hour + ':' + minite + ':' + second)
}
buildDate({year: 2017, month: 1, day: 1})

// 再议this
var obj = {
    prop: 1,
    fun: function(){
        console.log(this.prop)
    }
}
obj.fun() // 这里是obj调用fun，所以在fun()内部，this就是obj
var fun1 = obj.fun // 这里只把obj的fun方法本体抽离出来复制给fun1
fun1()  // 这里是单独调用，实际就是window调用，所以和obj没有任何关系，内部的this也不指向它，而是指向window

var obj = {
    prop: 1,
    fun: function(){
        function fun2(){
            console.log(this.prop)
        }
        return fun2() // 注意两点：
                      // 1. 这里代表先单独调用fun2(),把fun2()的返回值return，由于没有返回值，就默认return了0
                      // 2. 这里看清楚，依然是单独调用，实际就是window调用，所以fun2()内部的this就是window了
                      //    要想让fun2里面的this指向fun()函数这一层的this，就改写为return this.fun2()
                      //    此处的this就是谁调用的的fun谁就是this
    }
}

// apply() call()
// 在js中任何用户定义的方法，比如myfun，或者预置的方法本质是一个对象，这个对象里又有两个个方法叫apply和call
// 既然是方法就可以调用：myfun.apply() myfun.call()
// 调用这两个方法的效果和传统的调用方式myfun()是一样的
// 只不过，可以绑定this
// 传统调用方式obj.myfun(), myfun()里出现的this都是obj，而myfun.call()和myfun.apply()
// 可以把this指定为传入的第一个参数
// 例如：
function myfun(){
    console.log(this.prop)
}
myfun.call(obj1)
myfun.call(obj2)
// 就把this绑定给obj1和obj2














/**
 * Array的高阶函数
 */

// map:Array独有方法
arr.map(myfun)

// reduce:Array独有方法
arr.map(myfun)

// 首字母大学练习
arr = ['adam', 'LISA', 'barT', 'Lisa', 'Bart']
function nomalize(str){
    return str.length > 0? str.substring(0,1).toUpperCase() + str.substring(1,).toLowerCase() : str
}
arr.map(nomalize)

// filter：Array独有方法，自定义滤除条件
arr.filter(judge)
// filter去重
arr.filter(function (ele, index, arr){
    // 判断用indexOf寻找出来的下标是否等于实际下标
    // indexOf返回的是第一个找到的元素
    return arr.indexOf(ele) === index   
})

// sort排序
// 默认的排序算法会将所有元素转为字符串按ascii码进行排，要是不满足需求，可以自定义判断条件
var arr = [10, 20, 1, 2]
arr.sort(function (x, y){
    if(x <= y){
        return 0
    }
    if(x > y){
        return 1
    }
})

// every()
// 用于判断数组中每个元素是否满足条件，自定义满足条件
var scores = [65,80,100,59,71]
scores.every(function(val, index, arr){
    return val > 60 //
}) // 将返回false，有一门没及格

// find()
// 返回符合条件的元素，自定义找到了的条件
arr.find(function(val, index, arr){
    // 这里自定义你的判断逻辑，如果满足逻辑，返回true就行
})

// findIndex()
// 和上面一致，只不过回调函数返回true时，findIndex给你返回的是元素的索引














/**
 * 闭包
 */
// 一句话解释：返回带有局部变量的函数
// 举例说明：
// 定义函数A
function createPow(n){
    // 在函数A里定义函数a
    function myPow(x){
        // 在函数a里引用了函数A的变量n
        return Math.pow(x, n)
    }
    // 在函数A中返回了这个函数a
    return myPow
}
// 形如在函数A里包含一个函数a且函数a里引用了函数A这一层的变量且最后在A里return了a这个函数
// 那么我们称return出来的新函数叫做闭包
// 创建闭包pow2
pow2 = createPow(2)
// 创建闭包pow3
pow3 = createPow(3)
// 既然闭包包含了A中的局部变量，那么就有可能通过闭包对A中的变量进行操作
// 定义一个函数A
function fun(){
    // A层的私有变量x
    var x
    // 在A中定义函数a1
    function read(){
        return x
    }
    // 在A中定义函数a2
    function set(val){
        x = val
        console.log('修改fun的值x为' + x)
    }
    // 在函数A中返回a1， a2
    return [read, set]
}
// 返回闭包a1 a2
var [getx, setx] = fun()
setx(99)    // 通过闭包修改了A中的变量x为99
getx()      // 获取A中的x为99















/**
 * 箭头函数
 */
// 实例解释：没有函数名，只有参数、函数体和返回值的描述
(x,y) => x + y;
// 相当于一个匿名函数
function (x, y){
    return x + y
}
// 可以用箭头函数这样定义有名函数
var fn = x => x*x
// 如果函数体复杂，可以
(x, y, ...rest) => {
    var i, sum = x+y
    for(i=0; i<rest.length; i++){
        sum += rest[i]
    }
    return sum
}
// 如果返回一个对象
// 不能写成这样，因为与函数体有词法冲突
x => {foo: x}
// 改为
x => ({foo: x})
// 箭头函数内的this作用域是由上下文确定
var obj = {
    A: 1,
    fun1: function (){
        fn = () => this.A
        return fn()
    },
    fun2: function (){
        fn = function (){
            return this.A
        }
        return fn()
    }
}
obj.fun1()  // 1
obj.fun2()  // undefined

















/**
 * generator
 */
// 定义
function* fib(max){
    var a = 0
    var b = 1
    while(b <= max){
        [a, b] = [b, a+b]
        yield(a)
    }
    return
}
// generator是iterable
for(var x of fib(10)){
    console.log(x)
}










/**
 * 标准对象
 */
// 用typeof来判断数据的类型
typeof 123          // number
typeof NaN          // number
typeof 'str'        // string
typeof true         // boolean
typeof undefined    // undefined
typeof Math.abs     // function
typeof null         // object
typeof {}           // object
typeof {}           // object
// 包装成对象
var n = new Number(123)
var b = new Boolean(true)
var s = new String('str')
// n,b,s都被包装成对象类型
n === 123 // false
b === true // false
s === 'str' // false
// 闲的蛋疼也不要用包装对象，尤其是string类型
// 不加new不会创建包装对象
var n = Number(123)
var b = Boolean(true)
var s = String('str')
n === 123 // true
b === true // true
s === 'str' // true







/**
 * Date
 */
var now = new Date()
now;
now.getFullYear()
now.getMonth()
now.getDate()
now.getDay()
now.getHours()
now.getMinutes()
now.getSeconds()
now.getMilliseconds()
now.getTime()
// 该时间是浏览器从本机操作系统获取时间
// 创建指定日期时间的Date对象
var d = new Date(2015, 2, 19, 20, 15, 30, 123)
d;
// 返回时间戳，number类型
var timestamp = Date.parse('2015-03-19T12:15:30.123Z')
timestamp;
// 获取当前时间戳
Date.now()












/**
 * 正则表达式
 */
// 创建正则表达式的两种方式
var re1 = /ABC\-001/
var re2 = new RegExp('ABC\\-001')
// 测试字符串是否符合正则表达式
re1.test('ABC-001')
re2.test('ABC-001')
// 用正则表达式来切分字符串
'a b   c'.split(/\s+/)
'a,b;; c d'.split(/[\s\;\,]+/)
// 分组
var re = /^(\d{3})\-(\d{3,8})$/
// 用exec方法提取字串
re.exec('010-12345')
// 时间正则表达式 00:00:00 -> 23:59:59
var re = /([0-1]\d|2[0-3])\:[0-5]\d\:[0-5]\d/
// 贪婪匹配（默认）
var re = /^(\d+)(0*)$/
re.exec('12300') // '12300' ''
// 非贪婪匹配
var re = /^(\d+?)(0*)$/ // '123' '00'
// 全局搜索
var r1 = /test/g
var r2 = new RegExp('test', 'g')
// 全局匹配可以多次执行exec()来搜索一个匹配字符串。当我们指定g标志后，每次运行exec(),
// 正则表达式本身会更新lastIndex属性，表示上次匹配到的最后索引
var re = /093[0-9](\s+|\-)\d{7}/g
var text = '0934-8228859是旧的的电话号，0934-8228008是新的'
re.exec(text)
re.lastIndex        // 12
re.exec(text)
re.lastIndex        // 32
// 提取数据 rgb(xxx, xxx, xxx)
var rgbReg = /rgb\(\s*(\d{1,3})\s*\,\s*(\d{1,3})\s*\,\s*(\d{1,3})\s*\)/i
var str = 'rgb(123, 345 , 255)'
rgbReg.exec(str)
var [v1, v2, v3] = rgbReg.exec(str).splice(1,4).map( (ele)=>{
    return parseInt(ele)
})











/**
 * JSON
 * 本质就是一个字符串
 * 是为了方便传输而设计出的一个能代表对象的字符串标准
 * 比如后端要向前端发送一个对象数据，一般来说，发送的数据只能是文本格式，
 * 不能把var obj = {...}这个对象直接发给前端，因为obj这个对象是内存中一块抽象的数据结构，
 * 所以要把它转化成一个能代表obj的很长的字符串，再发出去。
 * 比较好的选择就是JSON字符串
 * 所以后端先把要发送的对象obj转化成JSON格式的字符串（这个过程叫序列化），发给前端，
 * 前端接受到这个字符串，再解析成一个js对象（反序列化）
 * 序列化和反序列化的操作只需要调用js提供的JSON模块的方法就可以
 */
// 序列化
var xiaoming = {
    name: 'xiaoming',
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    'middle-school': '\"W3C\" Middle School',
    skills: ['javaScript', 'Java', 'Python', 'Lisp']
}
var s = JSON.stringify(xiaoming)
// s就是能代表xiaoming这个obj的JSON字符串
// 打印看看这个字符串长什么样
console.log(s)
// 几乎和obj一模一样，只不过s是个货真价实的字符串
// 调用某些传输接口把这个s发给前端
// 到了前端接受到s
// 打印一下s
console.log(s)
// 和后端的s一模一样
// 反序列化
var xiaoming = JSON.parse(s)
// 现在小明是一个前端的obj了，和后端那个obj一模一样









/**
 * 面向对象编程
 */
// class继承
class student {
    constructor({name, id=NaN}){
        console.log('父类构造' + arguments)
        this.name = name;
        this.id = id;
    }
    hello(){
        console.log('my name is' + this.name)
        console.log('my id is' + this.id)
    }
}
class primaryStudent extends student{
    constructor({grade=1}){
        super(arguments[0])
        this.grade = grade
        console.log('子类构造')
    }
    promoting(){
        this.grade++
        console.log('promote to ' + this.grade + ' grade')
    }
}
var stu1 = new primaryStudent({
    name: 'lwd',
    grade: 2,
    id: 14024237
})








