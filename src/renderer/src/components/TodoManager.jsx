import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { moveTask, selectColumnOrder } from '../redux/todoSlice'
import Column from './Column'
import ColumnNavigator from './ColumnNavigator'
import useWindowSize from '../Hooks/useWindowSize'
import theme from '../theme/theme'

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;

  ${({ theme }) => css`
    color: ${theme.colors.font};
  `}
`

const ColumnsContainer = styled.div`
  padding: 10vh 2.5vw;
  width: 95vw;
  height: 80vh;
  min-height: 400px;

  ${({ theme }) => css`
    @media (max-width: ${theme.breakpoints.values.md}px) {
      white-space: nowrap;
      width: auto;
    }
    background-color: ${theme.colors.primaryBackground};
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
    setTimeout(() => autoScroll({ instant: false }), 2000)

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
    <AppContainer>
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
    </AppContainer>
  )
}

export default TodoManager
