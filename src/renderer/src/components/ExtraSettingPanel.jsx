import ExportTodoButton from './setting/ExportTodoButton'
import ImportTodoButton from './setting/ImportTodoButton'
import styled from 'styled-components'

const StyledSettingItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
`

const StyledSettingItemTitle = styled.div`
  font-size: 1.5rem;
  text-transform: capitalize;
`

const SettingItem = (props) => {
  const { title, action } = props

  return (
    <StyledSettingItemContainer>
      <StyledSettingItemTitle>{title}</StyledSettingItemTitle>
      {action}
    </StyledSettingItemContainer>
  )
}

const ExtraSettingPanel = (props) => {
  const EXTRA_SETTING_LIST = [
    {
      title: 'export todo',
      action: <ExportTodoButton />
    },
    {
      title: 'import todo',
      action: <ImportTodoButton />
    }
  ]

  return (
    <>
      {EXTRA_SETTING_LIST.map((item, index) => (
        <SettingItem key={index} title={item.title} action={item.action} />
      ))}
    </>
  )
}

export default ExtraSettingPanel
