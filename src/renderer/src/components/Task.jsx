import { useState } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import ClearIcon from '@mui/icons-material/Clear'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import dayjs from 'dayjs'
import TaskEditor from './TaskEditor'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, selectTaskById, moveTaskBackward, moveTaskForward } from '../redux/todoSlice'

const TaskContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid
    ${({ theme, isExpired }) => (isExpired ? theme.colors.error : theme.colors.border)};
  border-radius: 10px;

  background-color: ${(props) => {
    if (props.isDragDisabled) {
      // return "lightgrey";
    }
    if (props.isDragging) {
      // return "#F5F5F5";
    }
    return props.theme.colors.primaryBackground
  }};
  &:hover {
    ${(props) => props.theme.colors.secondaryBackground}
  }
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

const ButtonContainer = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;

  svg {
    opacity: 0.7;
    font-size: 20px;
    cursor: pointer;
    background-color: ${({ theme }) => `${theme.colors.secondary}`};
    border-radius: 4px;
    margin-left: 5px;
  }

  svg:hover {
    opacity: 1;
  }

  & > svg:first-child {
    color: ${(props) =>
      props.isFirstColumn ? props.theme.colors.disabledFont : props.theme.colors.font};

    cursor: ${(props) => (props.isFirstColumn ? 'auto' : 'pointer')};
  }

  & > svg:nth-child(2) {
    color: ${(props) =>
      props.isLastColumn ? props.theme.colors.disabledFont : props.theme.colors.font};
    cursor: ${(props) => (props.isLastColumn ? 'auto' : 'pointer')};
  }
`

const TaskTitle = styled.div`
  font-weight: 600;
  text-overflow: ellipsis;
`

const TaskDescription = styled.div`
  font-size: 0.9rem;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const TaskDeadline = styled.div`
  font-size: 0.6rem;
  text-align: right;
`

const numberToDate = (dateNumber) => {
  let date = new Date(dateNumber)
  return date.toLocaleDateString()
}

const Task = (props) => {
  //   const [isDragDisabled, setIsDragDisabled] = React.useState(props.task.id === "task-1");
  const { taskId, index, columnId, isFirstColumn, isLastColumn } = props
  const [isDragDisabled, setIsDragDisabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  const dispatch = useDispatch()
  const task = useSelector((state) => selectTaskById(state, taskId))
  const isExpired = !task.deadline || task.deadline < dayjs().startOf('day').valueOf()

  const handleDeleteTask = () => {
    dispatch(deleteTask({ taskId, columnId }))
  }

  const handleCloseTaskEditor = () => {
    setIsOpened(false)
  }

  const handleMoveTaskBackward = () => {
    dispatch(moveTaskBackward({ taskId, sourceIndex: index, sourceColumnId: columnId }))
  }

  const handleMoveTaskForward = () => {
    dispatch(moveTaskForward({ taskId, sourceIndex: index, sourceColumnId: columnId }))
  }

  const handleOnClick = (e) => {
    if (e.target instanceof SVGElement) return
    setIsOpened(true)
  }

  return (
    <>
      <TaskEditor task={task} isOpened={isOpened} handleCloseTaskEditor={handleCloseTaskEditor} />
      <Draggable draggableId={taskId} index={index} key={taskId} isDragDisabled={isDragDisabled}>
        {(provided, snapshot) => (
          <TaskContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleOnClick}
            isExpired={isExpired}
          >
            {/* <Handle {...provided.dragHandleProps}/> */}
            <TaskTitle>{task.title}</TaskTitle>
            <TaskDescription>{task.description}</TaskDescription>
            <TaskDeadline>{numberToDate(task.deadline)}</TaskDeadline>
            {isHovering && (
              <ButtonContainer isFirstColumn={isFirstColumn} isLastColumn={isLastColumn}>
                <KeyboardArrowLeftIcon onClick={handleMoveTaskBackward} />
                <KeyboardArrowRightIcon onClick={handleMoveTaskForward} />
                <ClearIcon onClick={handleDeleteTask} />
              </ButtonContainer>
            )}
          </TaskContainer>
        )}
      </Draggable>
    </>
  )
}

export default Task
