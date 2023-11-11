const toDoForm=document.querySelector('#todo-form');
const toDoInput=document.querySelector('#todo-form input');
const toDoList=document.querySelector('#todo-list');
const dayTitle=document.querySelector('#day');
const currentDate=new Date();
const currentDay=currentDate.getDate();

dayTitle.textContent=currentDay+'日';

let toDos=[];

const TODOS_KEY='todos';

function saveToDos(){
  localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));    //localstorage에는 문자열만 저장할 수 있기 때문에 변수->문자열로 변환
}

function doneToDo(e){
  const li = e.target.parentElement;
  if(li.style.color==='gray'){
    li.style.textDecoration='line-through';
    li.style.opacity=0.5;
    li.isChecked=1;
    li.style.color='black';
  }
  else{
    li.style.textDecoration='none';
    li.style.opacity=1;
    console.log(1);
    li.isChecked=0;
  }
  saveToDos();
}

function paintToDo(newTodo){
  const li=document.createElement('li');
  li.id=newTodo.id;  
  const button=document.createElement('button');
  button.classList.add('daily__button');
  button.innerText='✔️';
  button.addEventListener('click',doneToDo);
  const editInput=document.createElement('input');
  editInput.type='text';
  editInput.style.display='none';

  const span=document.createElement('span');
  span.classList.add('span');
  span.innerText=newTodo.text;

  li.appendChild(button);
  li.appendChild(span);
  li.appendChild(editInput);

  toDoList.appendChild(li);

  if(newTodo.isChecked){
    li.style.color='gray';
    li.textDecoration='line-through';
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
  const newTodo = toDoInput.value;
  toDoInput.value='';
  const newTodoObj={
    text: newTodo,
    id: Date.now(),
    isChecked: 0,
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit',handleToDoSubmit);

const savedToDos=localStorage.getItem(TODOS_KEY);
if(savedToDos){
  if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
}