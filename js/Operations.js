import React, {useState} from "react";
import { API_KEY, API_URL } from "./api/constants";


export const Operations = ({taskID, form, onNewOperation}) => {

    const [inputs, setInputs] = useState({
        description: "",
        timeSpent: 0,
        task: taskID,
    })

    const handleChange = e => {
        const {name, value} = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const addNewOperation = e => {
        e.preventDefault();
        inputs.description.length >= 5 ? 
        fetch(`${API_URL}/tasks/${taskID}/operations`, {
            method: 'POST',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(data => onNewOperation(data))
        .catch(e => console.warn(e))
        : alert("Description must be longer or equal to 5 characters")
    }

    return (
        <>
        <div className="card-body" hidden={!form}>
        <form onSubmit={addNewOperation}>
            <div className="input-group">
            <input type="text"
                className="form-control"
                placeholder="Operation description"
                onChange={handleChange}
                value={inputs.description}
                name="description"
                />
                
            <div className="input-group-append">
                <button type="submit" className="btn btn-info">
                Add
                <i className="fas fa-plus-circle ml-1"></i>
                </button>
            </div>
            </div>
        </form>
        </div>
        </>
    )
}