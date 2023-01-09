import { useState, useEffect } from "react"


import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => { 
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () =>{
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data
  } 

  const fetchSingleTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data
  } 


  const [toggleAdder, setToggleAdder] = useState(false)




  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method:"POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks,data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })


    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {

    const taskToToggle = await fetchSingleTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:"PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTask)

    })

    const data = await res.json()


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
