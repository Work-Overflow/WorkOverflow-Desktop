// getting all required elements
//started
let body = document.querySelector('body');
let todoname = document.getElementById('todovalid');
const todonameselect = document.querySelector(".todoname");
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
let dark_mode_btn = document.querySelector('.dark_mode_btn');
let music_mode_btn = document.querySelector('.music_mode_btn');
let audio = new Audio('music.mp3');
let audio = new Audio("Music/music.mp3");
let User = localStorage.getItem("User Name");
let Todo = localStorage.getItem("Todo Name");


if (Todo == null || Todo == ""){
  todoname.innerHTML = "Untitled Todo";
}
else{
  todoname.innerHTML = Todo;
  document.title = "Work Overflow | "+Todo;
}


todonameselect.addEventListener('click', function () {
  let extracttodo = prompt("Enter your todo name:", "My TodoList")
  if (extracttodo != null){
    localStorage.setItem("Todo Name", extracttodo);
    let Todo = localStorage.getItem("Todo Name");
    todoname.innerHTML = Todo;
    document.title = "Work Overflow | "+Todo;
  }
})

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
}


function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  // const pendingTasksNumb = document.querySelector(".pendingTasks");
  // pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}


// music_mode
let music_mode_status = false;
music_mode_btn.addEventListener('click', function () {
  if (music_mode_status == false) {
    music_mode_btn.innerHTML = '<i class="fas fa-headphones-alt"></i>';
    music_mode_status = true;
    console.log("Hello")
    audio.play();
  } else {
    music_mode_btn.innerHTML = '<i class="far fa-play-circle"></i>';
    music_mode_status = false;
    console.log("Not Hello")
    audio.pause();
  }
});

// Confetti Functions initialize !
const startit = () => {
  setTimeout(function () {
      confetti.start();
  }, 1000);
};

const stopit = () => {
  setTimeout(function () {
      confetti.stop();
  }, 3000);
};

/*dark_mode*/
let dark_mode_status = false;
dark_mode_btn.addEventListener('click', function () {
  body.classList.toggle('dark_mode_active');
  if (dark_mode_status == false) {
    dark_mode_btn.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
    dark_mode_status = true;
    localStorage.getItem("User Theme")
    localStorage.setItem("User Theme", "Dark Mode Enable")
    console.log("Hello")
  } else {
    dark_mode_btn.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
    dark_mode_status = false;
    localStorage.getItem("User Theme")
    localStorage.setItem("User Theme", "Dark Mode Disable")
    console.log("Not Hello")
  }
  // Starting Confetti
  startit();
  stopit();

});
config = localStorage.getItem("User Theme")
if (config == "Dark Mode Enable") {
  dark_mode_status = true;
  body.classList.toggle('dark_mode_active');
  dark_mode_btn.innerHTML = '<i class="fa fa-sun-o" aria-hidden="true"></i>';
}
else if (config == "Dark Mode Disable") {
  dark_mode_status = false;
  body.classList.remove('dark_mode_active');
  dark_mode_btn.innerHTML = '<i class="fa fa-moon-o" aria-hidden="true"></i>';
}




// Time Function
function showTime(){
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";
  
  if(h == 0){
      h = 12;
  }
  
  if(h > 12){
      h = h - 12;
      session = "PM";
  }
  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;
  
  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();
