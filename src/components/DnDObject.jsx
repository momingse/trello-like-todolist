import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import dayjs from "dayjs";
import dataset from "../data/testdata";
import Column from "./Column";

const Container = styled.div`
  margin-top: 30px;
  height: 70vh;
  display: flex;
  justify-content: center;
`;

const DnDObject = () => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("todoData");

    if (!storedData) return dataset;

    return storedData.columnOrder ? dataset : JSON.parse(storedData);
  });

  const [homeIndex, setHomeIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

  const handleModifyTask = (
    id,
    title,
    description,
    deadline,
    columeID,
    type
  ) => {
    if (type === "create") {
      let newTask = {
        id: `task-${Object.keys(data.tasks).length + 1}`,
        title: title,
        description: description,
        deadline: deadline,
      };
      let newTasks = { ...data.tasks, [newTask.id]: newTask };
      let newColumn = {
        ...data.columns[columeID],
        taskIds: [...data.columns[columeID].taskIds, newTask.id],
      };
      let newColumns = {
        ...data.columns,
        [columeID]: newColumn,
      };
      let newData = {
        ...data,
        tasks: newTasks,
        columns: newColumns,
      };
      console.log(newData)
      setData(newData);
    }
    else if (type === "delete") {
      let newTasks = { ...data.tasks };
      let columeID = Object.keys(data.columns).filter((key) => {
        return data.columns[key].taskIds.includes(id);})[0];

      delete newTasks[id];
      let newColumn = {
        ...data.columns[columeID],
        taskIds: data.columns[columeID].taskIds.filter((task) => task !== id),
      };
      let newColumns = {
        ...data.columns,
        [columeID]: newColumn,
      };
      let newData = {
        ...data,
        tasks: newTasks,
        columns: newColumns,
      };
      setData(newData);
    }

  };

  const handleOnDragEnd = (result) => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  const handleOnDragStart = (start) => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";

    setHomeIndex(data.columnOrder.indexOf(start.source.droppableId));
  };
  const handleOnDragUpdate = (update) => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(data.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
      onDragUpdate={handleOnDragUpdate}
    >
      <Container>
        {data.columnOrder &&
          data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
            const isDropDisabled = index ? index < homeIndex : true;
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                isDropDisabled={isDropDisabled}
                handleModifyTask={handleModifyTask}
              />
            );
          })}
      </Container>
    </DragDropContext>
  );
};

export default DnDObject;
