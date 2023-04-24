//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

//var taskInput=document.getElementById("new-task");//Add a new task.
var taskInput=document.querySelector(".add-item__task");//Add a new task.
//var addButton=document.getElementsByTagName("button")[0];//first button
var addButton=document.querySelector('.btn-add');
//var incompleteTaskHolder=document.getElementById("incompleteTasks");//ul of #incompleteTasks
var incompleteTaskHolder=document.querySelector('.todo__list');
//var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks
var completedTasksHolder=document.querySelector('.completed__list');


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className="todo__item";
    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='todo__task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="todo__checkbox checkbox";

    editInput.type="text";
    editInput.className="todo__text input-text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="todo__btn-edit btn-edit";

    deleteButton.className="todo__btn-delete btn-delete";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className="todo__img";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".btn-edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    listItem.className='completed__item';
    
    var checkbox=listItem.querySelector('.todo__checkbox');
    checkbox.className='completed__checkbox checkbox';

    var label=listItem.querySelector('.todo__task');
    label.className='completed__task';

    var input=listItem.querySelector('.todo__text');
    input.className='completed__text input-text';

    var editButton=listItem.querySelector('.todo__btn-edit');
    editButton.className='completed__btn-edit btn-edit';

    var deleteButton=listItem.querySelector('.todo__btn-delete');
    deleteButton.className='completed__btn-delete btn-delete';

    var deleteButton=listItem.querySelector('.todo__img');
    deleteButton.className='completed__img';

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    listItem.className='todo__item';
    
    var checkbox=listItem.querySelector('.completed__checkbox');
    checkbox.className='todo__checkbox checkbox';

    var label=listItem.querySelector('.completed__task');
    label.className='todo__task';

    var input=listItem.querySelector('.completed__text');
    input.className='todo__text input-text';

    var editButton=listItem.querySelector('.completed__btn-edit');
    editButton.className='todo__btn-edit btn-edit';

    var deleteButton=listItem.querySelector('.completed__btn-delete');
    deleteButton.className='todo__btn-delete btn-delete';

    var deleteButton=listItem.querySelector('.completed__img');
    deleteButton.className='todo__img';
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".btn-edit");
    var deleteButton=taskListItem.querySelector(".btn-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.