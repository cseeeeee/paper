const toDoFormMonth=document.querySelector('#todo-month-form');
const toDoInputMonth=document.querySelector('#todo-month-form input');
const toDoListMonth=document.querySelector('#todo-month-list');
const doneListMonth=document.querySelector("#done-month-list");
const monthTitle=document.querySelector('#month');
const months=['1','2','3','4','5','6','7','8','9','10','11','12'];
const currentMonth=new Date().getMonth();

monthTitle.textContent=months[currentMonth] +'月';


let toDosMonthly=[];
const TODOSMONTHLY_KEY='todosMonthly';

function updateDate(todo){
  const todoMonthlyDate=new Date(todo.id).getMonth()
  if(todoMonthlyDate!==currentMonth){
    toDosMonthly=[];
    saveToDos();
  }
}

function saveToDos(){
  localStorage.setItem(TODOSMONTHLY_KEY,JSON.stringify(toDosMonthly));
}

function doneTodoMonthly(e){
  const li=e.target.parentElement;
  if(li.style.color==='gray'){
    li.style.color='black';
    li.style.textDecoration='none';
    li.style.opacity=1;

    toDosMonthly.forEach( todo =>{
      if(todo.id==li.id){
        todo.isChecked=0;
      }
      li.remove();
      toDoListMonth.append(li);
    })
  }else{
    li.style.color='gray';
    // li.style.textDecoration='line-through';
    li.style.opacity=0.5;
    toDosMonthly.forEach( todo =>{
      if(todo.id==li.id){
        todo.isChecked=1;
      }
      li.remove();
      doneListMonth.append(li);
    })
  }
  saveToDos()
}

function paintToDo(newTodo){
  const li=document.createElement('li');
  li.id=newTodo.id;
  const editInput=document.createElement('input');
  editInput.type='text';
  editInput.style.display='none';
  const button=document.createElement('button');
  button.classList.add('monthly__check');
  button.innerText='✔️';
  button.addEventListener('click',doneTodoMonthly);

  const span=document.createElement('span');
  span.innerText=newTodo.text;
  

  li.appendChild(button);
  li.appendChild(editInput);
  li.appendChild(span);
  toDoListMonth.appendChild(li);

  if(newTodo.isChecked){
    li.style.color='gray';
    li.textDecoration='line-through';
    li.style.opacity=0.5;
    li.isChecked=0;
  }

  span.addEventListener('dblclick',function(){
    span.style.display='none';
    editInput.style.display='inline-block';
    editInput.style.border='none';
    editInput.value=span.textContent;
    editInput.focus();
  });

  editInput.addEventListener('keyup',function(e){
    if(e.key==='Enter' || e.key==='Escape'){
      span.textContent=editInput.value;
      span.style.display='inline-block';
      editInput.style.display='none';
      }
    });
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
      updateDate(todo);
    })
  }
}