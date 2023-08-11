import AppHeader from './AppHeader'
import { styled, css } from 'styled-components'

const StyledAppContainer = styled.div`
  height: 100vh;

  ${({ theme }) => css`
    background-color: ${theme.colors.primaryBackground};
  `}
`
const AppLayout = (props) => {
  const { children } = props

  return (
    <StyledAppContainer>
      <AppHeader />
      {children}
    </StyledAppContainer>
  )
}

export default AppLayout
