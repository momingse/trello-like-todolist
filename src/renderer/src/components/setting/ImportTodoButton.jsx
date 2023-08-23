import { Button, Dialog, DialogContent, DialogActions, TextField } from '@mui/material'
import styled, { css } from 'styled-components'
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt'
import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { useDispatch } from 'react-redux'
import { importTodoData } from '../../redux/todoSlice'
import dayjs from 'dayjs'
import useSnackbar from '../../hooks/useSnackbar'

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

const StyledButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground} !important;
    color: ${theme.colors.font} !important;
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px;
    padding: 0.2rem 1rem;
    margin: 0 0.5rem;
    opacity: 0.7;

    &:hover,
    &:active {
      opacity: 1;
    }
  `}
`

const StyledTextField = styled(TextField)`
  border-radius: 6px !important;
  height: calc(100% - 1.8rem - 16px);
  overflow: auto;

  .MuiInput-root {
    height: 100%;
    display: block !important;
  }

  ${({ theme }) => css`
    border: 1px solid ${theme.colors.border} !important;

    textarea {
      color: ${theme.colors.font};
      padding: 0.2rem 1rem;
    }

    &:hover,
    &:active {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `};
`

const StyledDialogActions = styled(DialogActions)`
  ${({ theme }) => css`
    button {
      color: ${theme.colors.font};
    }
  `}
`

const ImportTodoButton = () => {
  const [open, setOpen] = useState(false)
  const [todo, setTodo] = useState('')
  const { snackbar } = useSnackbar()

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const validateTasks = (todoObj) => {
    if (!todoObj.tasks) return false

    let valid = true
    Object.values(todoObj.tasks).forEach((task) => {
      if (!task.title) valid = false
      if (!task.id) valid = false
      if (typeof task.description === 'undefined') valid = false
      if (typeof task.deadline === 'undefined' || dayjs.isDayjs(task.deadline)) valid = false
    })
    return valid
  }

  const validTaskIds = (taskIds, tasks) => {
    if (!Array.isArray(taskIds)) return false
    let valid = true
    taskIds.forEach((taskId) => {
      if (typeof taskId !== 'string') valid = false
      if (!tasks[taskId]) valid = false
    })
    return valid
  }

  const validateColumns = (todoObj) => {
    if (!todoObj.columns) return false

    let valid = true
    Object.values(todoObj.columns).forEach((column) => {
      if (!column.title) valid = false
      if (!column.id) valid = false
      if (!Array.isArray(column.taskIds)) valid = false
      if (!validTaskIds(column.taskIds, todoObj.tasks)) valid = false
    })
    return valid
  }

  const handleImport = () => {
    try {
      const todoObj = JSON.parse(todo)
      if (Object.keys(todoObj).length === 0) throw new Error('Empty Todo Data')
      if (!validateTasks(todoObj)) throw new Error('Invalid Tasks Data')
      if (!validateColumns(todoObj)) throw new Error('Invalid Columns Data')

      dispatch(importTodoData(todoObj))
      handleClose()
    } catch (e) {
      snackbar({ msg: e.message, type: 'warning' })
    }
  }

  return (
    <>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogContent>
          <StyledDialogHeader>
            <h2>Import Todo</h2>
            <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
          </StyledDialogHeader>
          <StyledTextField
            id="outlined-multiline-static"
            label=""
            fullWidth
            multiline
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleImport}>Import</Button>
        </StyledDialogActions>
      </StyledDialog>
      <StyledButton onClick={handleOpen}>
        <SystemUpdateAltIcon />
      </StyledButton>
    </>
  )
}

export default ImportTodoButton
