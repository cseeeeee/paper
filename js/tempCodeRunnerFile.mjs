if(savedToDos){
  toDos= JSON.parse(savedToDos);
  if(toDos[0]){
    toDos.forEach( todo =>{
      paintToDo(todo)
    });
  }
}