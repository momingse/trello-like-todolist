import React, { useMemo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TaskCreator from "./TaskCreator";
import Task from "./Task";
import { selectColumnById } from "../redux/todoSlice";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 15px;
  width: 20vw;
  background-color: white;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
  border-bottom: 1px solid lightgrey;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  // background-color: ${(props) =>
    props.isdraggingover ? "#FFEBE6" : props.isStart ? "#E3FCEF" : "inherit"};
  background-color: ${(props) =>
    props.isdraggingover ? "lightgrey" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
  // border-radius: 0 0 15px 15px;
`;

const InnerList = React.memo(({ taskIds, columnId }) => {
  function areEqual(prevProps, nextProps) {
    if (prevProps.taskIds === nextProps.taskIds) {
      return true;
    }
    return false;
  }

  return taskIds.map((taskId, index) => (
    <Task key={taskId} taskId={taskId} index={index} columnId={columnId} />
  ));
});

const Column = (props) => {
  const { columnId } = props;
  const column = useSelector((state) => selectColumnById(state, columnId));

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable
        droppableId={columnId}
        // isDropDisabled={props.isDropDisabled}
      >
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver}
            isStart={snapshot.draggingFromThisWith}
          >
            <InnerList taskIds={column.taskIds} columnId={columnId} />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <TaskCreator columnId={columnId} />
    </Container>
  );
};

export default Column;
