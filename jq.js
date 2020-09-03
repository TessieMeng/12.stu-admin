/** 
 * 1.选择器
 **/
// 选择器
// 按ID查找
var div = $('#abc')
// 返回的对象如下
[<div id="abc">...</div>]
// 弱不存在则
[]

// jQ对象和dom相互转换
var divdom = div.get(0)
var another = $(divdom)

// 按Tag
var ps = $('p')
ps.length

// 按class
var a = $('.red')

// 查找有多个class的节点
var a = $('.red.green')

// 按属性
var icons = $('[name^=icon]') // name以icone开头
var icons = $('[name$=icon]') // name以icone结尾
var icons = $('[class^="icon-"]')

// 组合查找
var emailInput = $('input[name=email]') // 只查找input
var tr = $('tr.red') // 只找tr

// 多项选择器
$('p,div') //把p和div都选出来
$('p.red, p.green') //把<p class="red"><p class="green">都选出来







// 1.1 层级选择器
// 层级选择器
//    <div class="testing">
//        <ul class="lang">
//            <li class="lang-javascript">javascript</li>
//            ...
//        </ul>
//    </div>
// 用空格隔开
$('ul.lang li.lang-javascript') // [<li class="lang-javascript">javascript</li>]
$('div.testing li.lang-javascript') // [<li class="lang-javascript">javascript</li>]
$('ul.lang li') // 所有li节点
// 某个表单的input
$('form[name=upload] input')
// 多层选择
$('form.test p input')

// 子选择器
//    <div class="testing">
//        <ul class="lang">
//            <li class="lang-javascript">javascript</li>
//            ...
//        </ul>
//    </div>
$('ul.lang>li.lang-javascript') //只能选子节点，不能选子子节点

// 过滤器
$('ul.lang li:first-child')
$('ul.lang li:last-child')
$('ul.lang li:nth-child(2)')
$('ul.lang li:nth-child(even)')
$('ul.lang li:nth-child(odd)')

// 表单相关
//:input :可以选择 <input> <textarea> <select> <button>
//:file :可以选择 <input type="file"> 和input[type=file]一样 
//:checkbox :可以选择复选框 和input[type=checkbox]一样
//:radio :可以选择单选框 和input[type=radio]一样
//:focus :可以选择当前输入焦点元素 用$('input:focus')就可选出
//:checked :可以选择当前已勾选的单选复选框 如$('input[type=redio]:checked)
//:enabled :可以选择可以正常输入的<input> <select> 也就是没有灰掉的输入
//:disabled :和enabled相反

// 所有可见的div
$('div:visible')
// 所有隐藏
$('div:hidden')





// 1.2查找和过滤
//        <ul class="lang">
//            <li class="js dy">javascript</li>
//            <li class="dy">python</li>
//            <li id="swift">swift</li>
//            <li class="dy">scheme</li>
//            <li name="haskell">haskell</li>
//        </ul>
// find()查找
var ul = $('ul.lang')
var dy = ul.find('.dy')
var swf = ul.find('#swift')
var hsk = ul.find('[name=haskell]')
// parent()方法向上查找
var swift = $('#swift')
swift.next()
swift.next('[name=haskell]') // 空的对象，因为swift的下一个元素不符合name=haskell
swift.prev('.dy') // python,因为python同时符合了过滤条件.dy
// 过滤
var langs = $('ul.lang li')
var a = langs.filter('.dy') // 拿到javascript python scheme
// 传入一个过滤函数
langs.filter(function(){
    return this.innerHTML.indexOf('s') === 0; //返回s开头的节点
}) // 注意：this被绑定为DOM对象而不是JQ对象 // 拿到swift和scheme
// map()
var arr = langs.map(function (){
    return this.innerHTML;
}).get() // 用get()拿到包含string的Array：['javascript', 'python', 'swift', 'scheme', 'haskell']
// first() last() slice()
var js = langs.first()
var haskell = langs.last()
var sub = langs.slice(2,4)







/**
 * 2操作DOM
 */
// 修改Text和HTML
// test() html()
//        <ul id="test-ul">
//            <li class="js">javascript</li>
//            <li name="book">Java &amp; JavaScript</li>
//        </ul>
$('#test-ul li[name=book]').test(); // 'Java & JavaScript'
$('#test-ul li[name=book]').html(); // 'Java &amp; JavaScript' //不是说直接返回标签吗
$('#test-ul li[name=book]').test('typeScript'); // 'Java & JavaScript'
$('#test-ul li[name=book]').html('<span style="color:green">javascript</span>'); // 'Java &amp; JavaScript' //不是说直接返回标签吗

