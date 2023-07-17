import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, selectTaskById } from "../redux/todoSlice";

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
  flex-direction: column;
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  align-self: end;
`;

const TaskTitle = styled.div`
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const TaskDescription = styled.div`
  font-size: 0.9rem;
`;

const TaskDeadline = styled.div`
  font-size: 0.6rem;
  text-align: right;
`;

const numberToDate = (dateNumber) => {
  let date = new Date(dateNumber);
  return date.toLocaleDateString();
};

const Task = (props) => {
  //   const [isDragDisabled, setIsDragDisabled] = React.useState(props.task.id === "task-1");
  const { taskId, index, columnId } = props;
  const [isDragDisabled, setIsDragDisabled] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

  const dispatch = useDispatch();
  const task = useSelector((state) => selectTaskById(state, taskId));

  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId, columnId));
  };

  return (
    <Draggable
      draggableId={taskId}
      index={index}
      key={taskId}
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
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>
          <TaskDeadline>{numberToDate(task.deadline)}</TaskDeadline>
          {isShown && (
            <ButtonContainer onClick={handleDeleteTask}>
              <ClearIcon
                sx={{ fontSize: "15px", color: "grey", cursor: "pointer" }}
              />
            </ButtonContainer>
          )}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
