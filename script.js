//todo list js
var input = document.getElementById('input');
var btn = document.getElementById('btn');
var table = document.getElementById('table');
var arrayTask = [];
var check;

//local storage setup
var myStorage = localStorage;
var taskNum = myStorage.length;
var xhr = new XMLHttpRequest();

function updateTask() {
  for (var i = 0; i < myStorage.length; i++) {
    var newItem = myStorage.getItem(i);
    newItem = JSON.parse(newItem);
    arrayTask[i] = newItem;
    console.log(arrayTask[i]);
    createRow(i, arrayTask[i].name);
  }
}

//convert object task to JSON string and storage it
function arrToStr(key, value) {
  var taskStr = JSON.stringify(value);
  myStorage.setItem(key, taskStr);
  console.log("JSON = " + taskStr);
}

//updates completed value of JSON object and storage it

// object constructor
function task(name, id) {
  this.id = id;
  this.name = name;
  this.date = function () {
    var userDate = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    return days[userDate.getDay()] + " " + month[userDate.getMonth()] + " " + userDate.getFullYear();
  };
  this.completed = false;
};

//input listener
btn.addEventListener('click', function() {
  if(input.value != "") {
      var inputName = input.value;
      var newTask = new task(inputName, taskNum);
      arrayTask[taskNum] = newTask;
      // create rows and checkbox listener
      createRow(taskNum, inputName);

      //log the new task
      arrayTask[taskNum].date = arrayTask[taskNum].date();
      console.log(arrayTask[taskNum].date);
      arrToStr(taskNum, arrayTask[taskNum]);

      //change task num and resets input box;
      taskNum += 1;
      input.value = "";
  } else {
    alert("try again");
  }
});
// create rows and checkbox listener
function createRow(num, name) {
  //create the checkbox
  var checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.id = "check" + num;
  checkbox.checked = arrayTask[num].completed;

  //create the row and add data
  var tr = document.createElement('tr');
  var td = tr.appendChild(document.createElement('td'));
  td.innerHTML = name;
  table.appendChild(tr);
  var td = tr.appendChild(document.createElement('td'));
  td.appendChild(checkbox);
  // calls checkbox listener
  callListener(checkbox, arrayTask[num].completed, num);
}

// see if checkbox is clicked and updates task
function callListener(checkName, comp, num) {
    checkName.addEventListener('click', function() {
    comp = !comp;
    arrayTask[num].completed = comp;
    console.log(arrayTask[num].name + ' completed: ' + arrayTask[num].completed);
    arrToStr(num, arrayTask[num]);
  });
}

window.onload = updateTask();
