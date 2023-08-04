import { useState } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TaskEditor from "./TaskEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  selectTaskById,
  moveTaskBackward,
  moveTaskForward,
} from "../redux/todoSlice";

const TaskContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid lightgrey;
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
  top: 4px;
  right: 4px;
  z-index: 1;

  svg {
    font-size: 20px;
    color: grey;
    cursor: pointer;
  }

  & > svg:first-child {
    visibility: ${(props) => (props.isFirstColumn ? "hidden" : "visible")};
  }

  & > svg:nth-child(2) {
    visibility: ${(props) => (props.isLastColumn ? "hidden" : "visible")};
  }
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
  const { taskId, index, columnId, isFirstColumn, isLastColumn } = props;
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const dispatch = useDispatch();
  const task = useSelector((state) => selectTaskById(state, taskId));

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId, columnId }));
  };

  const handleCloseTaskEditor = () => {
    setIsOpened(false);
  };

  const handleMoveTaskBackward = () => {
    dispatch(
      moveTaskBackward({ taskId, sourceIndex: index, sourceColumnId: columnId })
    );
  };

  const handleMoveTaskForward = () => {
    dispatch(
      moveTaskForward({ taskId, sourceIndex: index, sourceColumnId: columnId })
    );
  };

  return (
    <>
      <TaskEditor
        task={task}
        isOpened={isOpened}
        handleCloseTaskEditor={handleCloseTaskEditor}
      />
      <Draggable
        draggableId={taskId}
        index={index}
        key={taskId}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            onClick={() => setIsOpened(true)}
          >
            {/* <Handle {...provided.dragHandleProps}/> */}
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            <TaskDeadline>{numberToDate(task.deadline)}</TaskDeadline>
            {/* {isShown && (
              <ButtonContainer>
                <KeyboardArrowLeftIcon onClick={handleMoveTaskBackward} />
                <KeyboardArrowRightIcon onClick={handleMoveTaskForward} />
                <ClearIcon onClick={handleDeleteTask} />
              </ButtonContainer>
            )} */}
            <ButtonContainer isFirstColumn={isFirstColumn} isLastColumn={isLastColumn} >
              <KeyboardArrowLeftIcon onClick={handleMoveTaskBackward} />
              <KeyboardArrowRightIcon onClick={handleMoveTaskForward} />
              <ClearIcon onClick={handleDeleteTask} />
            </ButtonContainer>
          </TaskContainer>
        )}
      </Draggable>
    </>
  );
};

export default Task;
