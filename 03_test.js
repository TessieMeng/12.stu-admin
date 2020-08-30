
// 创建一个学生对象
var stu = new Student('孟恬姝', 14024206);
var stu2 = new Student('哈哈哈', 14024201);
var stu3 = new Student('嘤嘤嘤', 14024202);


// 学生选课
// stu.select('yuwen');
// stu.select('shuxue');
// stu.select('yingyu');
// stu.select('JS');
// stu.select('yuwen');
// console.log(stu.subject);
// console.log(stu.subject.length);

// 学生退课
// stu.drop_out('wuli');
// console.log("stu的课程列表：" + stu.subject);
// console.log(stu.subject.length);
// console.log(stu.score);
// console.log(stu.score.length);

// 学生考试
// stu.exam('yingyu');
// stu.exam('shuxue');
// stu.exam('JS');
// stu.exam('yuwen');
// console.log(stu.subject);
// console.log(stu.score);

//学生总成绩
// stu.score_total();
// console.log("学生总成绩：" + stu.score_total());

// 学生平均分
// stu.score_ave();
// console.log("学生平均分：" + stu.score_ave());


//批量定义学生
/**
 * 创建一个学生对象数组并返回
 * @param {要创建的学生对象数目} n 
 * @return {学生对象数组}
 */
function setStu(n){
    // 返回n个学生对象（姓名、学号）
    arrCol = ['红桃','黑桃','草花','方片'];
    arrAlph = ['A',1,2,3,4,5,6,7,8,9,10,'J','Q','K'];
    var arrStu = [];
    for(var i=0; i<n; i++){
        stuName = arrCol[Math.floor(i/13)]+arrAlph[(i%13)];
        stuId = '140242'+ ((i+1) > 9 ? (i+1) : ('0'+(i+1)));
        arrStu.push(new Student(stuName, stuId));
    }
    return arrStu;
}
// console.log(setStu(54));


// 创建一个班级对象
var cla = new Class('140242', 'Shi');

//设置班级口号
// cla.setSlogan();
// console.log(cla.c_slogan);

// 匹配口号
// console.log(cla.matchSlogan('win'));

// 向班级中添加学生
// cla.addStu([stu, stu2, stu3]);
// cla.addStu(setStu(54));
// console.log(cla.student);

//给班级学生批量选课
// cla.setSub("shuxue");

// 班级考试
// cla.exam('shuxue');

 
//添加两个学生（入参：匿名对象
cla.addStu([new Student('lwd',14024237),new Student('mts',14024206)]);

var fakeStu = {
    name: 'abc',
    stu_id: '123',
    subject: [],
    score: []
};
fakeStu.__proto__ = Student.prototype; //对象.__proto__ = 构造函数.prototype

cla.addStu([fakeStu]);
// console.log(cla.student);