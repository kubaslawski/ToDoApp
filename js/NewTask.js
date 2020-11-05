import React, {useState} from "react";
import {API_KEY, API_URL} from "./api/constants";

export const NewTask = ({add}) => {


    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        status: "open",
    }) 

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addNewTask = e => {
        e.preventDefault();
        fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(data => add(data.data))
        .catch(e => console.warn(e))
    }



    return (
        <div className="card shadow">
        <div className="card-body">
            <h1 className="card-title">New task</h1>
            <form onSubmit={addNewTask}>
                    <div className="form-group">
                        <input type="text"
                            id ="taskTitle"
                            onChange={handleChange}
                            value={inputs.title}
                            className="form-control"
                            name="title"
                            placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            id="taskDescription"
                            className="form-control"
                            name="description"
                            value={inputs.description}
                            onChange={handleChange}
                            placeholder="Description"/>
                    </div>
                    <button type="submit" className="btn btn-info" id="buttonAddTask">
                        Add task
                        <i className="fas fa-plus-circle ml-1"></i>
                    </button>
                </form>
        </div>
        </div>
    )
}