import React from "react";
import './ToDoItem.css'

const ToDoItem = ({idx, name, changeCurrentTask}) => {

    return (
      <>
        <div id={'currentTask'}
             onClick={() => changeCurrentTask(idx)}>
          <span id={'spanCurrentTask'}>{name}</span>
        </div>
      </>
     )
 }
 
 export default ToDoItem