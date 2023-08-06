import React from "react";
import styled, { css } from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import TaskCreator from "./TaskCreator";
import Task from "./Task";
import { selectColumnById } from "../redux/todoSlice";

const Container = styled.div`
  margin: 8px;
  border-radius: 15px;
  width: calc(100% / 4 - 18px);
  height: 90%;

  display: inline-flex;
  flex-direction: column;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.values.md}px) {
      width: 80vw;
      margin: 0 10vw;
    }

    background-color: ${theme.colors.primaryBackground};
    border: 1px solid ${theme.colors.border};
  `}
`;
const Title = styled.h3`
  padding: 8px 16px;
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 600;
`;

const TaskList = styled.div`
  width: calc(100% - 16px);
  padding: 8px;
  transition: background-color 0.2s ease;
  // background-color: ${(props) =>
    props.isdraggingover ? "#FFEBE6" : props.isStart ? "#E3FCEF" : "inherit"};
  background-color: ${(props) =>
    props.isdraggingover ? props.theme.colors.secondaryBackground : "inherit"};
  flex-grow: 1;
  min-height: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable both-edges;
  // border-radius: 0 0 15px 15px;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.5);
  }

  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.border};
    border-bottom: 1px solid ${theme.colors.border};
  `}
`;

const InnerList = React.memo(
  ({ taskIds, columnId, isFirstColumn, isLastColumn }) => {
    function areEqual(prevProps, nextProps) {
      if (prevProps.taskIds === nextProps.taskIds) {
        return true;
      }
      return false;
    }

    return taskIds.map((taskId, index) => (
      <Task
        key={taskId}
        taskId={taskId}
        index={index}
        columnId={columnId}
        isFirstColumn={isFirstColumn}
        isLastColumn={isLastColumn}
      />
    ));
  }
);

const Column = (props) => {
  const { columnId, isFirstColumn, isLastColumn } = props;
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
            <InnerList
              taskIds={column.taskIds}
              columnId={columnId}
              isFirstColumn={isFirstColumn}
              isLastColumn={isLastColumn}
            />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <TaskCreator columnId={columnId} />
    </Container>
  );
};

export default Column;
