/* 3.编写一个班级对象class的构造函数，要求包含如下属性：
构造函数的传参为班级名和班主任 ; 班级口号，学生obj数组为空
班级名 字符串
班级口号 字符串
班主任 字符串
学生 obj数组 */

/*4.为class原型对象添加如下方法：设置口号()、添加学生()、匹配口号()、统一考试()
（注：
    设置口号方法：
    入参1： 实现功能：读取键盘输入的一个字符串，赋值给班级口号字段。要做参数检查：用户输入中不能包含shit和damn两个词汇，若出现，则要重新输入，用正则表达式去判断

    匹配口号方法：
    入参1:关键字字符串 实现功能:检查班级口号中是否包含该关键字，若是，则返回成功，否，返回失败，注意返回布尔值。用正则匹配去实现

    添加学生：
    入参1：studentList数组 实现功能:将studentList下的所有学生对象追加到学生obj数组字段下，例如这个班级已经有10个学生对象在学生obj数组字段中，传参中的数组包含20个学生对象，则追加后的学生obj数组字段有30个学生

    统一考试:
    入参1：科目 实现功能：让全班所有学生，即学生obj数组字段中所有对象，考这个科目。思路，调用数组中每一个学生对象的考试函数。在这个方法中，要为每一个学生检查是否选修该课程，选了该课的学生才能进行考试。最终打印参加考试的人数和参加考试的人的平均分）*/

function Class(c_name, master) {
    this.c_name = c_name;
    this.master = master;
    this.c_slogan;
    this.student = [];
};


// 添加口号
Class.prototype.setSlogan = function () {
    var slogan = prompt('Please enter a slogan:');
    var reg = /(\bshit\b)|(\bdamn\b)/;
    while (reg.test(slogan) == true) {  //有敏感词
        slogan = prompt('Please enter a slogan:');
    }
    this.c_slogan = slogan;
};


// 匹配口号
Class.prototype.matchSlogan = function (keyword) {
    // var reg = new RegExp(eval("/"+keyword+"/"));
    var reg = eval("/" + keyword + "/");
    var str = cla.c_slogan;
    if (reg.test(str) == true) {
        return true;
    } else {
        return false;
    }
};


//添加学生
Class.prototype.addStu = function (studentList) {
    this.student = this.student.concat(studentList);
}

//给所有学生批量选课
Class.prototype.setSub = function(sub_name){
    for (var i=0; i<this.student.length; i++){
        this.student[i].select(sub_name);
    }
};

//统一考试
Class.prototype.exam = function (sub_name) {
    var num = 0;
    var sum = 0;
    for (var i = 0; i < this.student.length; i++) {
        var score = this.student[i].exam(sub_name);
        if (score != -1) {
            sum = sum + score;
            num++;
        }
    }
    //班级平均分
    var average = sum / num;
    return average;
};


//按成绩排名
Class.prototype.rank = function () {

};