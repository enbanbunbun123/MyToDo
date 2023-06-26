import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import dummydata from "../dummyData"
import Card from './Card';
import {v4 as uuidv4} from 'uuid';

const Main = () => {
    const [data, setdata] = useState(dummydata);
    const [newTask, setNewTask] = useState("");

    const onDragEnd = (result) => {
      const { source, destination } = result;

      // if(!destination) return;

      // 別のカラムにタスクを移動
      if(source.droppableId !== destination.droppableId){
        const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
        const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);

        const sourceCol = data[sourceColIndex];
        const destinationCol = data[destinationColIndex];
  
        const sourceTask = [...sourceCol.tasks];
        const destinationTask = [...destinationCol.tasks];

        // 動かすタスクの削除
        const [removed] = sourceTask.splice(source.index, 1);
        
        // 動かした後のカラムにタスクを追加
        destinationTask.splice(destination.index, 0, removed);

        const newData = [...data];
        newData[ sourceColIndex ] = { ...sourceCol, tasks: sourceTask};
        newData[ destinationColIndex ] = {...destinationCol, tasks: destinationTask};
  
        // data[ sourceColIndex ].tasks = sourceTask;
        // data[ destinationColIndex ].tasks = destinationTask;

        setdata(newData);
      } else {
        // 同じカラム内での移動
        const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
        const sourceCol = data[ sourceColIndex ];
  
        const sourceTask = [...sourceCol.tasks]
        // タスクの削除
        const [removed] = sourceTask.splice(source.index, 1);
        // タスクの追加
        sourceTask.splice(destination.index, 0, removed);

        const newData = [...data];
        newData[ sourceColIndex ] = {...sourceCol, tasks: sourceTask};
  
        // data[ sourceColIndex ].tasks = sourceTask;
        setdata(newData);
      }
    };

    const handleInputChange= (e) => {
      setNewTask(e.target.value);
    }

    const handelTaskAdd = (sectionId) => {
      const newId = uuidv4();
      const newDataTask = { id: newId, title: newTask };

      setdata(prevData => {
        return prevData.map(section => {
          if(section.id === sectionId){
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
    }

  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='trello'>
          {data.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
              <div 
                className='trello-section'
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                  <div className='trello-setion-title'>{section.title}</div>
                  <input
                  className='trello-input-text'
                  type='text'
                  value={newTask}
                  onChange={handleInputChange}
                  placeholder='New Task'
                  />
                  <button 
                  className='trello-input-button'
                  onClick={() => handelTaskAdd(section.id)}
                  >Add</button>
                  <div className='trello-section-content'>
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
                              opacity: snapshot.isDragging ? "0.7" : "1",
                            }}
                          >
                            <Card>{task.title}</Card>
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
    </>

  )
}

export default Main