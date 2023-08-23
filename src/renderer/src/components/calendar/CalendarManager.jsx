import dayjs from 'dayjs'
import React from 'react'
import { styled } from 'styled-components'

const CalendarManagerContainer = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const CalendarTitle = styled.div`
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`

const CalendarContainer = styled.table`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`

const CalendarHeader = styled.thead`
  & > tr {
    display: flex;
  }

  & > tr > th {
    flex: 1 1 0%;
  }
`

const CalendarMain = styled.tbody`
  height: 100%;
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  border-radius: 10px;
  & > tr {
    display: flex;
    flex: 1 1 0%;
  }

  & > tr:not(:last-child) {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.border}`};
  }

  & > tr > td {
    flex: 1 1 0%;
    text-align: center;
  }

  & > tr > td:not(:first-child) {
    border-left: ${({ theme }) => `1px solid ${theme.colors.border}`};
  }
`

const CalendarManager = () => {
  const MAX_CELL = 35
  const currentMonth = dayjs().month()
  const currentYear = dayjs().year()
  const daysInMonth = dayjs().month(currentMonth).daysInMonth()
  const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1)

  const getWeekdayHeaders = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays.map((weekday) => <th key={weekday}>{weekday}</th>)
  }

  const renderCalendarDays = () => {
    const firstDayOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month').day()
    const daysInPrevMonth = dayjs()
      .year(currentYear)
      .month(currentMonth)
      .subtract(1, 'month')
      .daysInMonth()

    const prevMonthCells = Array.from({ length: firstDayOfMonth }, (_, index) => {
      const day = daysInPrevMonth - firstDayOfMonth + index + 1
      return <td key={`prevMon-${index}`}>{day}</td>
    })

    const nextMonthCells =
      MAX_CELL - daysInMonth - prevMonthCells.length > 0
        ? Array.from({ length: MAX_CELL - daysInMonth - prevMonthCells.length }, (_, index) => {
            return <td key={`nextMon-${index}`}>{index + 1}</td>
          })
        : []

    const calendarDays = daysArray.map((day) => <td key={day}>{day}</td>)
    const allCells = [...prevMonthCells, ...calendarDays, ...nextMonthCells]

    const rows = []
    let cells = []

    allCells.forEach((cell, index) => {
      if (index % 7 !== 0 || index === 0) {
        cells.push(cell)
      } else {
        rows.push(cells)
        cells = []
        cells.push(cell)
      }
      if (index === allCells.length - 1) {
        rows.push(cells)
      }
    })

    return rows.map((row, index) => <tr key={index}>{row}</tr>)
  }

  return (
    <CalendarManagerContainer>
      <CalendarTitle>{dayjs().format('MMMM YYYY')}</CalendarTitle>
      <CalendarContainer>
        <CalendarHeader>
          <tr>{getWeekdayHeaders()}</tr>
        </CalendarHeader>
        <CalendarMain>{renderCalendarDays()}</CalendarMain>
      </CalendarContainer>
    </CalendarManagerContainer>
  )
}

export default CalendarManager
