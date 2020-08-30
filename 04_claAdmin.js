/*  5.编写classRoom类
        需求一：将形参设为obj类型, 在构造函数内部访问obj的属性值，为班级名、班主任初始化
        需求二：添加第二个形参qstr，传入值为选择器字符串
        需求三：增加cla属性，用obj里的值构造一个class对象赋值给该属性
        需求四：增加room属性，用选择器查询传入的qstr，将返回的html元素对象赋值给该属性
        需求五：为classRoom原型对象添加show方法，实现room区域的显示
              步骤一：将room属性所代表的区域样式长宽初始化为300px，设置背景图片
              步骤二：在room区域底部创建两个按钮btnAddStu，btnDelstu，添加学生，删除学生，均要设置button按钮的id、name、class属性
                     给btnAddStu元素添加单击响应事件，设置响应函数为addStudent()方法，此方法在需求九中创建
                     给btnDelStu元素添加单击响应事件，设置响应函数为delStudent()方法，此方法在需求二十三中创建
              步骤三：在room区域底部创建按钮nexting，按钮上显示换图字样
                     给nexting元素添加单击响应事件，设置响应函数为changeBGImage()方法，此方法在需求八中创建
        需求六：为classRoom原型对象增加changeAddStuBtnName()方法，实现修改btnAddStu元素的innerHTML
              实现方法：查询到btnAddStu元素，修改七innerHTML，注意用局部查询，即父节点.getElement...()，分别用查询id，查询标签名，查询name，查询cla四种方式实现
        需求七：为classRoom原型对象增加getClassName()方法，形参1:元素对象；实现返回传入的元素对象的类名。访问这个对象的class属性，并返回
        需求八：为classRoom原型对象增加changeBGImage()方法，实现切换背景图片
        需求九：为classRoom原型对象增加addStudent()方法，实现一下功能：
              添加学生实体对象：
              1.让用户输入学号和姓名，构造一个student对象，放入cla的学生数组中，增加该学生Icon标签对象
              2.调用createStudentNode()方法，传入学号，获取返回的学生节点对象
              3.将节点对象作为传参，调用addIconOfStudent()方法
*/

function ClassRoom(qstr, claObj) {
  this.cla = new Class(claObj.name, claObj.master);
  this.room = document.querySelector(qstr);
  this.show();
};


// console.log(cla);


/* 需求五：为classRoom原型对象添加show方法，实现room区域的显示
      步骤一：将room属性所代表的区域样式长宽初始化为300px
      步骤二：在room区域底部创建两个按钮btnAddStu，btnDelstu，添加学生，删除学生，均要设置id、name、class属性
             给btnAddStu元素添加单击响应事件，设置响应函数为addStudent()方法，此方法在需求九中创建
             给btnAddStu元素添加单击响应事件，设置响应函数为delStudent()方法，此方法在需求二三中创建
      步骤三：在room区域底部创建按钮nexting，按钮上显示换图字样
             给nexting元素添加单击响应事件，设置响应函数为changeBGImage()方法，此方法在需求八中创建*/ 

ClassRoom.prototype.show = function(){
  // 设置样式
  if (this.room) {
    this.room.style.width = "720px";
    this.room.style.height = "405px";
    this.room.style.backgroundColor = "#bfa";
    this.room.style.backgroundImage = "url('./img/1.jpg')";
  }
  // 添加两个按钮
  let btnAddStu = document.createElement("button");
  let btnDelStu = document.createElement("button");
  btnAddStu.innerHTML = "添加学生";
  btnAddStu.setAttribute("id", "btnAddStu");
  btnAddStu.setAttribute("name", "btnAddStu");
  btnAddStu.setAttribute("class", "btnAddStu");
  btnDelStu.innerHTML = "删除学生";
  btnDelStu.setAttribute("id", "btnDelStu");
  btnDelStu.setAttribute("name", "btnDelStu");
  btnDelStu.setAttribute("class", "btnDelStu");

  this.room.appendChild(btnAddStu);
  this.room.appendChild(btnDelStu);
  btnAddStu.style.margin = "10px";
  btnDelStu.style.margin = "10px";
  // this.room.style.position = "relative";
  // btnAddStu.style.position = "absolute";
  // btnDelStu.style.position = "absolute";
  // btnAddStu.style.bottom = "0";
  // btnDelStu.style.bottom = "0";
  // btnDelStu.style.right = "0";

  // 点击按钮添加学生
  btnAddStu.onclick = function () {
    this.addStudent();
  }.bind(this);

  // 点击按钮删除学生
  btnDelStu.onclick = function(){
    this.delStudent();
  }.bind(this);

  // 在底部增加nexting按钮
  let nexting = document.createElement("button");
  nexting.innerHTML = "换图";
  this.room.appendChild(nexting);
  nexting.style.margin = "5px";

  // 给nexting按钮绑定一个单击响应函数
  nexting.onclick = function(){
    this.changeBGImage();
  };

  
  // 增加批量选课按钮
  let btnselectSub = document.createElement("button");
  btnselectSub.innerHTML = "选课";
  this.room.appendChild(btnselectSub);
  btnselectSub.style.margin = "5px";

  // 给选课按钮绑定一个单击响应函数
  btnselectSub.onclick = function(){
    let subject = prompt("请输入要添加的课程");
    this.selectSub(subject);
  }.bind(this);


  //增加批量考试按钮
  let exam = document.createElement("button");
  exam.innerHTML = "考试";
  this.room.appendChild(exam);
  exam.style.margin = "5px";

  //给考试按钮绑定一个单击相应函数
  exam.onclick = function(){
    let subject = prompt("请输入要考试的课程：");
    this.beginExam(subject);
  }.bind(this);

};


