import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {API_KEY, API_URL} from "./api/constants";
import { Operations } from "./Operations";
import {getOperations} from "./api/getOperations";
import {Operation} from "./Operation";


export const Task = ({title, description, id, status, remove}) => {

    const [task, setTask] = useState({
        taskID: id,
        taskTitle: title,
        taskDescription: description,
        taskStatus: status,
        taskForm: false,
    })

    const [operations, setOperations] = useState([])

    const handleEditOperation = (timeSpent) => {
        console.log(timeSpent)
        setTask(prev => ({
            ...prev,
            timeSpent: timeSpent
        }))
    }

    const onNewOperation = operation => {
        setOperations(prev => ([
          ...prev,
          operation
        ]))
      }

      const onRemoveOperation = (id) => {
        const newOperationList = operations.filter(item => item.id !== id)
        setOperations(newOperationList)
      }

    useEffect(() => {
        async function apiCall() {
            try {
                const data = await getOperations(id);
                setOperations(data)
            } catch(err) {
                console.log(err)
            }
        }
        apiCall();
    }, [])
    
    const changeStatus = () => {
        task.taskStatus == "open" ?
        setTask(prev => ({
            ...prev,
            taskStatus: "closed"
        })) :
        setTask(prev => ({
            ...prev,
            taskStatus: "open"
        })) 
    }


    const handleDeleteTask = () => {
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
        })
        .then(remove(id))
        .catch(err => console.warn(err))
    }

    const handleStatusTask = () => {
        const isClosed = task.taskStatus == "open" ? "closed" : "open";
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: task.taskTitle,
                description: task.taskDescription,
                status: isClosed
            })
        })
        .then(changeStatus())
        .catch(e => console.warn(e))
    }

    const handleAddOperation = () => {
        if(task.taskStatus == "open"){
            task.taskForm === false ?
            setTask(prev => ({
                ...prev,
                taskForm: true
                }))
            :
            setTask(prev => ({
                ...prev,
                taskForm: false
            })) 
        }
    }
    
    const AddOperationButton = () => (
        <button onClick={handleAddOperation} className="btn btn-info btn-sm mr-2">
        Add operation
        <i className="fas fa-plus-circle ml-1"></i>
        </button>
    )

    const DeleteButton = () => (
        <button id={task.taskID}  type="submit" onClick={handleDeleteTask} className="btn btn-outline-danger btn-sm ml-2">
        <i className="fas fa-trash false"></i>
        </button>
    )
    

    return (
        <>
        <section className="card mt-5 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
            <div>
            <h5>{task.taskTitle}</h5>
            <h6 className="card-subtitle text-muted">{task.taskDescription} {task.taskStatus}</h6>
            </div>


            <div>
            {task.taskStatus == "open" ? <AddOperationButton/> : null}
                
            <button type="submit" onClick={handleStatusTask} className="btn btn-dark btn-sm">
                {task.taskStatus == "open" ? "Finish" : "Resume task"}
                <i className="fas fa-archive ml-1"></i>
            </button>

            {operations.length < 1 ? <DeleteButton/> : null} 
            </div>
        </div>
        <Operations key={task.taskID} taskID={task.taskID} form={task.taskForm} operations={operations} onNewOperation={onNewOperation} onRemoveOperation={onRemoveOperation} handleEditOperation={handleEditOperation}/>
        {operations.map((e, index) => {
            return <Operation key={e.id} e={e} onRemoveOperation={onRemoveOperation}/>
        })}

        </section>
        </>
    )
}

