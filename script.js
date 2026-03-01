let ADDT = document.getElementById("ADD");
let remove = document.getElementById("remove");


ADDT.addEventListener("click", (e) => {

    let tasks = document.getElementById("text").value;
    let descs = document.getElementById("desc").value;

    let list = JSON.parse(localStorage.getItem("todo")) || [];

    let todo = {
        task: tasks,
        description: descs,
        complete: false 
    };

    list.push(todo);

    localStorage.setItem("todo", JSON.stringify(list));

    show_list();   // refresh UI

    document.getElementById("text").value = "";
    document.getElementById("desc").value = "";
});

remove.addEventListener("click", (e) => {
    localStorage.removeItem("todo");
    console.log("Task removed");
});

const show_list = () => {

    let list = JSON.parse(localStorage.getItem("todo")) || [];

    let paragraph = document.getElementById("para");
    paragraph.innerHTML = '';


    // list.forEach((item) => {
    //     let li = document.createElement("li");
    //     li.innerText = item.task + " - " + item.description;
    //     paragraph.appendChild(li);
    // });

    list.forEach((item, index) => {

    let li = document.createElement("li");
    li.innerText = item.task + " - " + item.description;

    if(item.completed){
        li.style.color = "green";
        li.style.textDecoration = "line-through";
    }

    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.style.background='rgb(203, 31, 31)';
    btn.style.margin="0px 10px";
    btn.onclick = () => deleteTask(index);

    let btnn = document.createElement("button");
    btnn.innerText="Done"
    btnn.style.background="blue"
    btnn.style.margin="0px 10px"
    btnn.onclick=()=>Change(index) 

    li.append(btnn)
    li.appendChild(btn);
    paragraph.appendChild(li);
});
}
document.addEventListener("DOMContentLoaded", show_list);
function deleteTask(index) {

    let list = JSON.parse(localStorage.getItem("todo")) || [];

    list.splice(index, 1);  // remove 1 item at index

    localStorage.setItem("todo", JSON.stringify(list));

    show_list();
}
function Change(index){

    let list = JSON.parse(localStorage.getItem("todo")) || [];

    list[index].completed = !list[index].completed;  

    localStorage.setItem("todo", JSON.stringify(list));

    show_list();
}