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

function removeToDo(e){
  // console.log(e);
  const li = e.target.parentElement;
  // const button=e.target;

  // li.addEventListener('click',function(){
    // if(button.clicked){
      // li.style.textDecoration='line-through';
      // li.style.opacity=0.5;
      // li.style.color='gray';
    // }else{
      // li.style.textDecoration = "none";
      // li.style.opacity = 1;
    // }
  // });
  // li.remove();
  li.style.textDecoration='line-through';
  li.style.color='gray';
  li.style.opacity=0.5;
  toDos=toDos.filter((toDos)=>toDos.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo){
  const li=document.createElement('li');
  li.id=newTodo.id;  
  const button=document.createElement('button');
  button.classList.add('daily__button');
  button.innerText='✔️';
  button.addEventListener('click',removeToDo);
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
  // toDos.push(newTodo);
  // paintToDo(newTodo);
  const newTodoObj={
    text: newTodo,
    id: Date.now()
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit',handleToDoSubmit);

const savedToDos=localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}