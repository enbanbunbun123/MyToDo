import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import dummydata from "../dummyData"
import Card from './Card';

const Main = () => {
    const [data, setdata] = useState(dummydata);

    const onDragEnd = (result) => {
      const { source, destination } = result;

      // 別のカラムにタスクを移動
      if(source.droppableId !== destination.draggableId){
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
  
        data[ sourceColIndex ].tasks = sourceTask;
        data[ destinationColIndex ].tasks = destinationTask;

        setdata(data);
      } else {
        // 同じカラム内での移動
        const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
        const sourceCol = data[sourceColIndex];
  
        const sourceTask = [...sourceCol.tasks]
        // タスクの削除
        const [removed] = sourceTask.splice(source.index, 1);
        // タスクの追加
        sourceTask.splice(destination.index, 0, removed);
  
        data[ sourceColIndex ].tasks = sourceTask;
        setdata(data);
      }
    };

  return (
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
                                opacity: snapshot.isDragging ? "0.3" : "1",
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
  )
}

export default Main