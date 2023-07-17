import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import { moveTask, selectColumnOrder } from "../redux/todoSlice";
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
  const columnOrder = useSelector(selectColumnOrder);

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
      moveTask({
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        taskId: draggableId,
      })
    );
  };

  const handleOnDragStart = (start) => {
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";

    setHomeIndex(columnOrder.indexOf(start.source.droppableId));
  };

  const handleOnDragUpdate = (update) => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(data.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const Columns = () => {
    return columnOrder?.map((columnId, index) => {
      const isDropDisabled = index ? index < homeIndex : true;
      return (
        <Column
          key={columnId}
          isDropDisabled={isDropDisabled}
          columnId={columnId}
        />
      );
    });
  };

  return (
    <DragDropContext
      onDragEnd={handleOnDragEnd}
      onDragStart={handleOnDragStart}
      onDragUpdate={handleOnDragUpdate}
    >
      <Container>
        <Columns />
      </Container>
    </DragDropContext>
  );
};

export default TodoManager;
