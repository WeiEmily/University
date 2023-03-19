//comment 
// OS: Windows 11
//Browser	version ：Google Chrome Version 110.0.5481.180 (Official Build) (64-bit)


let originStudents = [
    {Name : 'Kate0' , ID: '000001', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate1' , ID: '000002', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate2' , ID: '000003', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate3' , ID: '000003', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate4' , ID: '000004', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate5' , ID: '000005', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate6' , ID: '000006', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' },
    {Name : 'Kate7' , ID: '000007', Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' }
];
let students = originStudents;

//define how many item didn't fill in 
let noFillInItem = students.length;
const nofill = document.querySelector('#nofillin')
//use for loop create head
//@colNum  number of Atrributes of each student
//drawTable refer https://www.youtube.com/watch?v=3YuNjYGMLgo&t=149s
let colNum = Object.keys(students[0]).length;
//follow arrary draw tale 
 //create table
const table = document.createElement("table");
drawTable(students);

//function : table (main part )
function drawTable(students) {
   
    
    //create thead
    const thead = document.createElement("thead");
    //create tr in the thead
    const tr = document.createElement("tr");
    tr.classList.add('rows');
  

    //create Array of each student Atrrubutes
    let thName  = Object.keys(students[0]);
    //store the Array of part of head
    const thArray = [];
    //generate head tr row
    for (let i = 0; i < colNum; i++) {
        thArray[i] = document.createElement("th")
        thArray[i].innerText = thName[i];
        thArray[i].classList.add("clickable");
        if(i === colNum-1){
          thArray[i].setAttribute("id", "finalGrade");
          thArray[i].innerText = 'Average [%]'
        }
        // add each th to tr of head
        tr.append(thArray[i]);
    }

    //add this part to head
    thead.appendChild(tr);
    //append thead to table
    table.appendChild(thead);
    
    //start the 
    drawConetent(students);
   
    //show how many item need to fill ine
    countNofill();
    table.setAttribute("id", "myTable");

  }
    
  // Clone the table
   const tableCopy = table.cloneNode(true);
   //show in the HTML files , link to body
   result.appendChild(table);

 function drawConetent(students) {
  //create tbody element
  const tbody = document.createElement("tbody");
 
  //create td table, the content of the table
  students.forEach((student) => {
    //create the tr of td
    const tr = document.createElement("tr");
    //store the td element
    const tdArray = [];
    //for loop to create td
    for (let j = 0; j < colNum; j++) {
    
        //get content of student)[j], j mean row 0-7
        let grade = Object.values(student)[j];
        //create td
        tdArray[j] = document.createElement("td");

        tdArray[j].innerText = grade;
        if(j === 0){
         tdArray[j].classList.add("clickable");
        }
        //>=2 and <= colNum-2 mean all Assignment
        if(j >= 2 && j <= colNum-2){
            //it's contenteditable
            tdArray[j].setAttribute("contenteditable", "true");
            //for contunue work
            tdArray[j].classList.add("grade");
        }
        if(j === colNum-1){
         //for contunue work
         tdArray[j].classList.add("average");
       }
        // Check if the grade is equal to '-'
       if (grade === '-') {
       tdArray[j].style.backgroundColor= 'yellow'
       }
        //this td append as child of tr
        tr.appendChild(tdArray[j]);
    }
    tr.classList.add('rows');
    //tr append to tbody as child
    tbody.appendChild(tr);
  });

     // append to table
  table.appendChild(tbody);
 }








// caculate the average number 
function calculateAverage(student) {
  //let two varible record data
  let sum = 0;
  let count = 0;
 //from first assignment to last assignment
  for (let i = 2; i < Object.keys(student).length-1; i++) {
      //if it is equal '-'
      if (Object.values(student)[i] !== '-') {
        //get sum all of number Object.values(student)[i] get the No.i element of student 
          sum += parseInt(Object.values(student)[i]);
          //how many record 
          count++;
          //it's equal mean all assignment grade filled  
          if(count === Object.keys(student).length-3){
            //because noFillInItem couldn't smaller than 0
            if(noFillInItem >= 0){
              noFillInItem--;
            }
            //change how many item need to fill in 
            countNofill();
          }
      }
  }
  //return average number to back and show in HTML
  if (count === 0) {
      return '-';
  } else {
    let num = (sum / count).toFixed(0);
    //save number to Array 
    student.avg = num;
    return num;
  }
  
  
}
 
//this is a fuction if show how many item need to fill in 
function countNofill(){
  //in the beginning should same as table  content item 
  nofill.innerHTML = noFillInItem;
  //just make it highlight
  if(noFillInItem != 0){
    nofill.style.backgroundColor = 'yellow';
  }else{
    nofill.style.backgroundColor = '';
  }
}


//get the button  to change show 
const finalGrade = document.querySelector('#finalGrade');
//define a varible which type of grade form 
let gradeForm = 1;

finalGrade.addEventListener('click', function () {
  //for toogle 
    gradeForm++;
    //get all element of average cells 
    const averageCells = document.querySelectorAll('.average');
    //get Avg ArraY  from students
    
    
    //console.log(averageCells)
    //1 is default form average 
    if(gradeForm === 1){
      finalGrade.innerHTML = 'Average [%]';
      let avg1 = changeAvgType(1);
      renderLastcol( averageCells, avg1);
    }
    //2 is Letter Grade
    if(gradeForm === 2){
        finalGrade.innerHTML = 'Letter Grade';
        let letter2=[];
       
        letter2 = changeAvgType(2);
        renderLastcol( averageCells, letter2);
    }
    //3 is 4.0 Scale
    if(gradeForm === 3){
      finalGrade.innerHTML = '4.0 Scale';
      let scale3 = [];
      scale3 = changeAvgType( 3);
      renderLastcol( averageCells, scale3);
      gradeForm = 0;
    }
})

function renderLastcol(averageCells, result){
  for (let i = 0; i < averageCells.length; i++) {
    averageCells[i].innerText = result[i];
  }
}


function changeAvgType( gradeForm ) {
  //create 3 type Array list 
  let letter2=[];
  let scale3 = [];
  let avg1 = [];
  //get Array of all average 
   //get all average 
  const avgArray = students.map(function(obj) {
  return obj.Avg;
  });
  
  //check each of average number 
  for (let i = 0; i < avgArray.length; i++) {
    if(avgArray[i] !== '-'){
      //remove '%' and parseInt
      const averageNum = parseInt(avgArray[i]); 
        //each condition push each result to array 
        if(averageNum >= 93 && averageNum <= 100){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('A');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('4.0')
            continue;
          }
        } else if (averageNum >= 90 && averageNum <= 92){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('A-');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('3.7')
            continue;
          }
        } else if(averageNum >= 87 && averageNum <= 89){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('B+');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('3.3')
            continue;
          }
        } else if(averageNum >= 83 && averageNum <= 86){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('B');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('3.0')
            continue;
          }
        } else if(averageNum >= 80 && averageNum <= 82){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('B-');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('2.7')
            continue;
          }
        } else if(averageNum >= 77 && averageNum <= 79){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('C+');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('2.3')
            continue;
          }
        } else if(averageNum >= 73 && averageNum <= 76){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('C');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('2.0')
            continue;
          }
        } else if(averageNum >= 70 && averageNum <= 72){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('C-');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('1.7')
            continue;
          }
        } else if(averageNum >= 67 && averageNum <= 69){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('D+');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('1.3')
            continue;
          }
        } else if(averageNum >= 63 && averageNum <= 66){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('D');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('1.0')
            continue;
          }
        } else if(averageNum >= 60 && averageNum <= 62){
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('D-');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('0.7')
            continue;
          }
        }else {
          if(gradeForm === 1){
            avg1.push(averageNum +'%');
            continue;
          }
          if(gradeForm === 2){
            letter2.push('F');
            continue;
          }
          if(gradeForm === 3){
            scale3.push('0.0')
            continue;
          }
        }

    }else{
      //if it's "-" just push '-'
      if(gradeForm === 1){
        avg1.push('-');
        continue;
      }
      if(gradeForm === 2){
        letter2.push('-');
        continue;
      }
      if(gradeForm === 3){
        scale3.push('-')
        continue;
      }
    }
  }

  //return a new array to show in the column
  if(gradeForm == 1){
    return avg1;
  }
  if(gradeForm == 2){
    return letter2;
  }
  if(gradeForm == 3){
    return scale3;
  }
}


