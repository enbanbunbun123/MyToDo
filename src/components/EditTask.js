import "../styles/createTask.css";
import "../styles/editTask.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "./Modal";

const EditTask = ({ data, onTaskEdit }) => {
  const { sectionId, taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false); 

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const section = data.find((section) => section.id === sectionId);
    if (section) {
      const task = section.tasks.find((task) => task.id === taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [sectionId, taskId, data]);

  const handleSave = () => {
    if (title === "") {
      setIsOpen(true);
      return;
    }
    onTaskEdit(sectionId, taskId, title, description);
    navigate("/");
  };

  return (
    <>
    {isOpen && (
      <Modal handleClose={handleClose}/>
    )}
      <div className="return-button">
        <p className="trello-input-button-return" onClick={() => navigate("/")}>
          <img src="/return-icon.png" alt="戻る"></img>
        </p>
      </div>
      <div className="edit-content">
        <div className="edit-title">タスクの編集</div>
        <input
          className="trello-input-text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="trello-input-text-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="trello-input-button-edit" onClick={handleSave}>
          変更を保存
        </button>
      </div>
    </>
  );
};

export default EditTask;
