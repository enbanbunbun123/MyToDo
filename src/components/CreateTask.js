import '../styles/createTask.css'
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
        <div className='add-content'>
            <div className='add-title'>タスクの新規作成</div>
            <input
                className='trello-input-text'
                type='text'
                value={newTask}
                onChange={handleTaskchange}
                placeholder='タスクの名前'
            />
            <textarea
                className='trello-input-text-description'
                type='text'
                value={newDescription}
                onChange={handleDescriptionChange}
                placeholder='タスクの説明'
            />
            <button
            className='trello-input-button-add'
            onClick={handelTaskAdd}
            >追加</button>
        </div>
        </>
    )
}