// // Add new row button functionality
// const addRowBtn = document.querySelector(".add-row-btn");
// addRowBtn.addEventListener("click", function() {
//     let newStudents = [];
//     //https://blog.csdn.net/qq_38866594/article/details/126505968?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1-126505968-blog-88839061.pc_relevant_default&spm=1001.2101.3001.4242.2&utm_relevant_index=4
//     let inputName = prompt("please input Student name :", "")
//     let inputId = prompt("please input Student ID :", "")
//     alert("Student name is "+ inputName + " and ID is "+ inputId);
//     //CS385 mobile application content 
//     newStudents=[{Name : inputName , ID: inputId, Assignment1:'-', Assignment2: '-', Assignment3:'-', Assignment4:'-', Assignment5:'-',Avg: '-' }];
//     newStudents = students[0]
//      console.log(students[0]);
   
//     students = [...students, ...newStudents];
    
    
//     drawConetent(newStudents);
//     gradeCells = document.querySelectorAll(".grade");
//     noFillInItem++;
//     countNofill();
// });

//add cloumn

// Add new cloumn button functionality
//https://www.w3schools.com/jsref/met_tablerow_insertcell.asp
const addCloumnBtn = document.querySelector(".add-column-btn");

addCloumnBtn.addEventListener("click", function(){
  let rows = document.querySelectorAll(".rows");

  for (let i = 0; i < rows.length; i++) {
    let child = rows[i].children[0];
    //get current how many assisgnment already 
    let countNum = rows[1].querySelectorAll('.grade').length;
    //== th mean is head
    if(child.nodeName === "TH"){
      countNum++;
      let x = rows[i].insertCell(rows.length-2);
      
      x.innerHTML = `Assignment${countNum}`;
      x.classList.add("clickable");
    }
    
    //== td mean is content
    if(child.nodeName === "TD"){
      let x = rows[i].insertCell(rows.length-2);
      x.innerHTML = '-';
      x.style.backgroundColor= 'yellow'
      let children = rows[i].children;
      //grade add class list 
      for (let j = 0; j < children.length; j++) {
        children[j].setAttribute("contenteditable", "true");
        children[j].classList.add("grade");
      }
    }
    rows[i].classList.add('rows');
    console.log(countNum);
  }
  let table = document.querySelector('#myTable')
  console.log(table);

  countNofill();
})



