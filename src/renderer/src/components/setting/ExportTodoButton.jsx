import { Button } from '@mui/material'
import styled, { css } from 'styled-components'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodo } from '../../redux/todoSlice'
import { infoMsg } from '../../redux/appSlice'

const StyledButton = styled(Button)`
  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground} !important;
    color: ${theme.colors.font} !important;
    border: 1px solid ${theme.colors.border} !important;
    border-radius: 6px;
    padding: 0.2rem 1rem;
    margin: 0 0.5rem;
    &:hover,
    &:active {
      border: 1px solid ${theme.colors.borderActive} !important;
    }
  `}
`

const ExportTodoButton = () => {
  const dispatch = useDispatch()
  const todoData = useSelector(selectTodo)

  const handleOnClick = () => {
    navigator.clipboard.writeText(JSON.stringify(todoData))
    dispatch(infoMsg({ msg: 'Todo data has been copied to clipboard' }))
  }

  return (
    <StyledButton variant="contained" color="primary" onClick={handleOnClick}>
      <ContentPasteIcon />
    </StyledButton>
  )
}

export default ExportTodoButton