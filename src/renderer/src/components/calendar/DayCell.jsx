import dayjs from 'dayjs'
import { useRef, useState, useEffect } from 'react'
import { styled } from 'styled-components'

const StyledTask = styled.div`
  margin: 0.3rem 0.5rem;
  padding: 0 0.5rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid
    ${({ theme, isExpired }) => (isExpired ? theme.colors.error : theme.colors.border)};
  border-radius: 5px;
  cursor: pointer;
`

const StyledDayCell = styled.div`
    display: inline-block;
    margin-top: 0.2rem;
    min-width: 1.5rem;
    height: 1.5rem;
    width: max-content;
    border-radius: 50%;
    line-height: 1.5rem;
    background-color: ${({ theme, isToday }) =>
      isToday ? theme.colors.secondaryBackground : 'initial'};
  }
`

const StyledOverflowReminder = styled.div`
  margin: 0.3rem 0.5rem;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DayCell = ({ currentYear, currentMonth, day, taskInThisMonth, numberOfTaskdisplaying }) => {
  const deadlineOfToday = taskInThisMonth.filter(
    (task) => dayjs(task.deadline).date() === day && dayjs(task.deadline).month() === currentMonth
  )
  const displayingTasks = deadlineOfToday.slice(0, numberOfTaskdisplaying)

  const isToday = currentMonth === dayjs().month() && day == dayjs().day()
  const isExpired = dayjs().isAfter(dayjs(`${currentYear}-${currentMonth}-${day}`))
  console.log(dayjs(`${currentYear}-${currentMonth}-${day}`))

  return (
    <td key={`${currentMonth - day}`}>
      <StyledDayCell isToday={isToday}>{day}</StyledDayCell>
      {displayingTasks.map((task) => (
        <StyledTask key={task.id} isExpired={isExpired}>
          {task.title}
        </StyledTask>
      ))}
      {displayingTasks.length < deadlineOfToday.length && (
        <StyledOverflowReminder>
          Still hv {deadlineOfToday.length - displayingTasks.length} Task
        </StyledOverflowReminder>
      )}
    </td>
  )
}

export default DayCell