// Add new row button functionality
const addRowBtn = document.querySelector(".add-row-btn");
addRowBtn.addEventListener("click", function() {
  //got table and row 
  let table = document.getElementById("myTable");
  let rows = document.querySelectorAll(".rows");
  
  //get information 
  let inputName = prompt("please input Student name :", "")
  let inputId = prompt("please input Student ID :", "")
  alert("Student name is "+ inputName + " and ID is "+ inputId);
  //select insert location
  var row = table.insertRow(-1);
  row.classList.add("rows");
  //get child all td
  let tdChildren = rows[1].getElementsByTagName("td")
  

  //use for loop fill in innertext 
  for (let i = 0; i < tdChildren.length; i++) {
    var cell = row.insertCell(i);
    if(i == 0) cell.innerHTML = inputName;
    if(i == 1 ) cell.innerHTML = inputId;
    if(i > 1 && i < tdChildren.length-1){
      cell.innerHTML = '-';
      cell.setAttribute("contenteditable", "true");
      cell.classList.add("grade");
      
      cell.style.backgroundColor= 'yellow';
      
    }
    if(i == tdChildren.length-1) {
      cell.innerHTML = '-';
      cell.style.backgroundColor= 'yellow';
     cell.classList.add("average");
    }
    
  }
  console.log(table)
})

// add event listener to all grade td elements
let gradeCells = document.querySelectorAll(".grade");

//check change of all all grade cell
gradeCells.forEach(cell => {
  //'blur' is a change event after change 
  cell.addEventListener("blur", function(event) {

    
    //get the input value 
    const newValue = event.target.innerText;
    //get which row happen event 
    const row = event.target.parentElement;
    //get index of row
    const rowIndex = row.rowIndex -1; // subtract 1 to account for header row
    //get col index 
    const colIndex = event.target.cellIndex;

    // check if new value is a number and in the range 0-100
    if(!isNaN(newValue) && newValue !== "" && newValue>=0 && newValue<=100) {
      students[rowIndex][`Assignment${colIndex-1}`] = Number(newValue);
      //it's number so change style 
      event.target.style.backgroundColor = ""; //restore origin 
      event.target.style.textAlign = "right"; //change textAlign to right 
     //invoke get average number 
      const avg = calculateAverage(students[rowIndex]); 
      students[rowIndex].Avg = avg;
      
      //get average  cell and set as new average number 
      const avgcell = row.querySelector('.average');
      avgcell.innerText = avg +"%";
      //check the average number and define the color 
      if(avg < 60){
        avgcell.style.backgroundColor = "red";
        avgcell.style.color= 'white';
      }else{
        avgcell.style.backgroundColor = "";
        avgcell.style.color= '';
      }

      
    } else {
      //if it's not 1-100 number force change to below style 
      cell.textContent = '-';
      event.target.style.textAlign = "";
      event.target.style.backgroundColor = "yellow";
    }
  });
});


// Add new row button functionality
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", function() {
  let rows = document.querySelectorAll(".rows");
  let grades =  document.querySelectorAll(".grade");
  let average = document.querySelectorAll(".average")
  for (let i = 0; i < grades.length; i++) {
    grades[i].innerText = '-';
    grades[i].style.backgroundColor = 'yellow';
    grades[i].style.textAlign = "";
  }
  
  for (let j = 1; j < rows.length; j++) {
    let avgcell = rows[j].querySelector(".average")
    avgcell.innerText = '-';
    avgcell.style.backgroundColor = "yellow"
    avgcell.style.color = ""
  }
})


