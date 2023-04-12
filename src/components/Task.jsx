import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  background-color: ${(props) => {
    if (props.isDragDisabled) {
      return "lightgrey";
    }
    if (props.isDragging) {
      return "#F5F5F5";
    }
    return "white";
  }};
  &:hover {
    background-color: #f5f5f5;
  }

  display: flex;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

const Task = (props) => {
  //   const [isDragDisabled, setIsDragDisabled] = React.useState(props.task.id === "task-1");
  const [isDragDisabled, setIsDragDisabled] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

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
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          {/* <Handle {...provided.dragHandleProps}/> */}
          {props.task.content}
          {isShown && (
            <ButtonContainer>
              <ClearIcon
                onClick={e => console.log("delete")}
                sx={{ fontSize: "15px", color: "grey" }}
              />
            </ButtonContainer>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
