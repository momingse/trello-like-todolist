import { Dialog, DialogContent, DialogActions, Input, TextField, Box, Button } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import styled, { css, withTheme } from 'styled-components'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editTask } from '../redux/todoSlice'
import useSnackbar from '../hooks/useSnackbar'

import ClearIcon from '@mui/icons-material/Clear'

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
  margin-top: 8px;
  ${({ theme, error }) => css`
    border: 1px solid ${error ? theme.colors.error : theme.colors.border} !important;
    border-radius: 6px !important;

    input {
      color: ${theme.colors.font};
      padding: 0.2rem 1rem;
    }

    &:hover,
    &:active,
    &:focus-within {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const StyledTextField = styled(TextField)`
  margin-top: 8px !important;
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px !important;

    textarea {
      color: ${theme.colors.font};
      padding: 0.2rem 1rem;
    }

    &:hover,
    &:active,
    &:focus-within {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const StyledDatePicker = styled(DatePicker)`
  width: calc(100% - 2px);

  ${({ theme, error }) => css`
    border: 1px solid ${error ? theme.colors.error : theme.colors.border} !important;
    border-radius: 6px !important;

    input,
    svg {
      color: ${theme.colors.font};
    }

    &:hover,
    &:active,
    &:focus-within {
      border: 1px solid ${theme.colors.borderActive} !important;
    }

    & .Mui-focused fieldset {
      border: none;
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

const TaskEditor = (props) => {
  const initialErrorState = { title: false, deadline: false }

  const { task, isOpened, handleCloseTaskEditor, theme } = props
  const [title, setTitle] = useState(task.title)
  const [deadline, setDeadline] = useState(dayjs(task.deadline))
  const [description, setDescription] = useState(task.description)
  const [error, setError] = useState({ ...initialErrorState })
  const { snackbar } = useSnackbar()

  const dispatch = useDispatch()

  const handleReset = () => {
    setTitle(task.title)
    setDeadline(dayjs(task.deadline))
    setDescription(task.description)
  }

  const handleSubmit = () => {
    if (title === '') {
      snackbar({ msg: 'Title cannot be empty', type: 'warning' })
      setError({
        ...error,
        title: true
      })
      return
    }

    // check the deadline cannot be earlier than today
    if (deadline.startOf('day').valueOf() < dayjs().startOf('day').valueOf()) {
      snackbar({ msg: 'Deadline is expired', type: 'warning' })
      setError({
        ...initialErrorState,
        deadline: true
      })
      return
    }

    setError({
      ...initialErrorState
    })
    dispatch(
      editTask({
        taskId: task.id,
        title: title,
        description: description,
        deadline: deadline.valueOf()
      })
    )

    handleCloseTaskEditor()
    snackbar({ msg: 'Task edited successfully', type: 'success' })
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
    <StyledDialog
      open={isOpened}
      onClose={handleCloseTaskEditor}
      scroll={'paper'}
      aria-labelledby="simple-dialog-title"
    >
      <DialogContent dividers={true}>
        <StyledDialogHeader>
          <h2>Edit Task</h2>
          <ClearIcon onClick={handleCloseTaskEditor} sx={{ cursor: 'pointer' }} />
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
          error={error.title}
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
                  },
                  textField: {
                    error: false
                  }
                }}
                error={error.deadline}
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
          maxRows={5}
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
  )
}

export default withTheme(TaskEditor)