// 一个jq对象包含任意个DOM对象，他的方法实际上会作用于每一个对应的DOM节点上
$('#test-ul li').test('JS') //两个节点都变了
// 当一个jq对象包含0个dom时，也可以调用方法不出错，免去了if语句
$('#not-exist').text('Hello') // 不做任何操作

//修改CSS
//        <ul id="test-css">
//            <li class="lang dy"><span>javascript</span></li>
//            <li class="lang"><span>java</span></li>
//            <li class="lang dy"><span>python</span></li>
//            <li class="lang"><span>swift</span></li>
//            <li class="lang dy"><span>scheme</span></li>
//        </ul>
// css()方法
// 链式调用
$('#test-css li.dy').css('background-color', '#ffd351').css('color', 'red')
// 其他用法
var div = $('#test-div')
// 获取CSS属性
div.css('color')
// 设置css属性
// 如上
// 清除css属性
div.css('color', '')
// addClass() hasClass() removeClass()
div.addClass('highlight') 
div.hasClass('highlight')
div.removeClass('highlight')

// 显示和隐藏DOM
// 方法一：
// 隐藏：设置CSS的display属性为none
// 显示：原来的属性有可能为block或inline，需要记录，恢复到原来，比较麻烦
// 方法二：
// show() hide()
var a = $('...')
a.hide()
a.show()

// 获取DOM信息
// 浏览器窗口
$(window).width()
$(window).height()
// HTML文档大小
$(document).width()
$(document).height()
// 某个div大小
div.width()
div.height()
//设置
div.width(400)
div.height('200px')
// attr() removeAttr()
var div = $('...')
div.attr('data')
div.attr('name')
div.attr('name', 'HELLO') // 设置
div.removeAttr('name')
div.attr('name')
// prop()适用于没有值的属性
var radio = $('#test-radio')
radio.attr('checked') // 返回'checked'
radio.prop('checked') // 返回true
// is()
radio.is(':checked') // true //这里为啥加：？

// 操作表单
// val()
/*
<input id='test-input' name='email' value=''>
<select id='test-select' name='city'>
    <option value="BJ" selected>Beijing</option>
    <option value="SH">Shanghai</option>
    <option value="SZ">Shenzhen</option>
</select>
<testarea id='test-textarea'>Hello</textarea>
*/
var
    input = $('#test-input')
    select = $('#test-selected')
    textarea = $('#test-textarea')
input.val() //获取
input.val("abc@example.com") //设置
select.val() //获取
select.val("SH") //设置
textarea.val() //获取i
textarea.val("Hi") //设置










// 2.1修改DOM结构
/*
    <div id='test-div'>
       <ul>
           <li><span>javascript</span></li>
           <li><span>python</span></li>
           <li><span>swift</span></li>
       </ul>
    </div>
*/

//添加DOM
// append()
var ul = ...
ul.append('<li><span>haskell</span></li>')
// append可以支持传入DOM对象，jq对象，函数对象
//DOM
var ps = document.createElement('li')
ps.innerHTML = '<span>haskell</span>'
ul.append(ps)
//jq
ul.append($('#scheme'))
//函数
ul.append(function(index, html){
    return '<li><span>Language -' + index + '</span></li>';
})
// prepend()：把DOM添加到最前面
// after()
var li = $('#test-div>ul>li:first-child')
li.after('<li><span>Lua</span></li>')

//删除节点
var li = $('#test-div>ul>li')
li.remove() //删除全部li










/**
 * 3 事件
 */
// on():绑定时间
var a = $("...")
a.on('click', function(){
    alert('hello!');
})
// 简化写法
a.click(function(){
    alert('hello!')
});
// 以上两者等价

// 常用事件：
// 鼠标
// click
// dbclick
// mouseenter ：进入时
// mouseleave ：移出时
// mousemove ：在dom内部每移动一下
// hover ：进入和退出时出发两次
// 键盘
// keydown ：按下键
// keyup ：松开键
// keypress ：按一次键后触发
// 其他
// focus: 获得焦点时
// blur：失去焦点时
// change：当input select textarea内容改变时
// submit：当<form>提交时
// ready：当页面载入并且DOM树完成初始化后

// ready事件:等待dom加载完成
$(document).ready(function(){
    $('#testForm').submit(function(){
        alert('submit!');
    })
})
// 或者简化为下面写法
$(function(){
    ...
})

