import React from "react";
import { Link } from "react-router-dom";

function Card({ task, sectionId, onDelete }) {
  return (
    <div className="card">
      <div className="icons">
        <div
          onClick={() => onDelete(sectionId, task.id)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <img className="delete-icon" src="./icon-delete.png" alt="削除"></img>
        </div>
        <Link
          to={`EditTask/${sectionId}/${task.id}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <img className="edit-icon" src="./icon-edit.png" alt="編集"></img>
        </Link>
      </div>
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </div>
  );
}

export default Card;
