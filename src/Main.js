import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import dummydata from "./dummyData";
import Card from "./components/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";

const Main = () => {
  const [data, setdata] = useState(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return dummydata;
    }
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 別のカラムにタスクを移動
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId,
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);

      destinationTask.splice(destination.index, 0, removed);

      const newData = [...data];
      newData[sourceColIndex] = { ...sourceCol, tasks: sourceTask };
      newData[destinationColIndex] = {
        ...destinationCol,
        tasks: destinationTask,
      };

      setdata(newData);
    } else {
      // 同じカラム内での移動
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourceCol = data[sourceColIndex];

      const sourceTask = [...sourceCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);

      sourceTask.splice(destination.index, 0, removed);

      const newData = [...data];
      newData[sourceColIndex] = { ...sourceCol, tasks: sourceTask };

      setdata(newData);
    }
  };

  const handleTaskDelete = (sectionId, taskId) => {
    setdata((prevData) => {
      return prevData.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.filter((task) => task.id !== taskId),
          };
        } else {
          return section;
        }
      });
    });
  };

  const handleTaskEdit = (sectionId, taskId, title, description) => {
    setdata((prevData) => {
      return prevData.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) =>
              task.id === taskId ? { ...task, title, description } : task,
            ),
          };
        } else {
          return section;
        }
      });
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/CreateTask"
            element={<CreateTask data={data} setdata={setdata} />}
          />
          <Route
            path="/EditTask/:sectionId/:taskId"
            element={<EditTask data={data} onTaskEdit={handleTaskEdit} />}
          />
          <Route
            path="/"
            element={
              <DragDropContext onDragEnd={onDragEnd}>
                <Link to="/CreateTask">
                  <button className="trello-input-button-addTask">
                    タスクを追加する
                  </button>
                </Link>
                <div className="trello">
                  {data.map((section) => (
                    <Droppable key={section.id} droppableId={section.id}>
                      {(provided) => (
                        <div
                          className="trello-section"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <div className="trello-setion-title">
                            {section.title}
                          </div>
                          <div className="trello-section-content">
                            {section.tasks.map((task, index) => (
                              <Draggable
                                draggableId={task.id}
                                index={index}
                                key={task.id}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      ...provided.draggableProps.style,
                                      opacity: snapshot.isDragging
                                        ? "0.7"
                                        : "1",
                                    }}
                                  >
                                    <Card
                                      task={task}
                                      sectionId={section.id}
                                      onDelete={handleTaskDelete}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default Main;
