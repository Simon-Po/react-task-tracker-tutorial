import React from 'react'
import { FaTimes } from "react-icons/fa"


function Task({ task, onDelete, toggleReminder }) {
  return (
        <div onDoubleClick={() => toggleReminder(task.id)} className={task.reminder ? "task reminder" : "task"}>
            <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)} style={{ color: "red", cursor: "pointer"}} /></h3>
            <p>{task.day}</p>
        </div>
     
  )
}

export default Task