/* 需求六：为classRoom原型对象增加changeAddStuBtnName()方法，实现修改btnAddStu元素的innerHTML
  实现方法：查询到btnAddStu元素，修改其innerHTML，注意用局部查询，即父节点.getElement...()，分别用查询id，查询标签名，查询name，查询cla四种方式实现
*/
ClassRoom.prototype.changeAddStuBtnName = function(){
  // let btnAddStu = this.room.getElementById("btnAddStu"); not a function
  let btnAddStu = this.room.getElementsByTagName("button")[0];
  // let btnAddStu = this.room.getElementByName("button")[0]; not a function
  // let btnAddStu = this.room.getClassName("btnAddStu")[0]; not a function
  
  btnAddStu.innerHTML = "aaaaaaaaa";
};


/* 需求七：为classRoom原型对象增加getClassName()方法，形参1:元素对象；实现返回传入的元素对象的类名。访问这个对象的class属性，并返回
*/
ClassRoom.prototype.getClassName = function(eleObj){
  return eleObj.className;
};


/* 需求八：为classRoom原型对象增加changeBGImage()方法，实现切换背景图片*/
ClassRoom.prototype.changeBGImage = function(){
  let nexting = document.getElementsByTagName("button")[2];
  console.log(this.room.style.backgroundImage);
  // var i = this.room.style.backgroundImage.match(/[0-9].jpg$/)[0][0];
  
  // console.log(i);
};

/* 需求九：为classRoom原型对象增加addStudent()方法，实现以下功能：
  添加学生实体对象：
  1.让用户输入学号和姓名，构造一个student对象，放入cla的学生数组中,添加该学生Icon标签对象:
  2.调用createStudentNode()方法，传入学号，获取返回的学生节点对象
  3.将节点对象作为传参，调用addIconOfStudent()方法        
*/
ClassRoom.prototype.addStudent = function(){
  let name = prompt("请输入学生姓名：");
  let stu_id = prompt("请输入学号：");
  if(!name || !stu_id) return;
  let student = new Student(name, stu_id);
  this.cla.addStu(student);
  let stuNode = this.createStudentNode(name, stu_id);
  this.addIconOfStudent(stuNode);
};


/*需求十：为ClassRoom原型对象增加createStudentNode()方法，形参：studentId，实现功能：
    */
/**
 * 创建一个div学生元素节点，设置适当大小，设置div的id为studentId，class为student，背景图为默认头像，
    设置单击响应函数，实现功能是点击div区域，其边框变蓝，selected属性设置为true，再点击恢复,返回创建好的元素节点对象
 * @param {Number} studentId 键入的学生学号
 * @return {Object}  div学生元素节点
 */
ClassRoom.prototype.createStudentNode = function(studentName, studentId){
  let studiv = document.createElement("div");
  studiv.style.width = "20px";
  studiv.style.height = "20px";
  studiv.style.border = "solid  red  1px";
  studiv.setAttribute("id", "_"+studentId);
  studiv.setAttribute("name", studentName);
  studiv.setAttribute("class", "student");
  studiv.selected = false;
  studiv.onclick = function(){
    studiv.selected = !studiv.selected;
    if(studiv.selected){
      studiv.style.border = "solid blue 1px";
    }else{
      studiv.style.border = "solid red 1px";
    }
  };
  return studiv;
};

/* 需求十一：为ClassRoom原型对象增加addIconOfStudent()方法 */
/**
 * 将该节点插入到room节点下id为studentArea的子节点下，先判断room节点下是否存在StudentArea，
 * 要是不存在，则在Room下创建一个id为StudentArea的div子节点，将学生节点添加到其下；
 * 要是存在，直接追加为最后一个子节点
 * @param {Object} studentNode student元素节点
 */
