//global variables
let Tasks = [];
let tasksCount = 0;

//getting doms onload index
function getDOMs() {
    const tasksoutput = document.getElementById("tasksoutput");
    const insertasks = document.getElementById("insertasks");
    const content = document.getElementById("content");
    const title = document.getElementById("title");
    const error = document.getElementById("error");
    start();
}

//statc function
function start() {
    hideInsertTasks();
    error.innerHTML = '';
}

//hide new task menu
function hideInsertTasks() {
    insertasks.style.display = 'none';
    error.value = '';
    title.value = '';
    content.value = '';
}

//show new task menu
function showInsertTasks() {
    insertasks.style.display = 'block';
}

//insert new task
function insert() {
    if((content.value != '') && (title.value != '')) {
        let task = new Task(title.value, content.value, tasksCount + 1);
        Tasks.push(task);
        saveTasks();
        title.value = '';
        content.value = '';
        error.style.color = 'black';
        insertasks.style.display = 'none';
    } else {
        error.innerHTML = 'Invaled Task';
        error.style.color = 'var(--red)';
    }
}

//task constructor
let Task = function(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id;
    tasksCount += 1;
}

//save task in local storage
function saveTasks() {
    for(var i = 0; i < Tasks.length; i++) {
        Tasks[i].id = i + 1;
    }
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
    loadTasks();
}


//load task from local storage
function loadTasks() {
    let loadedTasks = JSON.parse(localStorage.getItem('Tasks'));
    displayTasks();
}

//delete tasks
function clearTasks() {
    Tasks = [];
    localStorage.removeItem('Tasks');
    //loadTasks();
    location.reload();
}

//delete task
function clearTask(id) {
    var newid = id - 1;
    Tasks.splice(newid, 1);
    saveTasks();
}


//loading tasks when refresh
function loadTasksARefresh() {
    let loadtasksAR = JSON.parse(localStorage.getItem('Tasks'));
    if((loadtasksAR != null) || (loadtasksAR.length > 0)) {
        tasksCount = loadtasksAR.length;
        for(var i = 0; i < loadtasksAR.length; i++) {
            Tasks.push(loadtasksAR[i]);
        }
    } else {
        tasksCount = 0;
    }
}

//display tasks
function displayTasks() {
    let loadedTasksOP = JSON.parse(localStorage.getItem('Tasks'));
    if((loadedTasksOP != null) || (loadedTasksOP.length > 0)) {
        let titles = '';
        let contents = '';
        let output = '';

        output += '<div>';

        for(var a = 0; a < loadedTasksOP.length; a++) {
            output += '<span>';
            output += '<input class="x-btn" type="button" value="X" onclick="clearTask(' + loadedTasksOP[a].id + ');">'
            output += '<h2>' + loadedTasksOP[a].title + '</h2>' ;
            output += loadedTasksOP[a].content;
            output +='</span>';
        }

        output += '</div>';                    
        tasksoutput.innerHTML = output;
        
    } else {
        tasksoutput.innerHTML = 'no Tasks';
    }

}