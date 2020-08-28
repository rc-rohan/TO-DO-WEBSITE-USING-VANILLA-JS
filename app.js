
const popUpMsg = document.querySelector(".pop-up-msg") /* pop-up-msg */,
  addTask = document.getElementById("addTask") /* Task-Input */,
  form = document.querySelector(".new-task-form") /* Form */,
  todoList = document.querySelector(".todo-lists .tasks"),
  doingList = document.querySelector(".doing-lists .tasks"),
  doneList = document.querySelector(".done-lists .tasks"),
  taskList = document.querySelector(".tasks"), /* selecting UL*/
  categorySelected = document.querySelectorAll('input[type = "radio"]');/* Radio-btns */


/*
    ! obtain the DRY principle
    todo-1 add the window loading evnt which will reload all the tasks
    todo-2 : Create the drag and drop  API to Move the data from one place to other
    TODO -3: Create a function which checks and sends which radio btn is selected

*/

// const popUpMessages = {
//   /* Add the instrucion messages in the inroMsg */
//   introMsg: "WELCOME!! To The Task manager ",
//   deleteSuccess: "The item Was Successfully Deleted :",
//   deleteFailed: "Unable to delte the Item currently",
// };



document.addEventListener("DOMContentLoaded", () => {
  var getAllTasks;
  if (localStorage.getItem("tasks") === null) {
    getAllTasks = {
      todo: [],
      doing: [],
      done: [],
    };
  } else {
    getAllTasks = JSON.parse(localStorage.getItem("tasks"));


    getAllTasks.todo.forEach((input) => createNewTask(input,"todo"));
    getAllTasks.doing.forEach((input) => createNewTask(input,"doing"));
    getAllTasks.done.forEach((input) => createNewTask(input,"done"));
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (addTask.value === "") {

    // showPopUp();

    /* pass the pop-up msg */
  } else {
    /* Get the Selected Radio Button*/
    var type = getCategory();

    /* Add the Task to LIst */
    createNewTask(addTask.value, type.id);

    /* Add the task to local storage */
    addTaskToLocalStorage(addTask.value,type.id);

    /*  Clear the input fields */
    addTask.value = "";
  }
});

function getCategory() {
  let selected;
  for (const element of categorySelected) {
    if (element.checked) {
      selected = element;
      break;
    }
  }
  return selected;
}


function createNewTask(inputValue, taskType) {
  var html =
    '<li class="'+taskType+'"> <span class="content">' +
    inputValue +
    '</span> <div class="icons"> <span > <svg class="delete-task" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30px" height="30px" stroke="#808080"> <path pointer-events="none" fill="none" stroke-miterlimit="10" stroke-width="2" d="M23 27H11c-1.1 0-2-.9-2-2V8h16v17C25 26.1 24.1 27 23 27zM27 8L7 8M14 8V6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v2M17 23L17 12M21 23L21 12M13 23L13 12" /> </svg> </span> </div> </li>';

  if ( taskType === "todo") {
    todoList.insertAdjacentHTML("beforeend", html);
  } else if ( taskType === "doing") {
    doingList.insertAdjacentHTML("beforeend", html);
  } else if ( taskType === "done") {
    doneList.insertAdjacentHTML("beforeend", html);
  }
}

function addTaskToLocalStorage(inputValue, taskType) {
  var getAllTasks;
  if (localStorage.getItem("tasks") === null) {
    getAllTasks = {
      todo: [],
      doing: [],
      done: [],
    };
  } else {
    getAllTasks = JSON.parse(localStorage.getItem("tasks"));
  }

    getAllTasks[taskType].push(inputValue);

  localStorage.setItem("tasks", JSON.stringify(getAllTasks));
  console.log(getAllTasks);
}

/* Delete Tasks */
taskList.addEventListener("click", (e) => {
  console.log(e.target.classList);
  if (e.target.classList.contains("delete-task")) {
    // showPopUp();

    // removeTaskFromLocalstorage();
    e.target.parentElement.parentElement.parentElement.remove();

  }
});

function removeTaskfromLocalStorage(){
  
}



// function showPopUp() {
//   var styleSelector = popUpMsg.style;
//   styleSelector.transform = "translateX(0rem)";
//   styleSelector.opacity = "1";
//   styleSelector.visibility = "visible";
//   setTimeout(() => {
//     styleSelector.transform = "translateX(36rem)";
//     styleSelector.opacity = "0";
//     styleSelector.visibility = "hidden";
//   }, 2000);
// }