ClassRoom.prototype.addIconOfStudent = function(studentNode){
  let area = this.room.querySelector("#studentArea");
  if(area){
    area.appendChild(studentNode);
  }else{
    let areaNew = document.createElement("div");
    areaNew.style.width = "280px";
    areaNew.style.height = "280px";
    areaNew.style.backgroundColor = "pink";
    areaNew.setAttribute("id", "studentArea");
    this.room.appendChild(areaNew);
    areaNew.appendChild(studentNode);
  }
};


/** 需求十二：为ClassRoom原型对象增加delIconOfStudent()方法
 * 实现功能：删除room节点下id为StudentArea的子节点下的student节点
 * @param {Object} student student元素节点对象
 */
ClassRoom.prototype.delIconOfStudent = function(studentNode){
  let stuid = studentNode.id;
  let area = this.room.querySelector("#studentArea");
  if(area){
    let stuNode = document.getElementById(stuid);
    if(stuNode){
      area.removeChild(stuNode);
    }else{
      alert("查无此人！");
    }
  }else{
    alert("查无此班级！");
  }
};


/** 需求十三（查找）：为ClassRoom原型对象增加findIconOfStudent()方法
 * 实现功能：查找room节点下id为StudentArea的子节点下id为studentId的节点对象，若找到了则返回该学生节点对象，若没找到返回null
 * 做必要的参数检查
 * @param {studentId} 学生输入的id
 *//*  */
ClassRoom.prototype.findIconOfStudent = function(studentId){
  let area = this.room.querySelector("#studentArea");
  if(area){
    // let stuNode = document.getElementById(studentId); 尽量不要用全局搜索
    let stuNode = area.querySelector("#"+ studentId);
    if(stuNode){
      return stuNode;
    }else{
      alert("查无此人");
    }
  }else{
    alert("查无此班级！");
  }
};


/** 需求十四（插入）：为ClassRoom原型对象增加一个insertIconOfStudent()方法
 * 实现功能：在room节点下的id为StudentArea的子节点中，将insert移动到insertee前
 * （删除旧的insert节点，然后将inserter节点插入到已存在的insertee前）
 * 做参数检查，inserter和insertee节点必须要都存在于StudentA节点中，要是不满足条件，不作任何处理，打印提示信息
 * @param 1，insert学生节点对象，2.insetee学生节点对象
 * 父节点.insertBefore(新节点,原节点)
 */
ClassRoom.prototype.insertIconOfStudent = function(insert, insertee){
  let area = this.room.querySelector("#studentArea");
  if(area){
    area.insertBefore(insert, insertee);
  }
};


/** 需求十五（交换):为ClassRoom原型对象增加swapIconOfStudent()方法
  * 实现功能：在room节点下的StudentArea节点中，交换studentA和studentB
  * 做必要的参数检查
  * @param 1.studentA学生节点对象 2.studentB学生节点对象
  */
ClassRoom.prototype.swapIconOfStudent = function(studentA, studentB){
  let area = this.room.querySelector("#studentArea");
  if(area){
    let allStu = area.childNodes;
    let i = 0;
    let j = 0;
    for(i=0; i<allStu.length; i++){
      if(allStu[i] == studentA){
        break;
      }
    }
    for(j=0; j<allStu.length; j++){
      if(allStu[j] == studentB){
        break;
      }
    }
    stuC = studentA.cloneNode(true);
    stuD = studentB.cloneNode(true);
    area.replaceChild(stuC, area.childNodes[j]);
    area.replaceChild(stuD, area.childNodes[i]);
    // for(let i=0; i<allStu.length; i++){
    //   if(allStu[i] == studentA){
    //     let studentC = allStu[i];
    //     for(let j=0; j<allStu.length;j++){
    //       if(allStu[j] == studentB){
    //         area.replaceChild(studentB, area.childNodes[i]);
    //         area.replaceChild(studentC, area.childNodes[j]);
    //         return;
    //       }
    //     }
    //   }
    // }

  }
};

/** 需求十六（替换）：为ClassRoom原型对象增加replaceIconOfStudent()方法
 * @param 1.NewStudent学生节点 2.OldStudent学生节点
 * 实现功能：用NewStudent学生节点替换room节点下的StudentArea节点下的OldStudent节点
 * 做必要的参数检查
 * 父节点.replaceChild(新节点,原节点)
 */
ClassRoom.prototype.replaceIconOfStudent = function(NewStudent,OldStudent){
  let area = this.room.querySelector("#studentArea");
  if(area){
    let oldStuid = OldStudent.id;
    let oldStu = area.querySelector("#" + oldStuid);
    let newStuid = NewStudent.id;
    let newStu = area.querySelector("#" + newStuid);
    if(oldStu && !newStu){
      area.replaceChild(newStu , oldStu);
    }else{
      alert("无替换的人或添加的人已存在");
    }
  }
};


/** 需求十七（返回所有的元素节点）：为ClassRoom原型对象增加getAllIconOfStudent()方法，
 * 实现：返回Room节点下id为StudentArea的子节点下所有的student元素节点，用两种方法实现
 */
