import React, {useState, useEffect, useInput} from "react";
import ReactDOM from "react-dom";
import { API_KEY, API_URL } from "./api/constants";
import { getOperations } from "./api/getOperations";
import {Operation} from "./Operation"


export const Operations = ({taskID, form, setForm, operations, onNewOperation, status, onRemoveOperation, handleEditOperation}) => {

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
        


        {/* <ul className="list-group list-group-flush">
            <Operation operations={operations} onRemoveOperation={onRemoveOperation} handleEditOperation={handleEditOperation}/>
        </ul> */}
        </>
    )
}