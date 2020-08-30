/*1.编写一个学生对象Student构造函数，要求包含如下属性，
    构造时的传参只有姓名学号两个，其他属性值定义为空：
        姓名字符串
        Var 字符串
        科目 字符串数组
        每科成绩 number数组
        （注：科目和每科成绩字段定义为空数组）*/
/*2.将下面方法定义在Student的原型对象里
    选课(),退课(),考试(),计算总成绩(),计算平均分()
    （注：
        选课方法：
        入参1：课程名称；实现功能：把课程名称追加到科目字段里。
        提示：要做必要的参数检查，即判断科目字段里是否已经包含该课程（已经选了该课，不能重复选），若是，则打印一个错误提示信息，若否，则添加
        
        退课方法：
        入参1：课程名称; 实现功能：把该课程从科目字段中删除。做必要的参数检查，如上
 
        考试方法：
        入参1：考试科目名;实现功能：用随机数生成器给这个科目给出成绩，并放在每科成绩字段中，注意与科目字段的index一一对应。要做必要的参数检查，没选该课就不能考试
 
        计算总成绩：
        入参1：实现功能：计算总分并返回值
 
        计算平均分：
        入参1：实现功能：计算平均分并返回值）*/


function Student(name, stu_id) {
    this.name = name;
    this.stu_id = stu_id;
    this.subject = [];
    this.score = [];
};


//选课
Student.prototype.select = function (sub_name) {
    //判断是否重复
    for (var i = 0; i < this.subject.length; i++) {
        if (sub_name == this.subject[i]) {
            alert('课程已选!');
            return;
        }
    }
    this.subject.push(sub_name);
    this.score.push('0');
};


//退课
Student.prototype.drop_out = function (sub_name) {
    for (var i = 0; i < this.subject.length; i++) {
        if (sub_name == this.subject[i]) {
            this.subject.splice(i, 1);
            this.score.splice(i, 1);
            alert('课程已删除!');
            return;
        }
    }
    alert('未选此课，无法删除课程');
};


//个人考试
Student.prototype.exam = function (sub_name) {
    for (var i = 0; i < this.subject.length; i++) {
        if (sub_name == this.subject[i]) {
            this.score[i] = Math.round(Math.random() * 100);
            return this.score[i];
        }
    }
    alert('未选此课，无法考试');
    return -1;
};


//计算个人总成绩
Student.prototype.score_total = function () {
    var total = 0;
    for (i = 0; i < this.score.length; i++) {
        total += this.score[i];
    }
    return total;
};


//计算个人平均分
Student.prototype.score_ave = function () {
    var ave = this.score_total() / this.score.length;
    return ave;
};
