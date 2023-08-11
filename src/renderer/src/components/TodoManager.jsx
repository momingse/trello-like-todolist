import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { moveTask, selectColumnOrder } from '../redux/todoSlice'
import Column from './Column'
import ColumnNavigator from './ColumnNavigator'
import useWindowSize from '../hooks/useWindowSize'
import theme from '../theme/theme'

const TodoContainer = styled.div`
  display: flex;
  height: 100%;
`

const ColumnsContainer = styled.div`
  position: relative;
  padding: 0 2.5vw;
  width: 95vw;
  top: 10%;
  height: 80%;
  min-height: 400px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.values.md}px) {
      white-space: nowrap;
      width: auto;
      padding-left: 0;
      padding-right: 0;
    }
    background-color: ${theme.colors.primaryBackground};

    &::before {
      content: '';
      position: absolute;
      top: calc(-12.5%);
      bottom: 0;
      left: 0;
      right: 0;
      background-color: ${theme.colors.primaryBackground};
      z-index: -1;
      padding: calc(12.5%) 0;
    }
  `}
`

const NavigatorContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`

const TodoManager = () => {
  const [homeIndex, setHomeIndex] = useState(null)
  const [currentColume, setCurrentColume] = useState(0)
  const [windowWidth, windowHeight] = useWindowSize()

  const dispatch = useDispatch()
  const columnOrder = useSelector(selectColumnOrder)

  useEffect(() => {
    if (windowWidth > theme.breakpoints.values.md) return
    autoScroll({ instant: true })
  }, [windowWidth])

  const autoScroll = ({ instant }) => {
    const currentPosition = document.documentElement.scrollLeft
    const childWidth = document.documentElement.clientWidth
    const adjustScroll = currentPosition % childWidth

    if (adjustScroll > childWidth / 2) {
      if (instant) {
        document.documentElement.scrollLeft += childWidth - adjustScroll
        return
      }
      document.documentElement.scrollTo({
        left: document.documentElement.scrollLeft + childWidth - adjustScroll,
        behavior: 'smooth'
      })
    } else {
      if (instant) {
        document.documentElement.scrollLeft -= adjustScroll
        return
      }
      document.documentElement.scrollTo({
        left: document.documentElement.scrollLeft - adjustScroll,
        behavior: 'smooth'
      })
    }

    setCurrentColume(Math.floor(currentPosition / childWidth))
  }

  const handleOnDragEnd = (result) => {
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";
    setTimeout(() => autoScroll({ instant: false }), 100)

    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    dispatch(
      moveTask({
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        taskId: draggableId
      })
    )
  }

  const handleOnDragStart = (start) => {
    setHomeIndex(columnOrder.indexOf(start.source.droppableId))
  }

  const handleOnDragUpdate = (update) => {}

  const handleChangeColumn = (index) => {
    setCurrentColume(index)
  }

  return (
    <TodoContainer>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleOnDragStart}
        onDragUpdate={handleOnDragUpdate}
      >
        <ColumnsContainer>
          {columnOrder?.map((columnId, index) => {
            const isDropDisabled = index ? index < homeIndex : true
            return (
              <Column
                key={columnId}
                isDropDisabled={isDropDisabled}
                columnId={columnId}
                hidden={currentColume !== index}
                isFirstColumn={index === 0}
                isLastColumn={index === columnOrder.length - 1}
              />
            )
          })}
        </ColumnsContainer>
        <NavigatorContainer>
          <ColumnNavigator
            columnOrder={columnOrder}
            currentColume={currentColume}
            handleChangeColumn={handleChangeColumn}
            el={document.documentElement}
          />
        </NavigatorContainer>
      </DragDropContext>
    </TodoContainer>
  )
}

export default TodoManager
