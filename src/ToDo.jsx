import React, {useState} from "react";
import ToDoItem from "./ToDoItem";
import './ToDo.css'


let varForEditTask;

const ToDo = () => {                            //Base for tasks
  const [name, setName] = useState('')
  const [todos, setTodos] = useState([{
    id: 0,
    name: 'написать ToDo приложение',
    isChecked: false,
  }]);

  const addNewTask = event => {      //Add new task, if click Enter
    if (event.key === 'Enter') {
      event.preventDefault()
      setTodos(prevState => [...prevState, {id:todos.length, name, isChecked:false}])
      setName('')
    }
  }

  const changeCurrentTask = idx => {                //Подготовка к редактированию заметки
    document.getElementById('inputAddNewTask').hidden = true;
    document.getElementById('buttonAddNewTask').hidden = false;
    document.getElementById('textareaForEditTasks').hidden = false;

    const newArray = [].concat(todos)
    varForEditTask = idx
    setTodos(newArray)

    //передаем имя заметки, на которую кликнули в textarea
    const currentObjectTask = todos.find(object => object.id === idx)
    document.getElementById('textareaForEditTasks').value = currentObjectTask.name

  }

  const editCurrentTask = event => {      //при клике на enter замена старой заметки на новую
    if (event.key === 'Enter') {
      event.preventDefault()

      let currentTask = todos.find(object => object.id === varForEditTask)
      currentTask.name = document.getElementById('textareaForEditTasks').value

      setTodos(prevState => [...prevState])
      document.getElementById('textareaForEditTasks').value = ''
    }
  }

  const deleteThisTask = idx => {
    let removed = todos.splice(idx,1)      //удалить нужный элемент по индексу
    setTodos(prevState => [...prevState])       //перезаписать массив todos


  }

  const changeStatusTask = idx => {                           //Изменение статуса задачи (выполнена или нет)
    let currentTask = todos.find(object => object.id === idx) // при клике на input type=checkbox
    currentTask.isChecked = !currentTask.isChecked
    let thisSpan = document.getElementsByName('1')
    console.log(thisSpan)
    //setStatusTask(currentTask, thisSpan)
    //console.log('ok')
  }

  const setStatusTask = (task, span) => {
    if (task.isChecked === false)
      span.style.color = 'grey'
    else
      span.style.color = 'green'
  }

  const findTask = event => {       //функция поиска заметки
    if (event.key === 'Enter') {
      //при клике на enter найденная заметка отобразится в textarea
      const nameFindTask = document.getElementById('findTask').value

      const needTask = todos.find(object => object.name === nameFindTask)
      //и выполнится та же функция что и редактирует заметки при клике на них
      changeCurrentTask(needTask.id)
      document.getElementById('findTask').value = ''
    }
  }

  return (
    <>
      <div id={'divForTasks'}>
        {todos &&
          todos.map((todo, idx) => (
          <div id={'listCurrentTask'}>
            <div>
              <input
                onClick={() => deleteThisTask(idx)}
                id={"deleteInput"}
                type={"image"}
                src={"delete.png"}
                alt={"Кнопка удаления"}/>
              <input
                id={'inputStatus'}
                type={"checkbox"}
                checked={todos.isChecked}
                readOnly={true}
                onClick={() => changeStatusTask(idx)}
              />
            </div>
            <div>
              <ToDoItem
                //key={idx}
                idx={idx}
                name={todo.name}
                isChecked={todo.isChecked}
                changeCurrentTask={changeCurrentTask}
            />
            </div>
          </div>

        ))}
          <div id={'addNewTask'}>
            <div id={'divForButton'}>
              <button id={'buttonAddNewTask'}
                      hidden={true}
                      onClick={() => {document.getElementById('inputAddNewTask').hidden = false
                                      document.getElementById('buttonAddNewTask').hidden = true
                                      document.getElementById('textareaForEditTasks').value = ''
                                      }
              }>+</button>
            </div>
            <div id={'divForInput'}>
              <input id={'inputAddNewTask'}             //Input for new task
                   type={"text"}
                   value={name}
                   onChange={event => setName(event.target.value)}
                   onKeyPress={addNewTask}
                   placeholder={'New task'}/>
            </div>
            <div>
              <input id={'findTask'}
                     placeholder={'Find task..'}
                     onKeyPress={findTask}
              />
            </div>
          </div>
      </div>

      <div id={'divForEditTasks'}>
        <textarea id={'textareaForEditTasks'}
                  hidden={true}
                  onKeyPress={editCurrentTask}></textarea>
      </div>
    </>
     )
 }

 export default ToDo