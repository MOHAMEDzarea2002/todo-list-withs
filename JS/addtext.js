//get element 
let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tsksdiv = document.querySelector('.tasks');


//empty arry to stor tasks
let arrayoftasks = []
//check if theres tasks in local storage
if (localStorage.getItem('tasks')) {
    arrayoftasks.JSON.parse(localStorage.getItem('tasks'))
}

//add task
submit.onclick = function () {
    if (input.value != "") {
        addtasktoarray(input.value);
        input.value = ""; /// emtpy input field
    }
}
//click on task element
tsksdiv.addEventListener("click", (ele) => {
    // Delet button 
    if (ele.target.classList.contains("delet")) {
        //remove element local storage
        deleteTaskWith(ele.target.parentElement.getAttribute("data-id"));
        // remove element page
        ele.target.parentElement.remove()
    }
    // task ele
    if (ele.target.classList.contains("task")) {
        toggletaskwith(ele.target.getAttribute("data-id"))
        // toggle Done class 
        ele.target.classList.toggle("done");
    }
})
function addtasktoarray(tsktext) {
    //tasks data
    const task = {
        id: Date.now(),
        title: tsktext,
        completed: false,
    }
    //push task to arry of tasks
    arrayoftasks.push(task);
    //add tasks to page
    addelementstopageform(arrayoftasks)
    //add to local storage
    addDatatolocalstroage(arrayoftasks)
}

function addelementstopageform(addtopage) {
    // empty tskas div 
    tsksdiv.innerHTML = ""
    // looping ON array 
    addtopage.forEach((element) => {
        // create main div 
        let div = document.createElement('div');
        div.className = "task";
        // check if task is done 
        if (element.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id",element.id);
        div.appendChild(document.createTextNode(element.title))
        // create delet button/
        let span = document.createElement('span');
        span.className = "delet";
        span.appendChild(document.createTextNode("Delet"))
        //add delet to min div
        div.appendChild(span)
        // add tsaks div
        tsksdiv.appendChild(div);
    });
}
//add in local storage 
function addDatatolocalstroage(arryadlocal) {
    window.localStorage.setItem("task",JSON.stringify(arryadlocal))
}
// GET data from localStorage fun
function getdatafromlocalStorage() {
    let Data = window.localStorage.getItem("task")
    if (Data) {
        let gettasks = JSON.parse(Data)
        addelementstopageform(gettasks)
    }
}
getdatafromlocalStorage()

function deleteTaskWith(taskid) {
    arrayoftasks = arrayoftasks.filter((task) => task.id != taskid);
    addDatatolocalstroage(arrayoftasks);
}

function toggletaskwith(tsks) {
    for (let i = 0; i < arrayoftasks.length; i++) {
        if (arrayoftasks[i].id == tsks) {
            arrayoftasks[i].completed == false ? arrayoftasks[i].completed = true : arrayoftasks[i].completed = false
        }
    }
    addDatatolocalstroage(arrayoftasks);
}