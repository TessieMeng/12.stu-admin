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
arr = [1,2,3]
arr.replace()