// 可以反复绑定事件处理函数，他们会依次执行
$(function(){
    console.log('task A')
})
$(function(){
    console.log('task B')
})
$(function(){
    console.log('task C')
})

// 事件参数：从传入的Event对象获取
$(function(){
    $('#testMouseMoveDiv').mousemove(function(e){
        $('#testMouseMoveSpan').test('pageX =' + emailInput.pageX + 'pageY =' + emailInput.pageY)
    })
})

// off()取消绑定
function hello(){
    alert('hello!');
}
a.click(hello)
setTimeout(function(){
    a.off('click', hello)
})
// 或者直接调用
a.off('click')
// 来移除所有click事件的处理函数
// 或者直接调用
a.off()
// 来移除所有事件的所有处理函数

// 事件触发条件
// 原则：一般来说，需要用户来触发事件，比如一个文本框change事件，用户改变内容才能触发，用js代码去改变
// 文本框内容并不会触发事件
// 如果想主动触发一个事件，可以直接调用无参数的事件函数来触发
var input = $('...')
input.on('change', function(){
    alert('text changed!')
})
input.val('change it!')
input.change(); // 主动触发事件change
// 或着
input.trigger('change') //效果相同
// 开发经验：这样做的好处是，如果不这么做，很多时候，你就需要写两份一模一样的代码











/**
 * 4 动画
 * 原理：以微小的固定时间，来改变CSS的样式
 */
// show() hide() toggle()
var div = $('...')
div.hide(3000); //在3秒内逐渐消失，
// 参数可以是数字（ms） "slow" "fast"
div.show('slow')
div.toggle('slow') //反转

//slideUp() slideDown()
var div = $('...')
div.slideUp(3000); //在3秒内逐渐向上消失
div.slideDown('slow'); //缓慢向下展开
div.slideToggle('slow'); //反转

//fadeIn() fadeOut
//淡入淡出
//用法同上

//自定义动画
//animate()
var div = $('...')
div.animate({
    opacity: 0.25,
    width: '256px',
    height: '256px'
}, 3000) // 3秒钟内CSS过度到设定值
// animate()可以传入一个函数，动画结束时调用
var div = $('...')
div.animate({
    opacity: 0.25,
    width: '256px',
    height: '256px'
}, 3000, function(){
    console.log('动画已经结束');
    $(this).css('opacity', '1.0'.css('width', '128px').css('height', '128px'))
});

//串行动画
var div = $('...')
div.slideDown(2000)
    .delay(1000)
    .animate({
        width: '256px',
        height: '256px'
    }, 2000)
    .delay(1000)
    .animate({
        width: '128px',
        height: '128px'
    }, 2000);





















/**
 * 5 AJAX
 * 原理：仔细观察一个FORM的提交，就会发现，一旦用户点击“submit”按钮，表单开始提交，浏览器就会
 *      刷新界面，然后在新的页面里告诉你操作是否成功，要是网速太慢，就会得到404页面
 *      这就是web的运作原理，一次http请求对应一个页面
 * 如果让用户停留在当前页面中，同时发出新的http请求，就必须用javascript发送这个请求，就收到数据后，
 * 再用javascript更新页面，这样一来，用户就感觉自己任然停留在当前页面，但是数据可以不断的更新
 * 机制：异步请求，即发送了http请求后，程序不会停留在原地等待接收服务器的响应，而是继续执行后面
 *      的js代码，同时，为之后要发生的服务器响应事件绑定一个回调函数，等服务器响应发生时，会触发
 *      这个回调函数，这个过程和dom事件逻辑一模一样，只是这里的事件不是什么操作页面的事件，而是
 *      服务器响应事件。
 *      回调函数里就是我们在拿到服务器数据后所做的操作。
 */
// 传统方式
function success(text){
    var textarea = document.getElementById('test-response-text');
    textarea.value = text;
}

function fail(code){
    var textarea = document.getElementById('test-response-text');
    textarea.value = 'Error code:' + code;
}

var request = new XMLHttpRequest(); //新建XMLHttpRequest对象

// 为request对象的onreadystatechange(状态改变)事件绑定回调函数
// 当状态改变事件触发后，就会执行这个回调函数
request.onreadystatechange = function(){
    //判断请求是否完成
    if(request.readyState === 4){ //成功完成
        if(request.status === 200){ 
            return success(request.responseText);
        }else{
            return fail(request.status);
        }
    }else{
        // HTTP请求还在继续
    }
}

