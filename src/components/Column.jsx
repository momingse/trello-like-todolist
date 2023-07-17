import React, { useMemo } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import TaskCreator from "./TaskCreator";
import Task from "./Task";

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

const InnerList = React.memo(({ tasks, columnId }) => {
  function areEqual(prevProps, nextProps) {
    if (prevProps.tasks === nextProps.tasks) {
      return true;
    }
    return false;
  }

  return tasks.map((task, index) => (
    <Task
      key={task.id}
      task={task}
      index={index}
      columnId={columnId}
    />
  ));
});

const Column = (props) => {
  return (
    <Container>
      <Title>{props.column.title}</Title>
      <Droppable
        droppableId={props.column.id}
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
              tasks={props.tasks}
              columnId={props.column.id}
            />
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <TaskCreator
        handleModifyTask={props.handleModifyTask}
        columnId={props.column.id}
      />
    </Container>
  );
};

export default Column;
