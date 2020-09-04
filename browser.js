/**
 * 浏览器对象：window
 */
// window对象充当全局作用域，表示浏览器窗口
// innerWidth和innerHeight表示净网页大小，属性可以读取或不可以赋值
window.innerHeight
window.innerWidth
// outerWidth和outerHeight表示整个窗口大小

// navigator对象
// 是window的属性，表示浏览器的信息
navigator.appName       // 浏览器名称
navigator.appVersion    // 浏览器版本
navigator.language      // 浏览器设置的语言
navigator.platform      // 操作系统类型
navigator.userAgent     // 浏览器设置的User-Agent字符串

// 不同浏览器访问某些属性的方法不同，如何解决兼容性问题
// 一般情况下，我们优选这种方法
var width = window.innerWidth || document.body.clientWidth
// 而不使用复杂的if判断
if (getIEVersion(navigator.userAgent) < 9){
    width = document.body.clientWidth
}else{
    width = window.innerWidth
}


// screen对象
// 是window的属性,表示屏幕信息
screen.width    // 屏幕宽度
screen.height   // 屏幕高度
screen.colorDepth  // 返回颜色位数，如8、16、24

// location对象
// 是window的属性,表示当前页面的URL信息。
location.href       // 完整的URL信息 http://www.example.com:8080/path/index.html?a=1&b=2#TOP
location.protocol   // http
location.host       // www.example.com
location.port       // 8080
location.pathname   // /path/index.html
location.search     // ?a=1&b=2
location.hash       // TOP

// document对象
// 是window的属性，表示当前页面
// 整个DOM树的根节点
document.title      // 当前页面标签显示的内容,这个属性可以修改立即生效

// getElementById() getElementsByTagName()

// cookie属性，获取当前页面的Cookie
// Cookie是由服务器发送的key-value标识符。因为HTTP是无状态的，但是服务器要区分到底那个用户发过来请求
// 就可以用Cookie来区分。当一个用户登录成功后，服务器发送一个Cookie给浏览器，例如user=ABC123XYZ(加密字符串)...
// 此后，浏览器访问该网页时，会在请求头附上这个Cookie，服务器根据Cookie即可区分出用户
// Coolie还可以存储网站一些设置，例如页面显示的语言
document.cookie     // 读取当前页面的coolie

// history属性
// 任何情况下都不建议使用history这个对象
// 保存了浏览器的历史记录
// back() forward()
history.back()      // 相当于点击后退
history.forward     // 相当于点击前进
// 新手设计web()页面时喜欢在登录成功时调用history.back(),试图回到登陆前的状态，这是一种错误的方法
















/**
 * 操作DOM
 */
// DOM是一个树形结构，操作一个树形结构不外乎更新、遍历、添加、删除这几种
// 更新：更新该DOM内容，相当于更新了DOM节点表示的HTML内容
// 遍历：遍历该DOM节点下的子节点，以便于进一步操作
// 添加：在DOM节点下新增一个子节点，相当于动态增加一个HTML节点
// 删除：将该节点删除，包含子节点
// 获取节点的常用方法：
document.getElementById()
document.getElementsByTagName()
var test = document.getElementsByClassName()
var cs = test.children
var first = test.firstElementChild;
var last = test.lastElementChild;
// 选择器查询
var q1 = document.querySelector('#q1')
var ps = q1.querySelectorAll('div.highlighted > p')

// 更新DOM
var p = document.getElementById('p-id')
p.innerHTML = 'ABC'
p.innerHTML = 'ABC <span style="color:red">RED</span> XYZ'
// 使用innerHTML时要注意对字符编码防止XSS攻击
// XSS攻击：当我们获取到后端的数据data时，想要显示在某个位置，就会用到xxx.innerHTML=data
//          当data里面夹杂了<script>标签时，那这段代码就会执行，比较危险
// 第二种更新DOM方法是
p.innerText = '<script>alert("Hi")</script>'
// HTML被自动编码，无法设置一个<script>节点
// innerText不返回隐藏文本，textContent返回所有文本
// 修改CSS
p.style.fontSize = '20px'

// 插入DOM
// 要是将一个已存在的节点插入，那么会先删除原先位置的节点
js = document.getElementById('js')
list = document.getElementById('list')
list.appendChild(js)
// 创建节点再插入
p = document.createElement('p')
p.id = 'haskell'
p.innerText = 'haskell'
document.getElementById('list').appendChild(p)
// style节点
s = document.createElement('style')
s.setAttribute('type', 'text/css')
s.innerHTML = 'P { color: red }'
document.getElementsByTagName('head')[0].appendChild(s)
// insertBefore()
parent.insertBefore(newElement, referenceElement)

// 节点遍历
for(var i=0; i<parent.children.length; i++){
    parent.children[i]
}

// 节点删除
var self = document.getElementById('to-be-removed')
var parent = self.parentElement
parent.removeChild(self)
// 虽然从页面上删除，但是存在于内存中
// 实际上removeChild()方法会返回被删掉的元素
var removed = parent.removeChild(self)
removed === self // true
// 每次删除一个节点就会实时更新，所以下面写法不对
parent.removeChild(parent.children[0])
parent.removeChild(parent.children[1])       // 原来的第二个位置变为第一个位置

















/**
 * 表单
 */
// 文本框 <input type="text">
// 口令框 <input type="password">
// 单选框 <input type="radio">
// 复选框 <input type="checkbox">
// 下拉框 <select>
// 隐藏文本 <input type="hidden">

// 获取值与设置值
// 适用于text,password,hidden,select
var input = document.getElementById('xxx')
input.value     // 获取
input.value = val  //设置
// 对于单选和复选，value永远是预设值，所以用checked判断
input.checked       // true or false
input.checked = true    //设置

// HTML5控件
// 一种特殊的表单
// <input type="date" value="2015-07-01">
// <input type="datetime-local" value="2015-07-01T02:03:04">
// <input type="color" value="#ff0000">

// 提交表单
// 提交表单的方式
// 方式一：通过form元素的submit()
/*
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>
<script>
    function doSubmitForm() {
        var form = document.getElementById('test-form')
        form.submit()
    }
</script>
*/
// 方式二：响应form本身的onsubmit事件,只需要将form里的button的type设置为submit就可以
/*
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="password" name="password">
    // 点击button，就会触发form的onsubmit事件，onsubmit的回调函数返回true时，正式提交表单
    <button type="submit">Submit</button>
</form>
<script>
    function checkForm {
        var form = document.getElementById('test-form')
        // 这里可以修改input
        // 例如再提交前对密码进行加密，这也就是为啥我们再有些网站点击登录时，密码框的*突然变多了
        var pwd = document.getElementById('password')
        pwd.value = toMD5(pwd.value)
        //要用return true来告诉浏览器继续提交，return false不会提交
        return true
    }
</script>
*/

// 对上面的再次进行改进
/*
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    // 没有name属性的<input>不会被提交
    <input type="password" id="password">
    // hidden的input不会显示
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>
<script>
    function checkForm {
        var form = document.getElementById('test-form')
        var pwd = document.getElementById('password')
        var md5_pwd = document.getElementById('md5-password')
        md5_pwd.value = toMD5(pwd.value)
        return true
    }
</script>
*/

// 应用：再申请账号或修改密码时，通常会再次输入密码，可以在checkForm里做判断

















// 文件表单
<input type="file">
