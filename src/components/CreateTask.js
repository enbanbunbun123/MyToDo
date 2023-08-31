import "../styles/createTask.css";
import "../styles/modal.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";

export default function CreateTask({ data, setdata }) {
  const [newTask, setNewTask] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false); 
  const navigate = useNavigate();

  const handleTaskchange = (e) => {
    setNewTask(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handelTaskAdd = () => {
    if(newTask === "") {
      setIsOpen(true);
      return;
    }

    const newId = uuid4();
    const newDataTask = {
      id: newId,
      title: newTask,
      description: newDescription,
    };

    setdata((prevData) => {
      return prevData.map((section) => {
        if (section.title === "今からやること") {
          return {
            ...section,
            tasks: [...section.tasks, newDataTask],
          };
        } else {
          return section;
        }
      });
    });
    setNewTask("");
    setNewDescription("");
    navigate("/");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
    {isOpen && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              <p className="modal-text">「タスクの名前」は入力必須項目です。</p>
              <button onClick={handleClose}>閉じる</button>
            </div>
          </div>
        </div>
      )}
      <div className="return-button">
        <p className="trello-input-button-return" onClick={() => navigate("/")}>
          <img src="/return-icon.png" alt="戻る"></img>
        </p>
      </div>
      <div className="add-content">
        <div className="add-title">タスクの新規作成</div>
        <input
          className="trello-input-text"
          type="text"
          value={newTask}
          onChange={handleTaskchange}
          placeholder="タスクの名前"
        />
        <textarea
          className="trello-input-text-description"
          type="text"
          value={newDescription}
          onChange={handleDescriptionChange}
          placeholder="タスクの説明"
        />
        <button className="trello-input-button-add" onClick={handelTaskAdd}>
          追加
        </button>
      </div>
    </>
  );
}