// 发送请求
// open()方法接受三个参数：
//      ARG1: 'GET' | 'POST'  请求方式：'GET'把参数包含在url中请求，'POST'通过request body传递参数
//      ARG2: xxx             请求的URL地址字符串
//      ARG3: true | false    是否异步，默认为true
// 要是第三个参数设置为false，则是同步，意味着程序在这里一直要等到接收到服务器端的响应才能继续执行 
// 第二个参数只能使用相对路径，意味着和当前页面的协议要一致(http和https不同)，
//      域名要一致(//和第一个/之间的内容)，端口号要一致
request.open('GET', '/api/categories');
// send():正式发送请求
request.send();

// jQuery方式
// ajax()方法
var jqxhr = $.ajax('/api/categories', {
    dataType: 'json'
})
// 请求已经发送了

// 如何指定回调函数：
var jqxhr = $.ajax('/api/categories', {
    dataType: 'json' //接受的数据格式
    // async: true //true(默认) false
    // method: 'GET' // 'GET'(默认) 'POST' 'PUT'
    // contentType: 'application/x-www-form-urlencoded; charset=UTF-8' //默认值，发送POST请求的格式
    // data: 发送的数据，如果是'GET',data将会被转换为query附加到URL上，如果是POST，根据contentType把data
    //       序列化为合适的格式
    // headers: 发送的额外http头，必须是一个object
}).done(function (data){
    ajaxLog('成功，收到数据：' + JSON.stringify(data));
}).fail(function (xhr, status){
    ajaxLog('失败：' + xhr.status + ', 原因：' + status);
}).always(function(){
    ajaxLog('请求完成：无论成功或者失败都会调用')
})

// get()
var jqxhr = $.get('/path/to/resource', {
    name: 'Bob Lee',
    check:  1
})
// 第二个参数和ajax()的第二个参数不是一回事，这里的object会转换成query string追加到第一个参数中
// 所以实际是向地址 /path/to/resource?name=Bob%20Lee&check=1 发送get

// post()
// 和get()类似，但是传入的参数默认被序列化为application/x-www-form-urlencoded
var jqxhr = $.post('/path/to/resource', {
    name: 'Bob Lee',
    check:  1
})
// 实际构造的数据name=Bob%20Lee&check=1作为POST的body被发送






















/**
 * 6 扩展插件
 * 原理：为所有的jQ对象自定义一个方法，这种方法称为编写JQ插件
 */
// 编写jq插件
// 通过$.fn对象来实现
$.fn.myHighlight = function(){
    // this已经绑定为当前的JQ对象
    this.css('backgroundColor', '#fffceb').css('color', '#d85030');
    // 返回this目的是支持了链式操作
    return this;
}
// 使用插件
$('#test-myHighlight').myHighlight()
// 带参数的插件
$.fn.myHighlight = function(options){
    // 
    var bgcolor = options && options.backgroundColor || '#fffceb'
    var color = options && options.color || '#dd85030'
    // this已经绑定为当前的JQ对象
    this.css('backgroundColor', bgcolor).css('color', color);
    // 返回this目的是支持了链式操作
    return this;
}
// 可以统一设置默认参数的插件
$.fn.myHighlight = function(options){
    // extend(target, obj1, obj2...) 将所有obj合并到第一个target对象中，遇到同名属性，用后面的obj
    var opts = $.extend({}, $.fn.myHighlight.defaults, options);
    this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
    return this;
}
$.fn.myHighlight.defaults.color = '#fff'
$.fn.myHighlight.defaults.backgroundColor = '#000'
// 这样用户既可以通过上面两行一次性设置默认的属性，又可以对某个特殊的对象调用插件时单独传入一个option对象

// 针对特定元素的扩展
$.fn.external = function (){
    // 这里相当于this.filter('a')的对象集合每一个都走一遍function
    // each()方法的返回值依然是this.filter('a')
    return this.filter('a').each(function () {
        // 这里的this指单个的dom对象了
        var a = $(this)
        var url = a.attr('href');
        if(url && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)){
            a.attr('href', '#0')
             .removeAttr('target')
             .append(' <i class="uk-icon-external-link"></i>')
             .click(function(){
                 if(confirm("确定前往" + url + '?')){
                     window.open(url)
                 }
             })
        }
    })
}

// 使用
$('a,p').external();
// 找到所有的a p元素，并为他们分别使用external()方法






