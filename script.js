// document.addEventListener('DOMContentLoaded', function () {
//     const addButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');
//     const tasks = [];

//     function loadTask() {
//         const existingTasks = localStorage.getItem('tasks');
//         if (existingTasks) {
//             parsedTasks = JSON.parse(existingTasks);
//             parsedTasks.forEach(task => addTask(task, false)); //calling addTask and pass each task as it argument
//         }
//     }
//     function saveTask() {
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//     }

//     function addTask(taskText, save = true) {
//         taskText = taskInput.value.trim();
//         if (taskText === "") {
//             alert("Enter a task");
//             return;
//         } else {
//             const li = document.createElement('li');
//             li.textContent = taskText;

//             let rmvBtn = document.createElement('button');
//             rmvBtn.textContent = 'Remove';
//             rmvBtn.classList.add('remove-btn');

//             rmvBtn.addEventListener('click', () => {
//                 taskList.removeChild(li);
//                 tasks = tasks.filter(task => task !== taskText) //checks if the task of tasks is not equal to the taskText value. if true task is kept in the resulting array
//                 if (save) {
//                     saveTask();
//                 }
//             });


//             li.append(rmvBtn); //apend remove button to li
//             taskList.appendChild(li); //apend li to the taskList
//             taskInput.value = '';   // empty the iput box

//             tasks.push(taskText); //add the task to the tasks array

//             if (save) { //this prevent unnecessary saving to the localStorage
//                 saveTask();
//             }
//         }
//     }

//     addButton.addEventListener('click', addTask);

//     taskInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             addTask();
//         }
//     });

//     loadTask();
// });

document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let todoTasks = [];                 //todo's are push in here before saving into the local storage

    //this funtion loads task from the memory
    function loadTasks() {
        const retrieveTasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        retrieveTasks.forEach(retrieveTask => displayTasks(retrieveTask, false)); //populate displayTasks function with each todo found in the memory
    }

    //this funtion takes value to display from input and from memory(as argument)
    function addTask(taskText, save = true) {
        taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Enter a task");
            return;
        }

       displayTasks(taskText)
        taskInput.value = '';
        todoTasks.push(taskText);
        if (save){
            saveToMemory(todoTasks)
        }
    }

    //function to display tasks
    function displayTasks(taskText){
        const li = document.createElement('li'); //create li
        li.textContent = taskText;

        const rmvBtn = document.createElement('button'); //create a remove button
        rmvBtn.textContent = 'Remove';
        rmvBtn.classList.add('remove-btn');

        li.append(rmvBtn); //append button to li
        taskList.appendChild(li); // append li to task list div

        // logic to remove task from the page and memery
        rmvBtn.addEventListener('click', () => {
            taskList.removeChild(li); //remove li from page
            const datas = JSON.parse(localStorage.getItem('tasks') || '[]') //retrieve todo's in the memory
            todoTasks = datas.filter(data => data !== taskText); //iterate retrieved todo's for any missing today, leave out missing ones 
            saveToMemory(todoTasks); //resave the remaining Todos back to the memory
        });
    }


    //funntion to save to the memory
    function saveToMemory(){
        localStorage.setItem("tasks", JSON.stringify(todoTasks));
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });


    loadTasks();
});
