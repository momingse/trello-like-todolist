import styled, { css, withTheme } from 'styled-components'
import dayjs from 'dayjs'
import { Dialog, Input, Box, Button, DialogActions, DialogContent, TextField } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/todoSlice'
import { successMsg, errorMsg } from '../redux/appSlice'

import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'

const CreateButton = styled.div`
  padding: 8px;
  margin: 8px;
  border-radius: 10px;
  align-items: center;
  display: flex;

  ${({ theme }) => css`
    &:hover {
      background-color: ${theme.colors.secondaryBackground};
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    }
    &:active {
      background-color: ${theme.colors.secondaryBackground};
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    }
  `}
`

const StyledIconContainer = styled.div`
  padding-right: 10px;
  display: flex;
`

const StyledDialogHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
`

const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    display: flex;
    width: 40vw;
    height: 50vh;
    max-width: 644px;
    min-height: 452px;
    min-width: 452px;
    border-radius: 20px;
  }

  ${({ theme }) => css`
    & .MuiPaper-root {
      background-color: ${theme.colors.primaryBackground};
      border: 1px solid ${theme.colors.border};
      color: ${theme.colors.font};
    }
  `}
`

const StyledInput = styled(Input)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px !important;
    input {
      color: ${theme.colors.font};
      padding: 0.2rem 1rem;
    }

    &:hover,
    &:active {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const StyledTextField = styled(TextField)`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px !important;
    textarea {
      color: ${theme.colors.font};
      padding: 0.2rem 1rem;
    }

    &:hover,
    &:active {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const StyledDatePicker = styled(DatePicker)`
  width: calc(100% - 2px);
  padding: 0;

  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px !important;

    input,
    svg {
      color: ${theme.colors.font};
    }

    &:hover,
    &:active {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const StyledDialogActions = styled(DialogActions)`
  ${({ theme }) => css`
    button {
      color: ${theme.colors.font};
    }
  `}
`

const TaskCreator = (props) => {
  const { columnId, theme } = props
  const [isOpened, setIsOpened] = useState(false)
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState(dayjs())
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const handleClose = () => {
    setIsOpened(false)
    setTimeout(() => {
      handleReset()
    }, 200)
  }

  const handleOnCliked = () => {
    setIsOpened(true)
  }

  const handleSubmit = () => {
    if (title === '') {
      dispatch(errorMsg({ msg: 'Title cannot be empty' }))
      return
    }

    dispatch(
      addTask({
        title: title,
        description: description,
        deadline: deadline.valueOf(),
        columnId: columnId
      })
    )

    handleClose()
    dispatch(successMsg({ msg: 'Task created successfully' }))
  }

  const handleReset = () => {
    setTitle('')
    setDeadline(dayjs())
    setDescription('')
  }

  const DatePickerLayoutSX = {
    backgroundColor: theme.colors.primaryBackground,
    color: theme.colors.font,

    [`.MuiButtonBase-root, .MuiDayCalendar-weekContainer, .MuiDayCalendar-weekContainer, .MuiTypography-root`]:
      {
        color: theme.colors.font
      },

    [`.Mui-disabled, .Mui-disabled:not(.Mui-selected)`]: {
      color: theme.colors.disabledFont
    }
  }

  return (
    <React.Fragment>
      <CreateButton onClick={handleOnCliked}>
        <StyledIconContainer>
          <AddIcon />
        </StyledIconContainer>
        create task
      </CreateButton>

      <StyledDialog
        open={isOpened}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="simple-dialog-title"
      >
        <DialogContent dividers={true}>
          <StyledDialogHeader>
            <h2>Create Task</h2>
            <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </StyledDialogHeader>
          <span>Title</span>
          <StyledInput
            id="title-input"
            label=""
            variant="standard"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            sx={{ marginBottom: '16px' }}
            value={title}
            disableUnderline={true}
          />
          <Box sx={{ marginBottom: '16px' }}>
            <span>Deadline</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <StyledDatePicker
                  label=""
                  variant="standard"
                  value={deadline}
                  minDate={dayjs()}
                  onChange={(newValue) => setDeadline(newValue)}
                  format="MM-DD-YYYY"
                  slotProps={{
                    layout: {
                      sx: DatePickerLayoutSX
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
          <span>Desciption</span>
          <StyledTextField
            id="outlined-multiline-static"
            label=""
            fullWidth
            multiline
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            InputLabelProps={{
              disabled: true
            }}
            variant="standard"
            InputProps={{
              disableUnderline: true
            }}
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </StyledDialogActions>
      </StyledDialog>
    </React.Fragment>
  )
}

export default withTheme(TaskCreator)
