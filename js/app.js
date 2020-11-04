import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {getTasks} from "./api/getTasks"
import {getOperations} from "./api/getOperations"
import {Task} from "./Task";
import {NewTask} from "./newTask"


const apiKey = "3f803b1b-413e-4c07-8d14-64224e071097"
const apiUrl = "https://todo-api.coderslab.pl/api/tasks"

const App = () => {

  const [tasks, setTasks] = useState([])

  useEffect(() =>{
    getTasks(data => setTasks(data))
  }, [])


  const onNewTask = task => {
    setTasks(prev => ([
      ...prev,
      task
    ]))
  }

  const onRemoveTask = (id) => {
    const newTasksList = tasks.filter(item => item.id !== id)
    setTasks(newTasksList)
  }


  return (
    <>
    <NewTask add={onNewTask}/>
    {/* <Task tasks={tasks} remove={onRemoveTask}/>, */}
    {tasks.map((e, index) =>
    <Task key={e.id} title={e.title} description={e.description} id={e.id} status={e.status} remove={onRemoveTask}/>
    )}
    </>
  )
}



ReactDOM.render(<App/>, document.querySelector("#app"));