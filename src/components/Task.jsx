import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "#E3FCEF"
      : "white"};

  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const Task = (props) => {
  //   const [isDragDisabled, setIsDragDisabled] = React.useState(props.task.id === "task-1");
  const [isDragDisabled, setIsDragDisabled] = React.useState(false);

  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
      key={props.task.id}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* <Handle {...provided.dragHandleProps}/> */}
          {props.task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
