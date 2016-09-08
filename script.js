
function task(name, id) {
  this.id = id;
  this.name = name;
  this.date = function() {
    var userDate = new Date();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November","December"];
    return name + " was created on a " + days[userDate.getDay()] + " " + month[userDate.getMonth()] + " " + userDate.getFullYear();
  };
  this.completed = false;
};

var input = document.getElementById('input');
var btn = document.getElementById('btn');
var table = document.getElementById('table');
var taskNum = 0;
var arrayTask = [];
var check;

btn.addEventListener('click', function() {
  if(input.value != "") {
      var inputName = input.value;
      var newTask = new task(inputName, taskNum);
      arrayTask[taskNum] = newTask;

      //create the checkbox
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.id = "check" + taskNum;

      //create the row and add data
      var tr = document.createElement('tr');
      var td = tr.appendChild(document.createElement('td'));
      td.innerHTML = inputName;
      table.appendChild(tr);
      var td = tr.appendChild(document.createElement('td'));
      td.appendChild(checkbox);
      callListener(checkbox, arrayTask[taskNum].completed, taskNum);

      //log the new task
      console.log(arrayTask[taskNum]);
      console.log(arrayTask[taskNum].date());

      //change task num and clear input box;
      taskNum += 1;
      input.value = "";
  } else {
    alert("try again");
  }
});

// see if checkbox is clicked and updates task
function callListener(checkName, comp, num) {
    checkName.addEventListener('click', function() {
    comp = !comp;
    arrayTask[num].completed = comp;
    console.log(arrayTask[num].name + ' completed: ' + arrayTask[num].completed);
  });
}
