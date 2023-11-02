const toDoFormMonth=document.querySelector('#todo-month-form');
const toDoInputMonth=document.querySelector('#todo-month-form input');
const toDoListMonth=document.querySelector('#todo-month-list');
const monthTitle=document.querySelector('#month');
const months=['1','2','3','4','5','6','7','8','9','10','11','12'];
const currentDate=new Date();
const currentMonth=currentDate.getMonth();

monthTitle.textContent=months[currentMonth] +'月';


let toDosMonthly=[];
const TODOSMONTHLY_KEY='todosMonthly';

function saveToDos(){
  localStorage.setItem(TODOSMONTHLY_KEY,JSON.stringify(toDosMonthly));
}

function deleteToDo(e){
  // console.log('deleting...');
  // console.log(event);

  const li=e.target.parentElement;
  // li.remove();
  li.style.textDecoration='line-through';
  li.style.color='gray';
  li.style.opacity=0.7;
  toDosMonthly=toDosMonthly.filter((todoMonthly)=> todoMonthly.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo){
  const li=document.createElement('li');
  li.id=newTodo.id;
  const span=document.createElement('span');
  span.innerText=newTodo.text;
  const button=document.createElement('button');
  button.classList.add('monthly__check');
  button.innerText='✔️';
  button.addEventListener('click',deleteToDo);

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
    id: Date.now()
  }

  toDosMonthly.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoFormMonth.addEventListener('submit',handleToDoSubmit);

const savedToDosMonthly=localStorage.getItem(TODOSMONTHLY_KEY);
if(savedToDosMonthly !== null){
  const parsedToDos=JSON.parse(savedToDosMonthly);
  toDosMonthly=parsedToDos;
  parsedToDos.forEach(paintToDo);
}