ClassRoom.prototype.getAllIconOfStudent = function(){
  let area = this.room.querySelector("#studentArea");
  if(area){
    let allStu = area.childNodes; 
    return allStu;
  }
};


/**
 * 需求十八（前兄弟节点）：为ClassRoom原型对象增加getPreIconOfStudent()方法
 * @param 1.student元素节点 
 * 实现：返回room节点下id为StudentArea的子节点下student节点的前一个student节点
 */
ClassRoom.prototype.getPreIconOfStudent = function(studentNode){
  let area = this.room.querySelector("#studentArea");
  if(area){
    let preStu = studentNode.previousElementSibling;
    return preStu;
  }
};


/**
 * 需求十九（后兄弟节点）：为ClassRoom原型对象增加getNextIconOfStudent()方法
 * @param 1.student元素节点 
 * 实现：返回room节点下id为StudentArea的子节点下student节点的后一个student节点
 */
ClassRoom.prototype.getNextIconOfStudent = function(studentNode){
  let area = this.room.querySelector("#studentArea");
  if(area || studentNode.class == 'student'){
    let nextStu = studentNode.nextElementSibling;
    return nextStu;
  }
};

/** 需求二十：为ClassRoom原型对象增加sortStudentIconById()方法
 * 将room节点下的StudentArea节点下所有的class为student的节点 按照id值来排序，用冒泡和比较两种排序方法
 */
ClassRoom.prototype.sortStudentIconById = function(){
  let area = this.room.querySelector("#studentArea");
  if (area) {
    //比较排序
    // let claStu = area.getElementsByClassName("student");
    // for (let i = 0; i < claStu.length; i++) {
    //   for (let j = i + 1; j < claStu.length; j++) {
    //     let iid = parseInt(claStu[i].id.replace(/_/, ""));
    //     let jid = parseInt(claStu[j].id.replace(/_/, ""));
    //     if (iid > jid) {
    //       this.swapIconOfStudent(claStu[i], claStu[j]);
    //     }
    //   }
    // }

    //冒泡排序
    // let claStu = area.querySelectorAll(".student"); //querySelectAll产生的是一个NodeStaticList静态集合对象
    let claStu = area.getElementsByClassName("student");
    for(let i=0; i<claStu.length-1; i++){
      for(let j=0; j<claStu.length-i-1; j++){
        let jid = parseInt(claStu[j].id.replace(/_/, ""));
        let jjid = parseInt(claStu[j+1].id.replace(/_/, ""));
        if(jid > jjid){
          this.swapIconOfStudent(claStu[j],claStu[j+1]);
          // j--;
        }
      }
    }
  }
};


/** 需求二十一：为ClassRoom原型对象增加delStudent()方法
 * 实现功能：删除选中的学生Icon标签对象
 * 1.删除Room节点下的StudentArea节点下的所有selected属性值为true的学生节点，即删除选中的学生
 * 2.删除cla的学生数组中相对应的学生，提示：获取1中要删除的学生icon元素的id值，钙=该值就是该学生学号
 *   然后去cla里的学生数组里挨个查，找出该学号学生，将其从数组中剔除，或者给class原型对象添加一个新方法delStudentById，传入学号，删除学生，
 *   然后在这里直接调用cla的这个方法就行，推荐方法二
 */
ClassRoom.prototype.delStudent = function(){
  let area = this.room.querySelector("#studentArea");
  if(area){
     for(let i=0; i<area.childNodes.length; i++){
       if(area.childNodes[i].selected == true){
         this.delIconOfStudent(area.childNodes[i]);
         i--;
       }
     }
  }
};


/**
 * 换图
 */
ClassRoom.prototype.changeBGImage = function(){

};


/**
 * 批量选课
 */
ClassRoom.prototype.selectSub = function(subject){
  let area = this.room.querySelector("#studentArea");
  if(area){
    for(let i=0;i<area.childNodes.length; i++){
      if(area.childNodes[i].selected == true){
        // this.cla.setSub(subject);
        this.cla.student[i].select(subject);
        // console.log(clsrm.cla.student);    
      }
    }
  }

};


/**
 * 批量考试
 */
ClassRoom.prototype.beginExam = function(subject){
  let area = this.room.querySelector("#studentArea");
  if(area){
    for(let i=0; i<area.childNodes.length; i++){
      if(area.childNodes[i].selected == true){
        // this.cla.exam(subject);
        this.cla.student[i].exam(subject);
        // console.log(clsrm.cla.student);
      }
    }
  }

};







/**
 * 在ClassRoom构造函数的最后调用show方法
 */

let clsrm = new ClassRoom("#class1", { name: "140242", master: "shi" });
// let clsrm2 = new ClassRoom("#class2",{ name: "140241", master: "a"});



