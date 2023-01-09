import { useState } from "react"


import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
  const [tasks, setTasks] = useState([{
    id:1,
    text:"Love Rita",
    day: "Today",
    reminder: false,
},   
{  
    id:2,
    text:"Love Rita More",
    day: "Tomorrow",
    reminder: true,
}] )

  const [toggleAdder, setToggleAdder] = useState(false)




  // Add Task
  const addTask = (task) => {
    
    task.id = (tasks.length !== 0) ? tasks[tasks.length - 1].id + 1 : 1
    setTasks([...tasks, task])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    let tmp = [...tasks]
    tmp[id-1].reminder = !(tmp[id-1].reminder)
    setTasks([...tmp])
    
  }


  return (
    <div className="container">
      <Header toggleAdder={toggleAdder} setToggleAdder={setToggleAdder} />
      {(toggleAdder) ? <AddTask addTask={addTask} /> : ""}
      {tasks.length > 0 ? <Tasks tasks={tasks} toggleReminder={toggleReminder} onDelete={deleteTask}  /> : "No Tasks to Show"}
    </div>
  );
}

export default App;
