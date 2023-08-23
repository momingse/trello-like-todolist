import dayjs from 'dayjs'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'

const CalendarManagerContainer = styled.div`
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  display: flex;
  flex-direction: column;
`

const CalendarTitle = styled.div`
  position: relative;
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  position: absolute;
  right: 0;
  top: 10px;

  svg {
    opacity: 0.7;
    font-size: 20px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
    margin-left: 5px;
  }

  svg:hover {
    opacity: 1;
  }

  & > svg {
    color: ${({ theme }) => theme.colors.font};
    cursor: 'pointer';
  }
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
  const MAX_CELL_FOR_FIVE_ROW = 35
  const MAX_CELL_FOR_SIX_ROW = 42
  const [currentMonth, setCurrentMonth] = useState(dayjs().month())
  const [currentYear, setCurrentYear] = useState(dayjs().year())

  const renderCalendarDays = (currentYear, currentMonth) => {
    const daysInMonth = dayjs().month(currentMonth).daysInMonth()
    const daysArray = Array.from({ length: daysInMonth }, (_, index) => index + 1)
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

    const nextMonthCells = Array.from(
      {
        length:
          (MAX_CELL_FOR_FIVE_ROW - daysInMonth - prevMonthCells.length > 0
            ? MAX_CELL_FOR_FIVE_ROW
            : MAX_CELL_FOR_SIX_ROW) -
          daysInMonth -
          prevMonthCells.length
      },
      (_, index) => {
        return <td key={`nextMon-${index}`}>{index + 1}</td>
      }
    )

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

  const getWeekdayHeaders = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return weekdays.map((weekday) => <th key={weekday}>{weekday}</th>)
  }

  const handleChangeToNextMonth = () => {
    const nextMonth = dayjs().month(currentMonth).add(1, 'month').month()
    setCurrentMonth(nextMonth)
  }

  const handleChangeToPrevMonth = () => {
    const prevMonth = dayjs().month(currentMonth).add(1, 'month').month()
    setCurrentMonth(prevMonth)
  }

  return (
    <CalendarManagerContainer>
      <CalendarTitle>
        {dayjs().month(currentMonth).year(currentYear).format('MMMM YYYY')}
        <ButtonContainer>
          <KeyboardArrowLeftIcon onClick={handleChangeToPrevMonth} />
          <KeyboardArrowRightIcon onClick={handleChangeToNextMonth} />
        </ButtonContainer>
      </CalendarTitle>
      <CalendarContainer>
        <CalendarHeader>
          <tr>{getWeekdayHeaders()}</tr>
        </CalendarHeader>
        <CalendarMain>{renderCalendarDays(currentYear, currentMonth)}</CalendarMain>
      </CalendarContainer>
    </CalendarManagerContainer>
  )
}

export default CalendarManager
