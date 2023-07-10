import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask = ({ data, onTaskEdit }) => {
    const { sectionId, taskId } = useParams();
    const navigate = useNavigate();
    const [ title, setTitle ] = useState('');
    const [ description, setDescription] = useState('');

    useEffect(() => {
        const section = data.find(section => section.id === sectionId);
        if(section){
            const task = section.tasks.find(task => task.id === taskId);
            if(task){
                setTitle(task.title);
                setDescription(task.description);
            }
        }
    },[sectionId, taskId, data]);

    const handleSave = () => {
        onTaskEdit(sectionId, taskId, title, description);
        navigate('/');
    }

    return(
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={description} onChange={e => setDescription(e.target.value)}/>
            <button onClick={handleSave}>保存</button>
        </div>
    )
};

export default EditTask