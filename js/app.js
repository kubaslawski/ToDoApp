import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {getTasks} from "./api/getTasks"
import {Task} from "./Task";
import {NewTask} from "./newTask"



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