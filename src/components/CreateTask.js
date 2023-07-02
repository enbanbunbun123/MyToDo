import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid4 } from 'uuid';

export default function CreateTask ({data, setdata}) {
    const [newTask, setNewTask] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const navigate = useNavigate();

    const handleTaskchange = (e) => {
        setNewTask(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    }

    const handelTaskAdd = () => {
        const newId = uuid4();
        const newDataTask = {id: newId, title: newTask, description: newDescription};

        setdata(prevData => {
            return prevData.map(section => {
                if(section.title === "今からやること"){
                    return{
                        ...section,
                        tasks: [...section.tasks, newDataTask]
                    }
                } else {
                    return section
                }
            })
        });
        setNewTask("");
        setNewDescription("");
        navigate("/");
    }

    return (
        <>
        <input
            className='trello-input-text'
            type='text'
            value={newTask}
            onChange={handleTaskchange}
            placeholder='Task Title'
        />
        <input
            className='trello-input-text'
            type='text'
            value={newDescription}
            onChange={handleDescriptionChange}
            placeholder='Task Description'
        />
        <button
        className='trello-input-button-add'
        onClick={handelTaskAdd}
        >Add</button>
        </>
    )
}