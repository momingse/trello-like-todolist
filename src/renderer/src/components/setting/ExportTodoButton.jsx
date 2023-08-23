import { Button } from '@mui/material'
import styled, { css } from 'styled-components'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import { useSelector } from 'react-redux'
import { selectTodo } from '../../redux/todoSlice'
import useSnackbar from '../../hooks/useSnackbar'

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

const ExportTodoButton = () => {
  const todoData = useSelector(selectTodo)
  const { snackbar } = useSnackbar()

  const handleOnClick = () => {
    navigator.clipboard.writeText(JSON.stringify(todoData))
    snackbar({ msg: 'Todo data has been copied to clipboard', type: 'info' })
  }

  return (
    <StyledButton variant="contained" color="primary" onClick={handleOnClick}>
      <ContentPasteIcon />
    </StyledButton>
  )
}

export default ExportTodoButton
