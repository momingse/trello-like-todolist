import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { moveTask } from "../redux/todoSlice";
import Column from "./Column";

const Container = styled.div`
  margin-top: 30px;
  height: 70vh;
  display: flex;
  justify-content: center;
`;

const TodoManager = () => {
  const [homeIndex, setHomeIndex] = useState(null);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.todo);

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(data));
  }, [data]);

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

    dispatch(
      moveTask(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
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
              />
            );
          })}
      </Container>
    </DragDropContext>
  );
};

export default TodoManager;
