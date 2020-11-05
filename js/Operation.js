import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {API_KEY, API_URL} from "./api/constants";

export const Operation = ({e, onRemoveOperation, handleEditOperation}) => {


    const [operation, setOperation] = useState({
        description: e.description,
        timeSpent: e.timeSpent,
        id: e.id,
        showForm: false 
    })

    const [time, setTime] = useState({
        time: 0
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setTime(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDeleteOperation = e => {
        e.preventDefault();
        fetch(`${API_URL}/operations/${operation.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            }
        })
        .then(onRemoveOperation(operation.id))
        .catch(err => console.warn(err))
    }

    const handleChangeOperation = e => {
        e.preventDefault();
        console.log(time.time)
        fetch(`${API_URL}/operations/${operation.id}`, {
            method: 'PUT',
            headers: {
                Authorization: API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                description: operation.description,
                id: operation.id,
                showForm: operation.showForm,
                timeSpent: time.time
            })
        })
        // .then(handleEditOperation(time.time))
        .then(setOperation(prev => ({
            ...prev,
            timeSpent: time.time
        })))
        .catch(err => console.warn(err))
    }


    //show Form or not
    const changeForm = () => {
        operation.showForm === false ?
        setOperation(prev => ({
            ...prev,
            showForm: true
        }))
        :
        setOperation(prev => ({
            ...prev,
            showForm: false
        }))
    }

    const closeTheForm = (e) => {
        e.preventDefault();
        console.log(e)
        setOperation(prev => ({
            ...prev,
            showForm: false
        }))
    }
        
    return (
        <>
        <li key={operation.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
            {operation.description}
        

            <span className="badge badge-success badge-pill ml-2">
                {operation.timeSpent}
            </span>
            </div>
            {operation.showForm ? 
            <form onSubmit={handleChangeOperation}>
            <div className="input-group input-group-sm">
            <input type="number"
                    id={operation.id}
                    name="time"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Spent time in minutes"
                    style={{width: "12rem"}}/>
            <div className="input-group-append">
                <button type="submit" className="btn btn-outline-success"><i className="fas fa-save"></i></button>
                <button type="submit" onClick={closeTheForm} className="btn btn-outline-dark"><i className="fas fa-times false"></i></button>
            </div>
            </div>
            </form>
            : null
            }


            <div>

            <button type="submit" onClick={changeForm} className="btn btn-outline-success btn-sm mr-2">
                Add time
                <i className="fas fa-clock ml-1"></i>
            </button>
        
            <button type="submit" onClick={handleDeleteOperation} className="btn btn-outline-danger btn-sm"><i className="fas fa-trash"></i></button>
            </div>
        </li>   
        </>   
    )
}