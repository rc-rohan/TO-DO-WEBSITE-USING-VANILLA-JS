
const popUpMsg = document.querySelector(".pop-up-msg") /* pop-up-msg */,
  addTask = document.getElementById("addTask") /* Task-Input */,
  form = document.querySelector(".new-task-form") /* Form */,
  todoList = document.querySelector(".todo-lists .tasks"),
  doingList = document.querySelector(".doing-lists .tasks"),
  doneList = document.querySelector(".done-lists .tasks"),
  taskList = document.querySelectorAll(".tasks"), /* selecting UL*/
  categorySelected = document.querySelectorAll('input[type = "radio"]');/* Radio-btns */


/*
    ! ACHEVE DRY Principle
    todo-1 add the window loading evnt which will reload all the tasks
    todo-2 : Create the drag and drop  API to Move the data from one place to other
    TODO -3: Create a function which checks and sends which radio btn is selected
    todo4 Create a global function of the getALLTasks varible which get updated automatically every time and can be acessed everywhere

*/



// * Get all Task from the local storage

var getAllTasks,id=0;
if (localStorage.getItem("tasks") === null) {
  getAllTasks = {
    todo: [],
    doing: [],
    done: [],
  };

} else {
  getAllTasks = JSON.parse(localStorage.getItem("tasks"));
}



document.addEventListener("DOMContentLoaded", () => {
    getAllTasks.todo.forEach((input,index) => createNewTask(input,"todo",index));
    getAllTasks.doing.forEach((input,index) => createNewTask(input,"doing",index));
    getAllTasks.done.forEach((input,index) => createNewTask(input,"done",index));

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


function createNewTask(inputValue, taskType,index) {

  id = getAllTasks[taskType].length ;
  var elementID = index ?? id;/* Using Nullish Operator  */
  /* Nullish operator makes the work easier instead of using if-else */
  var html = `<li id="${taskType}-${elementID+1}" draggable="true"  ondragstart="onDragStart(event);"  ondragstart="onDragStart(event);> <span class="content">${inputValue}</span> <div class="icons"> <span > <svg class="delete-task" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30px" height="30px" stroke="#808080"> <path pointer-events="none" fill="none" stroke-miterlimit="10" stroke-width="2" d="M23 27H11c-1.1 0-2-.9-2-2V8h16v17C25 26.1 24.1 27 23 27zM27 8L7 8M14 8V6c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v2M17 23L17 12M21 23L21 12M13 23L13 12" /> </svg> </span> </div> </li>`;

  if (taskType === "todo") {
    todoList.insertAdjacentHTML("beforeend", html);
  } else if (taskType === "doing") {
    doingList.insertAdjacentHTML("beforeend", html);
  } else if (taskType === "done") {
    doneList.insertAdjacentHTML("beforeend", html);
  }
}


/*
  todo1 : check on which elememnt the drag has started through the classlist.contanins() property
  todo2 : after that add the dragover attributest to thosse dinamically

*/




function onDrop(event) {
  const id = event.dataTransfer.getData("text");
  const  element = document.querySelector()
}


function addTaskToLocalStorage(inputValue, taskType) {


  getAllTasks[taskType].push(inputValue);

  localStorage.setItem("tasks", JSON.stringify(getAllTasks));
  console.log(getAllTasks);
}

/* Delete Tasks */
taskList.forEach(li => li.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    // showPopUp();
    const element =  e.target.parentElement.parentElement.parentElement;
    removeFromLocalStorage(element);
   element.remove();
  }
}));

// Removing deleted Item Form LocalStorage
function removeFromLocalStorage(element){
 let type,text;
  type = element.id.split("-");
  text = element.innerText;
  // Removing From Array
  getAllTasks[type[0]].splice(getAllTasks[type[0]].indexOf(text),1);

  //Updating  local storage
  localStorage.setItem("tasks", JSON.stringify(getAllTasks));

}


