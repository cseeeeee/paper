const toDoFormMonth=document.querySelector('#todo-month-form');
const toDoInputMonth=document.querySelector('#todo-month-form input');
const toDoListMonth=document.querySelector('#todo-month-list');
const monthTitle=document.querySelector('#month');
const months=['1','2','3','4','5','6','7','8','9','10','11','12'];
const currentMonth=new Date().getMonth();

monthTitle.textContent=months[currentMonth] +'月';


let toDosMonthly=[];
const TODOSMONTHLY_KEY='todosMonthly';

function saveToDos(){
  localStorage.setItem(TODOSMONTHLY_KEY,JSON.stringify(toDosMonthly));
}

function doneTodoMonthly(e){
  const li=e.target.parentElement;
  if(li.style.color=='gray'){
    li.style.color='black';
    li.style.textDecoration='none';
    li.style.opacity=1;

    toDosMonthly.forEach( todo =>{
      if(todo.id==li.id){
        console.log(0);
        console.log(todo.id);
        console.log(li.id);
        todo.isChecked=0;
      }
    })
  }else{
    li.style.color='gray';
    li.style.textDecoration='line-through';
    li.style.opacity=0.5;
    toDosMonthly.forEach( todo =>{
      if(todo.id==li.id){
        console.log(1);
        todo.isChecked=1;
      }
    })
  }
}

function paintToDo(newTodo){
  const li=document.createElement('li');
  li.id=newTodo.id;
  const span=document.createElement('span');
  span.innerText=newTodo.text;
  const button=document.createElement('button');
  button.classList.add('monthly__check');
  button.innerText='✔️';
  button.addEventListener('click',doneTodoMonthly);

  li.appendChild(button);
  li.appendChild(span);
  toDoListMonth.appendChild(li);
}

function handleToDoSubmit(e){
  e.preventDefault();
  const newTodo=toDoInputMonth.value;
  toDoInputMonth.value='';
  const newTodoObj={
    text: newTodo,
    id: Date.now(), 
    isChecked: 0
  }

  toDosMonthly.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoFormMonth.addEventListener('submit',handleToDoSubmit);

const savedToDosMonthly=localStorage.getItem(TODOSMONTHLY_KEY);
if(savedToDosMonthly){
  toDosMonthly=JSON.parse(savedToDosMonthly);
  if(toDosMonthly[0]){
    toDosMonthly.forEach( todo =>{
      paintToDo(todo);
    })
  }
}